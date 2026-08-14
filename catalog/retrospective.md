---
# ふりかえり（KPT）向け
# 特徴: 事実 → 感情 → 発見 → 次の一手。ファシリテーション用の進行台本つき
theme: default
# 共通のレイアウト / コンポーネント / スタイル（shared/）を読み込む
addons:
  - shared
title: スプリント ◯◯ ふりかえり
info: |
  ## スプリント ◯◯ ふりかえり
  KPT 形式のふりかえり用スライドです。
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
exportFilename: retrospective
---

# スプリント ◯◯ ふりかえり

2025-12-15 〜 2026-01-05

<p class="abs-br m-6 text-sm opacity-60">
  ファシリテーター: Your Name
</p>

<!--
【全体 60 分】
ふりかえりは「反省会」ではなく「次を良くする設計会議」。
ファシリテーターは意見を言わず、場を回すことに集中する。
-->

---
layout: center
---

<div class="callout-box">

## ふりかえりの約束

- 個人ではなく、**仕組みとプロセス**の話をします
- 「そのとき最善と思ってやった」を前提に話します
- 出た意見を否定しません。まず全部出します

</div>

<p class="mt-8 text-center text-sm opacity-60">
  【5 分】場を温める。初参加者がいるときは必ず読み上げる
</p>

---

# 今回のスコープ

<div class="grid grid-cols-2 gap-8 mt-6">

<div>

## 対象

- **期間**: 2025-12-15 〜 2026-01-05（3 週間）
- **スプリント**: Sprint 24
- **参加者**: 6 名

</div>

<div>

## 進め方

| 時間 | 内容 |
| --- | --- |
| 5 分 | 場の設定 |
| 10 分 | 数値の確認 |
| 15 分 | Keep |
| 15 分 | Problem |
| 15 分 | Try |

</div>

</div>

---

# 数値でふりかえる

| 指標 | 前回 | 今回 | 変化 |
| --- | --- | --- | --- |
| 完了ストーリーポイント | 34 | 41 | +7 |
| 計画達成率 | 78% | 91% | +13pt |
| 差し戻し件数 | 9 件 | 4 件 | -5 |
| 平均リードタイム | 6.2 日 | 4.8 日 | -1.4 日 |
| 残業時間（合計） | 18h | 6h | -12h |

<p class="mt-6 note-box text-sm">
  【10 分】まず事実を全員で共有する。解釈は次のパートで
</p>

<!--
数値は議論の起点。「なんとなく忙しかった」を「実際どうだったか」に変換する。
数値が取れていない場合は、次のスプリントで取ることを Try にする。
-->

---
layout: section-divider
number: "K"
---

# Keep

続けたいこと・うまくいったこと

---

# Keep

<v-clicks>

- **朝会を 10 分に短縮した** — 議論は別枠にしたことで集中できた
- **ペア作業を週 2 回入れた** — レビュー待ちが減り、リードタイムが縮んだ
- **設計を先に文書化した** — 手戻りが目に見えて減った
- **◯◯ の自動化** — 手作業が週 3 時間分なくなった

</v-clicks>

<p v-click class="mt-8 callout-box text-sm">
  【15 分】まず Keep から。良かったことを先に出すと、Problem が出しやすくなります
</p>

<!--
Keep が出ないチームは疲弊しているサイン。
「当たり前にできていること」を掘り起こす質問を投げる。
-->

---
layout: section-divider
number: "P"
---

# Problem

困ったこと・改善したいこと

---

# Problem

<v-clicks>

- **仕様の確認待ちが多かった** — 平均 1.5 日のブロック時間が発生
- **テスト環境が不安定** — 週 2 回は誰かが手を止めていた
- **レビューが特定の人に集中** — ◯◯ さんに 68% が集中していた
- **スプリント後半に差し込みが多い** — 計画が崩れる

</v-clicks>

<p v-click class="mt-8 note-box text-sm">
  【15 分】人名は「困った事象」としてのみ扱い、責任追及には使わないこと
</p>

<!--
Problem は数を出すことを優先し、その場で解決策を議論しない。
解決策を話し始めると、後半の意見が出なくなる。
-->

---
layout: section-divider
number: "T"
---

# Try

次のスプリントで試すこと

---

# Try

<div class="mt-4">

| # | やること | なぜ | 担当 | 判定日 |
| --- | --- | --- | --- | --- |
| 1 | 仕様質問用のチャンネルを作り、24h 以内回答を合意 | 確認待ちを削る | ◯◯ | 1/26 |
| 2 | レビュー担当をローテーションする | 属人化の解消 | △△ | 1/26 |
| 3 | 差し込みは翌スプリントに回すルールを試す | 計画の安定 | □□ | 1/26 |

</div>

<p class="mt-6 callout-box text-sm">
  Try は <strong>3 つまで</strong>。多いと全部やらずに終わります
</p>

<!--
【15 分】Try は「次回のふりかえりで効果を判定できる」粒度にする。
「頑張る」「意識する」は Try にしない。行動に落とす。
-->

---
layout: center
class: text-center
---

# 次回

<div class="mt-8 text-xl leading-loose">

**日時**: 2026-01-26（月）15:00-16:00

**冒頭で確認すること**: 今回の Try 3 件の結果

</div>

<p class="mt-10 text-sm opacity-60">
  お疲れさまでした
</p>

<!--
次回の冒頭で Try を判定することを宣言しておく。
これがないと Try が形骸化する。
-->
