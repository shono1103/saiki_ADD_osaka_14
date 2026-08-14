---
# LT（ライトニングトーク）5 分向け
# 特徴: 1 枚 1 メッセージ。詰め込まず、テンポで見せる
theme: default
# 共通のレイアウト / コンポーネント / スタイル（shared/）を読み込む
addons:
  - shared
title: LT タイトル
info: |
  ## LT タイトル
  5 分の LT 用スライドです。
author: Your Name
layout: cover
class: text-center
transition: slide-left
mdc: true
colorSchema: light
aspectRatio: 16/9
canvasWidth: 980
lineNumbers: false
drawings:
  persist: false
fonts:
  sans: Noto Sans JP
  serif: Noto Serif JP
  mono: Fira Code
  weights: '300,400,600,700'
  italic: false
exportFilename: lightning-talk
---

# LT タイトル

一番言いたいことを 1 行で

<p class="abs-br m-6 text-sm opacity-60">
  2026-01-01 / Your Name / #イベント名
</p>

<!--
【0:00-0:15】タイトルを読み上げるだけ。長い挨拶はしない。
LT は「1 枚 20 秒」が目安。5 分なら 12〜15 枚。
-->

---
layout: center
class: text-center
---

## こんにちは、Your Name です

<p class="mt-6 text-xl opacity-80">
  所属 / 普段やっていること
</p>

<p class="mt-8 flex justify-center gap-6 text-sm opacity-60">
  <span>X: @your_id</span>
  <span>GitHub: your_id</span>
</p>

<!--
【0:15-0:35】自己紹介は 20 秒で切る。経歴の羅列はしない。
「今日の話に関係する自分の属性」だけに絞る。
-->

---
layout: center
class: text-center
---

# 今日話すこと

<p class="mt-8 text-3xl font-bold text-brand">
  ◯◯ を △△ したら □□ になった話
</p>

<!--
【0:35-0:50】結論を先に出す。オチを隠さないほうが最後まで聞いてもらえる。
-->

---

# きっかけ / 困っていたこと

<v-clicks>

- 毎回 ◯◯ の作業に △△ 分かかっていた
- 手作業なのでミスが起きる
- チームの他のメンバーも同じことをしていた

</v-clicks>

<p v-click class="mt-8 callout-box">
  「これ、自動化できるのでは？」
</p>

<!--
【0:50-1:40】聞き手が「あるある」と思える具体的な情景を 1 つ。
数字を 1 つ入れると一気に説得力が出る。
-->

---

# やったこと

<v-clicks>

- ◯◯ を使って △△ を自動化した
- 既存の □□ に組み込むだけで動くようにした
- 設定は YAML 1 ファイルのみ

</v-clicks>

<div v-click>

```bash
$ npx your-tool init
✓ 設定ファイルを生成しました
```

</div>

<!--
【1:40-2:40】実装の詳細には踏み込まない。「何をしたか」だけ。
技術的な深掘りは懇親会 / 資料公開に回す。
-->

---
layout: center
class: text-center
---

# デモ

<p class="mt-8 text-lg opacity-70">
  （ここで画面を切り替える / GIF を貼る）
</p>

<!--
【2:40-3:40】デモは録画（GIF・動画）を推奨。ライブデモは失敗するとリカバリが効かない。
動画を埋め込む場合は <SlidevVideo autoplay> を使う。
-->

---

# 結果

<dl class="grid grid-cols-3 gap-6 mt-8 text-center">
  <div class="note-box">
    <dd class="text-4xl font-bold text-brand">-85%</dd>
    <dt class="mt-2 opacity-70">作業時間</dt>
  </div>
  <div class="note-box">
    <dd class="text-4xl font-bold text-brand">0件</dd>
    <dt class="mt-2 opacity-70">手作業ミス</dt>
  </div>
  <div class="note-box">
    <dd class="text-4xl font-bold text-brand">12人</dd>
    <dt class="mt-2 opacity-70">利用メンバー</dt>
  </div>
</dl>

<!--
【3:40-4:10】数字は 3 つまで。多いと印象に残らない。
-->

---

# 学んだこと

<v-clicks>

- 小さく作って、まず自分だけで使ってみるのが早い
- ◯◯ という落とし穴があった
- 次は △△ にも広げたい

</v-clicks>

<!--
【4:10-4:40】失敗談を 1 つ入れると共感を得やすい。
-->

---
layout: center
class: text-center
---

# ありがとうございました

<p class="mt-6 text-xl">
  ◯◯ を △△ したら □□ になりました
</p>

<p class="mt-10 flex justify-center gap-8 text-sm opacity-70">
  <span>リポジトリ: github.com/your_id/your-repo</span>
  <span>スライド: your-slides-url</span>
</p>

<!--
【4:40-5:00】最後にもう一度、結論とリンクを出す。
QR コードを置いておくと親切。
-->
