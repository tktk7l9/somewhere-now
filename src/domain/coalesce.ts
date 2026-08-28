// 連続した更新要求を 1 回の実行にまとめる。
//
// 地図と地球儀は「状態・表示対象・選択・言語」を別々のメソッドで受け取るので、
// 素直に書くと 1 度の画面更新で 4 回描き直すことになる。カメラが 5,720 台あると
// この 4 倍がそのままピン生成の 4 倍になり、モバイルで数秒の固まりになる。
//
// DOM に触らない純粋な仕組みなので、ここ(テスト必須の層)に置く。

/**
 * `run` の実行要求をまとめる関数を返す。まとめる単位は `schedule` が決める
 * (既定はマイクロタスク＝同じ処理の流れの中で出た要求はすべて 1 回にまとまる)。
 */
export function coalesced(run: () => void, schedule: (cb: () => void) => void = queueMicrotask): () => void {
  let queued = false;
  return () => {
    if (queued) return;
    queued = true;
    schedule(() => {
      queued = false;
      run();
    });
  };
}
