# somewhere-now

[![Keyway Secrets](https://www.keyway.sh/badge.svg?repo=tktk7l9/somewhere-now)](https://www.keyway.sh/vaults/tktk7l9/somewhere-now)

地球のライブカメラを、地図から覗く。

世界の YouTube ライブカメラ配信を地図上のマーカーから選んで、アプリの中でそのまま見る。
地図には**いまの昼夜の境界**が引いてあり、「夜の場所だけ」を選んで街の深夜を眺めることもできる。

- 収録 **140 地点**・33 の国と地域（街・自然・動物・空港・港・火山・鉄道）
- 選んだ場所の**現地時刻**と**いまの天気**を表示
- 最大 4 枚を 2×2 で**並べて見る**
- 日本語 / English

## この設計で一番効いていること

ライブ配信は終わる。videoId は変わる。埋め込みを禁止している配信もある。
放っておくと「死んだリンクだらけの地図」になるので、**カメラの定義（静的）と生存状態（動的）を分けている**。

| | 中身 | どこ | 更新 |
|---|---|---|---|
| マスタ | 名前・座標・タイムゾーン・カテゴリ・配信元・**配信タイトル** | `src/data/cams.ts`（バンドル同梱） | 人がコミット |
| 状態 | 解決済み videoId・live/offline/blocked・視聴者数 | Cloudflare KV（`/api/cams`） | Cron が自動 |

Cron が 10 分ごとに全カメラの生存を確認し、配信が消えたカメラは 1 時間ごとにチャンネルから
現在の配信を探し直す。フロントはマスタを持っているので、`/api/cams` が落ちても地図は出る。

探し直すとき、**チャンネルから適当な 1 本を取ってきてはいけない**。1 つのチャンネルが
何十本もライブを出していて（EarthCam は 42 本）、タイムズスクエアのピンに別の街の映像を
出すことになる。だからマスタは配信タイトルを持っていて、それで見分ける。
見分けがつかないときは、間違った配信を割り当てず offline のままにする
— **誤った映像を出すより、映さない方がよい**。

**YouTube API キーはブラウザに一切出ない**（Worker の secret）。

## 使っているクォータ

無料枠 10,000 units/日 に対して:

| | 単価 | 頻度 | 日あたり |
|---|---|---|---|
| 生存確認 `videos.list` | 1 unit / 50 件 | 10 分ごと | 432 |
| 再探索（uploads を辿る） | 2〜6 units / チャンネル | 毎時・落ちたカメラを持つチャンネルだけ | 0〜1,152 |
| 再探索（検索へ後退） | 101 units | 毎時 1 回まで | 0〜2,424 |
| | | **合計** | **432〜4,000** |

全カメラが生きている平常時は **432 units/日** しか使わない。上の幅は「全チャンネルで
同時にカメラが落ちた」最悪値。

再探索は **チャンネル単位** でまとめる。140 台が 91 チャンネルにぶら下がっている
（EarthCam だけで 25 台）ので、1 回の問い合わせでそのチャンネルのカメラを全部
片付けられる。まず uploads プレイリストを辿り（目当てが揃った時点で打ち切る）、
それでも見つからないときだけ検索（101 units）に後退する。後退は 1 回の実行で
1 チャンネルまで。

> 検索経路は**網羅を保証しない**。`eventType=live` の検索が 42 件返しながら、
> ライブ中の配信を 1 本落としているのを実測で確認している（次ページも無し）。
> uploads を辿る方が確実で、しかも 50 分の 1 の値段だった。

使用量は KV に日毎で積み、**8,000 units で当日の API 呼び出しを止める**（`DAILY_UNIT_BUDGET`）。

## 開発

```sh
npm install
npm run dev          # Vite。/api/cams は無いが地図と再生は動く
npm test
npm run coverage     # 純ロジック層は 100% でないと落ちる
npm run build
```

Cron（生存確認・再探索）まで動かすときだけ API キーが要る。キーは
[Keyway](https://www.keyway.sh/) の vault にあるので、必要なときだけ引いてきて、
終わったら消す（ディスクに生の鍵を置きっぱなしにしない）。

```sh
keyway pull -e development -f .env   # vault → .env（gitignore 済み）
npm run dev:worker                   # wrangler dev --test-scheduled
curl "http://localhost:8787/__scheduled?cron=*/10+*+*+*+*"
rm .env
```

> `keyway run -- wrangler dev` は**効かない**。wrangler は素の環境変数を
> Worker のバインディングとして読まず、`.env` か `.dev.vars` の**ファイル**しか
> 見ないため（実測）。他アプリでの `keyway run -- npm run dev` 方式はここでは使えない。

### カメラを足す

1. `scripts/seed-handles.ts` にチャンネルのハンドルを足す
2. `npm run cams:discover` — いまライブ中の配信を集めて `scripts/out/candidates.json` に出す
3. 出力を見て、地理が一意に定まるものを `scripts/cam-places.ts` に書く
4. `npm run cams:build` — 座標とタイムゾーンを解決し、埋め込み可否を確かめて `src/data/cams.ts` を生成

チャンネル名を知らない相手（町のホテル、港の事務所、自治体）が出しているカメラは、
キーワード検索で探す。`keyway pull -e development -f .env` してから
`npm run cams:search`（`search.list` は 1 語 100 units なので上限を切ってある）。

> 英語と日本語の語だけで回すと結果が英語圏に寄る。ポルトガル語・スペイン語・
> 韓国語・中国語・ポーランド語などで、`regionCode` も振って掘り直すと別の井戸に当たる。

`channelId` と `titleKey` は **`cam-places.ts` に固定する**。毎回のスクレイプ結果を
参照すると、たまたま配信が落ちていたカメラがビルドのたびにマスタから消える
（実際に起きた）。キュレーションの記録は、その時どきの配信状況から独立させる。

座標は記憶で書かない。小さな町は Open-Meteo のジオコーディング（同名地の取り違えは
`admin1` で弾く）、著名なランドマークだけ明示座標。**埋め込みが禁止されている配信は
この時点で落ちる**ので、公開初日から死んだピンが並ぶことはない。

### デプロイ

```sh
npx wrangler kv namespace create CAM_STATE     # 出た id を wrangler.jsonc に書く
npx wrangler secret put YOUTUBE_API_KEY        # Google Cloud で発行したキー
npm run deploy
```

本番のキーは Cloudflare の secret ストアが正本で、Keyway の vault は控え
（新しい機械での復旧用）。

API キーは Google Cloud 側で **YouTube Data API v3 のみ**に制限する
（Worker からの呼び出しにリファラは付かないので、リファラ制限は使えない）。

## 技術構成

Vite + TypeScript（フレームワーク無し） / Leaflet + OpenStreetMap / Cloudflare Workers + KV /
Vitest。天気は Open-Meteo（キー不要）、昼夜の計算は自前（Meeus の太陽位置）。

再生は `youtube-nocookie.com` の iframe だけで完結させ、**YouTube の IFrame Player API は読まない**。
ミュート制御とエラー検知は `enablejsapi=1` の postMessage で足りるので、CSP の `script-src` を
`'self'` のまま保てる。
