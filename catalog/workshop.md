---
# ハンズオン / 研修向け
# 特徴: 手を動かす前提。進捗の足並みを揃えるチェックポイントを挟む
theme: default
# 共通のレイアウト / コンポーネント / スタイル（shared/）を読み込む
addons:
  - shared
title: ◯◯ ハンズオン
info: |
  ## ◯◯ ハンズオン
  実際に手を動かしながら学ぶ研修用スライドです。
author: Your Name
layout: cover
class: text-center
transition: slide-left
mdc: true
colorSchema: light
aspectRatio: 16/9
canvasWidth: 980
lineNumbers: true
drawings:
  persist: false
fonts:
  sans: Noto Sans JP
  serif: Noto Serif JP
  mono: Fira Code
  weights: '300,400,600,700'
  italic: false
exportFilename: workshop
---

# ◯◯ ハンズオン

手を動かして △△ を作ってみる

<p class="abs-br m-6 text-sm opacity-60">
  2026-01-01 / 講師: Your Name / 所要 120 分
</p>

<!--
ハンズオンは「置いていかれた人」が出た時点で失敗する。
チェックポイントを細かく挟み、詰まった人を拾う設計にする。
-->

---

# このハンズオンのゴール

<p class="callout-box text-lg">
  終わったときに、<strong>自分の手で ◯◯ を作って動かせる</strong>状態になります
</p>

<div class="mt-8">

<v-clicks>

- ◯◯ の基本的な使い方がわかる
- △△ を自分で設定できる
- エラーが出たときに、どこを見ればいいかわかる

</v-clicks>

</div>

<!--
ゴールは「知る」ではなく「できる」で書く。
ハンズオンの価値は、動くものが手元に残ること。
-->

---
layout: two-cols
layoutClass: gap-8
---

# 対象者

- ◯◯ を触ったことがない方
- △△ の基本操作ができる方
- ターミナルでコマンドを実行できる方

## 不要な知識

- □□ の内部実装
- ◇◇ の運用経験

::right::

# タイムテーブル

| 時間 | 内容 |
| --- | --- |
| 0:00 | 環境確認 |
| 0:15 | Step 1: 初期設定 |
| 0:40 | Step 2: 基本操作 |
| 1:10 | 休憩（10 分） |
| 1:20 | Step 3: 応用 |
| 1:50 | まとめ・質疑 |

<!--
休憩を必ず入れる。90 分を超えると集中力が落ちる。
-->

---

# 環境の準備

以下がインストール済みか確認してください。

```bash
$ node -v
v20.0.0 以上

$ git --version
git version 2.30 以上
```

<div class="mt-6">

サンプルリポジトリを取得します。

```bash
$ git clone https://github.com/your_id/workshop-sample.git
$ cd workshop-sample
$ npm install
```

</div>

<p class="mt-6 callout-box">
  ここまでできたら、チャットに 👍 を送ってください
</p>

<!--
【15 分】環境構築が一番の難所。事前に案内を送っておくのが理想。
それでも 2 割は当日詰まるので、TA を配置できると安心。
-->

---
layout: section-divider
number: "01"
---

# Step 1: 初期設定

---

# Step 1: 設定ファイルを作る

`config.ts` を新規作成し、以下を書いてください。

```ts {all|2-3|5-8}{lines:true}
export default {
  // 1. プロジェクト名を自分の名前にしてください
  name: 'your-name-app',

  // 2. ここは変更不要です
  target: 'development',
  port: 3000,
}
```

<div class="mt-6">

保存したら実行します。

```bash
$ npm run dev
```

</div>

<!--
【25 分】コピペではなく、1 箇所は自分で書き換えさせると理解が定着する。
-->

---
layout: center
---

# ✅ チェックポイント 1

<div class="mt-8 text-lg">

ブラウザで `http://localhost:3000` を開き、
以下の画面が表示されていれば OK です。

</div>

<div class="mt-8 center-box">
  <p class="w-96 h-40 rounded-lg bg-brand opacity-15 center-box text-sm opacity-70">
    （スクリーンショットを貼る）
  </p>
