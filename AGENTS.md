# somewhere-now — Development rules

## Premise of this app

An app for looking into the world's YouTube live cameras from a map. **The lead is the map and the
day/night boundary drawn on it.**
The palette is a nautical chart (deep teal), and the only accent is a single amber, as "a window lit at night".

## Layers and responsibilities

The Worker's Cron path (`worker/youtube.ts`, `worker/refresh.ts`, `scheduled` in `worker/index.ts`) is written with
**Effect 4** (`effect`). Client failures are typed (`YouTubeApiError` / `YouTubeNetworkError`); `rediscover` turns a failed
channel into a note with `Effect.result`, and `update` wraps the refresh in `Effect.exit` so the ledger write-back runs on
every outcome (the old `finally`). `scheduled` hands `ctx.waitUntil` an effect that never fails. The `/api/cams` fetch path
stays plain Promise code on purpose (it is latency-sensitive and has nothing to retry).

| Location | Responsibility | Tests |
|---|---|---|
| `src/astro/` | Solar position (Meeus). Ported from skydial | **100% required** |
| `src/domain/` | Types, day/night, local time, weather codes, URL state, favourites | **100% required** |
| `worker/youtube.ts` `worker/refresh.ts` | API client and the refresh algorithm | **100% required** |
| `src/ui/` `src/app.ts` `src/api/` | DOM, iframe, fetch, screen assembly | jsdom + Testing Library, per-glob threshold (reached − 2) in `vitest.config.ts` |
| `src/ui/map.ts` `src/ui/globe.ts` | Leaflet / MapLibre (canvas, WebGL) | Out of scope (jsdom cannot render them; `app.test.ts` swaps in fakes) |
| `worker/index.ts` `src/main.ts` | Entry points | Out of scope (the Cron path of `worker/index.ts` is pinned by `worker/index.test.ts` against an in-memory KV) |
| `src/data/cams.ts` | Generated. **Do not edit by hand** | Has a validation test |
| `src/data/camSources.ts` | Generated from `cams.ts` (the Worker's slice). **Do not edit by hand** | `camSources.test.ts` fails when it drifts from `cams.ts` |

`npm run coverage` fails if even one line of the 100% targets above is missing, or if the UI layer
drops under its threshold. UI tests opt into the DOM with `// @vitest-environment jsdom` at the top
of the file (the default environment stays node), drive the screen through roles and visible text,
and use the fictional cameras in `src/ui/__fixtures__/cams.ts`. If you suspect
the threshold is not actually biting, add unreachable code on purpose and confirm that it fails.

## Landmines we stepped on (do not fall into the same hole)

- **An iframe reloads when it is detached from the DOM and inserted again.** Re-`append`ing it on
  every re-render reconnects the stream, and on top of that it becomes an endless loop of
  "error → re-render → reload → error" that takes the whole tab down (measured: 521 reloads in
  20 seconds). Fix the place where the player lives, and swap it
  **only when the lead changes** (`src/ui/panel.ts` / `src/ui/wall.ts`).
- **Error notifications arrive many times.** `onUnplayable` re-renders only when the state changes.
- **When viewing side by side, start the players one at a time, staggered.** Initialising 4 in
  the same frame is heavy. The cell must stay registered while it waits, otherwise a re-render
  in the meantime creates a duplicate frame for the same camera.
- **Delegate `compute-pressure` to the playback origin.** If it stays denied, the player retries
  without end and produces hundreds of violation log entries per second.
- **`span` is inline, so width and height have no effect.** The marker collapses into a line.
- **`_headers` joins multiple matches with commas.** Write the CSP in the single `/*` block only.
- 🔴 **Never take "some stream" from a channel.** 57 cameras hang off only 8 channels
  (EarthCam alone has 25), and a single channel puts out 42 live streams.
  Rediscovery with `search.list&maxResults=1` shows New Jersey footage on the Times Square
  pin. **Tell streams apart by their title** (`src/domain/streamMatch.ts`). On top of that, titles
  differ only inside the parentheses ("(Fixed View)" and "(Fixed View - Looking East)"), so loose matching is forbidden.
  **When the streams cannot be told apart, go offline** — showing nothing is better than showing the wrong footage.
- **Rediscovery is less reliable than the liveness sweep.** Because it dredges the channel, it always
  misses some (a stream that has been running for a long time sinks deep into the upload history).
  So it **does not touch a camera the liveness sweep has not touched yet**, and whether the stream
  is not found or the request fails, it does not erase the recorded videoId. Going offline
  pre-emptively leaves a living camera grey for up to 10 minutes (this actually happened: the
  iceberg camera in Ilulissat).
- **Do not write coordinates from memory.** Leave it to the geocoder, and reject same-name places
  with `admin1`. A place that cannot be resolved is **dropped**, not filled in with an approximation.
- 🔴 **A geocoder never says "not found". Throw a short word at it and something always comes back.**
  The query ordering was "short ASCII first", so **common words** were chosen instead of
  place names. There is a real New in Kentucky for `New` and a real Beach in North Dakota for
  `Beach`, so `New York City LIVE Manhattan` was looked up by the 3-letter New rather than the
  9-letter Manhattan, and **29 cameras had piled up in Kentucky**. Even `2026` `M7.5`
  `[4K]` `PTZ` had become queries, and **3,394 of 5,720 cameras (59%) were sitting on a pile at
  the same coordinates**. **The query with more words narrows the place** (`prioritizeGeocodeQueries`).
  Do not send strings that cannot be a place name (`looksLikePlaceName`).
- 🔴 **Open-Meteo matches by prefix. "Something came back" for a 3-letter word is a prefix hit, not a place.**
  `Big` returns Big Delta, Alaska, and 5 cameras (Big Bog SRA in Minnesota, Chicago O'Hare,
  Big Bear, Big Island, Tahiti waves) were all sitting on that one pin because every specific
  query had missed and the last-resort generic word was taken at face value. A hit counts only
  when the returned name **is** the query or appears in the title as whole words (`hitNamesTheQuery`).
- 🔴 **When re-geocoding, do not be satisfied with "the place name matched". Check the state too.**
  For `Marysville, Michigan USA` the geocoder returns **a town called Michigan in North Dakota**.
  The name matches and yet it is 1,900km off. `Redondo Beach` (California) flew to Redondo in
  Washington State, and `Bangor MI` to Bangor in Maine (both measured).
  Move a camera **only when both the place name and admin1 appear in the title**, and leave
  anything that cannot be judged where it is (`scripts/regeocode-piles.ts`). Staying coarse is better than a wrong place.
- 🔴 **Sampling from the large piles only makes you misread the accuracy.** To check whether the
  re-geocoding gatekeeper could be loosened, 42 were drawn from the top piles, 10/10 were correct, and it was let through.
  But the top piles were Tokyo, Osaka, Seoul and Kyoto, and **Japanese proper nouns have few same-name places**.
  Drawing 30 again at random, **17 were wrong** (`NYC Live Cam` → Australia,
  `Port Miami` → Kentucky, `Jacksonville Beach Pier` → Utah). English titles are made of
  ordinary nouns such as Thermal, Wedge, Trail and Port, and every one of them exists as a town
  of the same name. **The sample that decides adoption must always be drawn at random from the population.**
- **Same-name places inside the same state cannot be caught from the title string alone.** Because
  of a town called Kilauea on Kauai, the Kilauea volcano camera moves 250km. The state matches
  and there is no contradiction, so a gatekeeper that looks at strings lets it through.
  → **Decide by agreement between two independent geocoders** (`scripts/photon.ts`).
- **Open-Meteo geocoding is a dictionary of "populated places" and does not know facilities.**
  That is why it returns a town on Kauai for `Kilauea Volcano` and something in Kentucky for
  `Port Miami Cruise Ship Terminals`. **Photon (OSM) knows features** — measured, it correctly
  resolved Grand Teton National Park, Atlanta History Center, Enoshima Yacht Harbor and
  Woody Bay station. Moving a camera only when the two agree within 25km gave
  23 correct out of 26 random samples. **Do not adopt when only one of them is correct**
  (there is nothing to decide which one is correct).
- **The public Nominatim instance does not permit bulk geocoding under its terms.**
  Use Photon, which is also OSM, at 1 request per 1.2 seconds with an identifiable User-Agent.
  Limit the queries to "cameras for which a move has been proposed".
- 🔴 **When the scale grows 100 times, the "rationale comments" on constants become lies too.** Rediscovery's
  `REDISCOVER_CHANNELS_PER_RUN = 8` carried the comment "there are only 8 channels, so all of
  them can be reviewed every hour", but that was from the days of 57 cameras. It stayed, comment and all,
  after the move to 5,720 cameras and 2,450 channels, and one round over the 806 channels holding
  1,686 non-live cameras was taking **4.2 days**. When you increase a count, recount every constant that depends on a count.
- 🔴 **Do not read and write a single quota ledger from Crons that fire at the same time.** `*/10 * * * *` and
  `0 * * * *` fire **simultaneously** at the top of every hour. If both read the same quota ledger and
  write back separately, the last write wins, the usage of one of them disappears entirely, and the
  limit guard loses track of the real usage. KV has no atomic operation, so **pinning the writer to
  one** (splitting the key per role) is the only way out.
- **Checking everything at the same frequency melts the budget on re-checking things that do not change.** A live stream
  runs for 24 hours, so every 2 hours is enough, and changes happen on the offline / blocked side
  (`RECHECK_INTERVAL_MS`). The freed budget goes straight to rediscovery.
- **When an id is removed from the master, nobody sweeps the state in KV.** Both the liveness sweep and
  rediscovery start from the master, so the state of a renumbered camera catches neither eye and keeps
  being served to browsers from `/api/cams` (measured: 6 entries were frozen as they were 2 days before).
  Sweep with `pruneOrphans` on every write-back.
- 🔴 **The Cron runs under the free plan's 10ms CPU limit, and an isolate only tolerates going over it
  now and then.** Before 2026-10-04 each run took 50–245ms, and runs were cut off as `exceededCpu`
  for hours at a time (34% of a week; the refresh writes nothing on those runs). Keep the Cron light:
  the Worker imports `src/data/camSources.ts` (id and source only, emitted as a JSON string), never the
  full `src/data/cams.ts` (evaluating it took ~35ms); KV states carry no stream title (`storedState`);
  YouTube calls ask only for the fields the parsers read (`RESPONSE_FIELDS`). Check `$workers.outcome`
  and `$workers.cpuTimeMs` of scheduled events in Workers Observability after changing the Cron path.
- **Do not rebuild the source of truth in `/api/cams`.** The source of truth is ~750KB (1.2MB while it
  still carried stream titles), and
  parse → project → stringify on every request takes 100–300ms. **Build the public copy, in the shape
  that is served, at refresh time and put it in KV**, and have reads do nothing but return it. If the ETag is
  built from the updatedAt stored in the KV metadata, 304 can be returned without reading the body.
- **Stop polling in background tabs.** A tab left open that keeps fetching 144KB every 2 minutes
  makes 700 requests a day. With `everyWhileVisible` (`src/app.ts`), stop while
  `document.hidden` is true, and on returning to the foreground catch up once without waiting for the interval.
- 🔴 **What counts against the subrequest limit (50) is not units but "the number of calls".** A search
  costs 100 units in a single call, so the two are not proportional. You can hit the limit even while
  keeping to the unit budget. **Rediscovery of one channel walks 3 pages of uploads and makes 6 calls**,
  so allowing 24 channels by count alone comes to 144 calls and more than half fail (this actually failed on 2026-08-28).
  Put the brake on the measured `client.callsMade`, not on a count — if the target is on the first page
  it takes only 2 calls, so tightening by measurement uses up the free budget better.
  **To make a round of rediscovery faster, raise the Cron frequency, not the number per run.**
- 🔴 **An exception from a function passed to `ctx.waitUntil` disappears without anyone receiving it.** The Cron
  body is passed there, so if it crashes while reading KV, nothing is left in the logs or in the quota ledger, and
  **the refresh stops silently** (on 2026-08-28 it stopped for 3.6 hours, and there was zero evidence
  to identify the cause). Always emit the single line `[cron <role>] start` at the entry, and always wrap the body in try.
  "Did not fire" and "fired but crashed" can only be told apart once this one line exists.
- **`scripts/` runs with node's type stripping**, so imports need the extension. `src/` does not.

## Principles for sound

- **Sound is off by default.** This is an app opened between tasks at work, so sound coming out the moment something is pressed is an accident.
  Play sound only when the user explicitly turns it on, and remember that choice in localStorage.
- **Only the one lead stream plays sound.** In the panel and in "並べて見る" (Video wall) alike, every camera other than the first is always muted.

## External dependencies and how to guard them

- **wrangler does not read plain environment variables as bindings** (measured). It needs a `.env` or `.dev.vars`
  **file**. Therefore `keyway run -- wrangler dev` does not work. To run the Cron locally,
  pull with `keyway pull -e development -f .env`, and delete the file when done.
- **YouTube Data API**: the key lives only in the Worker's secret. Quota is accumulated per day in the quota ledger in KV and
  stopped by `DAILY_UNIT_BUDGET`. The limit is not "taken care of in operations"; it is built into the code.
- **OpenStreetMap tiles**: do not remove the attribution. Apply the CSS filter to the tile images only.
- **Open-Meteo**: no key needed. Call it only for the one selected camera, and cache the result in memory.

## CSP

Keep `script-src 'self'`. Loading YouTube's IFrame Player API requires an external host, so
**do not load it**. Control is done through postMessage with `enablejsapi=1`.

## Commits

1 commit, 1 intent. When the generated files (`src/data/cams.ts`, `src/data/camSources.ts`) are updated,
put them in the same commit as the change to the script used to generate them.

## Language

- Code, comments, test titles, log messages and internal error messages are written in English.
- Japanese is used only for text shown to the user in the app (`src/ui/i18n.ts` and other UI strings) and for data such as camera names.
- Commit messages and PR descriptions follow the existing convention of this repository.

## Cursor Cloud specific instructions

Dependencies are installed by the update script at startup (`npm ci`). Below are only the non-obvious operational notes.

- **The dev server is `npm run dev` (Vite / port 5173).** Even without `/api/cams` (the Worker), the map,
  markers, panel, local time and weather work. To run it in the background, use tmux.
- **The main checks are `npm run typecheck` → `npm run coverage` → `npm run build`** (the same as
  `.github/workflows/ci.yml` in CI). **There is no lint step** (ESLint is not installed).
  `coverage` fails if even one line of the pure-logic layers is missing (the thresholds in `vitest.config.ts`).
- **Node is 24 in CI, and the base of this VM is 22.x.** typecheck/coverage/build/dev all
  pass on 22 (measured). If the version difference causes trouble, you can switch to 24 with nvm.
- **Live video playback basically does not show in Cloud.** `/api/cams` does not resolve the videoId, and
  YouTube returns "Sign in to confirm you're not a bot" to automated browsers.
  If the map, markers, panel, time and weather appear, it is healthy. Do not use checking the video as the pass/fail criterion for regeneration.
- **`YOUTUBE_API_KEY` is needed only when running the Cron / Worker (`npm run dev:worker`).**
  wrangler does not read plain environment variables and needs a `.env` / `.dev.vars` **file** (see README).
  Without the key, the liveness sweep and rediscovery are not attempted.