</div>

<p class="mt-8 text-center text-sm opacity-70">
  できた方は 👍 / 詰まっている方は ❓ をチャットに送ってください
</p>

<!--
チェックポイントでは必ず全員の状況を確認してから次へ進む。
ここを飛ばすと、後半で脱落者が続出する。
-->

---
layout: section-divider
number: "02"
---

# Step 2: 基本操作

---

# Step 2: ◯◯ を追加する

<div class="grid grid-cols-2 gap-6">

<div>

## やること

<v-clicks>

1. `src/items.ts` を開く
2. `addItem` 関数を実装する
3. ブラウザで動作を確認する

</v-clicks>

</div>

<div>

```ts {lines:true}
export function addItem(
  items: Item[],
  name: string,
): Item[] {
  // ここに実装してください
  return items
}
```

</div>

</div>

<p class="mt-4 note-box text-sm">
  ヒント: 配列を破壊せず、新しい配列を返すようにしましょう
</p>

<!--
【30 分】穴埋め形式にすると、写経より頭を使わせられる。
制限時間を宣言し、時間が来たら答えを出す。
-->

---

# 解答例

```ts {lines:true}
export function addItem(items: Item[], name: string): Item[] {
  return [
    ...items,
    { id: crypto.randomUUID(), name, done: false },
  ]
}
```

<p class="mt-6 callout-box">
  ポイント: <code>...items</code> で既存要素をコピーしてから追加しています
</p>

---

# よくあるエラー

| エラーメッセージ | 原因 | 対処 |
| --- | --- | --- |
| `EADDRINUSE` | ポート 3000 が使用中 | `PORT=3001 npm run dev` |
| `Cannot find module` | `npm install` 未実行 | `npm install` を実行 |
| `Type error: ...` | 型の指定漏れ | エラー行の型注釈を確認 |
| 画面が真っ白 | ビルドエラー | ターミナルのログを確認 |

<!--
過去の開催で実際に出たエラーを蓄積していく。
このスライドがハンズオンの資産になる。
-->

---
layout: section-divider
number: "03"
---

# Step 3: 応用

---

# Step 3: 自由課題

<div class="mt-4">

以下から 1 つ選んで実装してみてください。

</div>

<ul class="!list-none grid grid-cols-3 gap-4 mt-6">
  <li class="note-box">
    <h2 class="!text-base !mb-0">初級</h2>
    <p class="mt-2 text-sm">アイテムを削除できるようにする</p>
  </li>
  <li class="note-box">
    <h2 class="!text-base !mb-0">中級</h2>
    <p class="mt-2 text-sm">完了・未完了で絞り込む</p>
  </li>
  <li class="note-box">
    <h2 class="!text-base !mb-0">上級</h2>
    <p class="mt-2 text-sm">ブラウザに保存して再読込に耐える</p>
  </li>
</ul>

<p class="mt-8 text-sm opacity-70">
  詰まったら遠慮なく声をかけてください
</p>

<!--
【30 分】難易度を分けると、進度の違いを吸収できる。
早く終わった人には上級に進んでもらう。
-->

---
layout: center
class: text-center
---

# まとめ

<div class="mt-8 text-left inline-block">

<v-clicks>

- ◯◯ を使って △△ を作りました
- 設定 → 実装 → 確認のサイクルを一通り体験しました
- エラーはターミナルのログから追えます

</v-clicks>

</div>

---
layout: center
class: text-center
---

# 次の一歩

<div class="mt-8 text-left inline-block leading-loose">

- 公式チュートリアル: https://example.com/tutorial
- 今日のサンプル（解答つき）: https://github.com/your_id/workshop-sample
- 質問チャンネル: `#◯◯-help`

</div>

<p class="mt-10 text-xl">
  お疲れさまでした 🎉
</p>

<!--
「今日で終わり」にしないための導線を必ず用意する。
アンケートのリンクもここに置くと回収率が上がる。
-->
