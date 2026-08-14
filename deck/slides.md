---
# ===== ここから headmatter（デッキ全体の設定）=====
# テーマ: default / seriph / apple-basic など（package.json に追加すれば任意のテーマを利用可）
theme: default
# 共通のレイアウト / コンポーネント / スタイル（shared/）を読み込む
addons:
  - shared

# ブラウザのタブや PDF のタイトルになる
title: プレゼンテーションのタイトル
titleTemplate: '%s'

# 発表者ツールや共有時に表示される概要
info: |
  ## プレゼンテーションのタイトル

  ここに発表の概要を書きます。

  作成: [Slidev](https://sli.dev)
author: Your Name
keywords: slidev,presentation

# 1 枚目のスライドの設定も headmatter に書く
layout: cover
class: text-center

# スライド切り替えアニメーション
transition: slide-left

# Markdown 内で Vue コンポーネントの props を書ける MDC 構文を有効化
mdc: true

# light / dark / auto
colorSchema: light

# 画面比率とレンダリング幅（数値を上げると相対的に文字が小さくなる）
aspectRatio: 16/9
canvasWidth: 980

# コードブロックの行番号
lineNumbers: false

# 手書き注釈をファイルに保存するか（true にすると .slidev/drawings に保存される）
drawings:
  persist: false

# Google Fonts から自動ロードされる。日本語は Noto 系が無難
fonts:
  sans: Noto Sans JP
  serif: Noto Serif JP
  mono: Fira Code
  weights: '300,400,600,700'
  italic: false

# エクスポート既定値（CLI の引数が優先される）
exportFilename: slides
export:
  format: pdf
  dark: false
  withClicks: false
  withToc: false

seoMeta:
  ogTitle: プレゼンテーションのタイトル
  ogDescription: ここに発表の概要を書きます。
# ===== headmatter ここまで =====
---

# プレゼンテーションのタイトル

サブタイトルや一言説明をここに

<p class="abs-br m-6 text-sm opacity-60">
  2026-01-01 / Your Name
</p>

<!--
これはスピーカーノートです。発表者ツール（Presenter Mode）にだけ表示されます。
`pnpm dev` 実行後、右下のツールバーまたは http://localhost:3030/presenter から開けます。
-->

---
layout: default
---

# 目次

<Toc minDepth="1" maxDepth="1" columns="2" />

---
src: ./pages/01-basics.md
---

---
src: ./pages/02-layout.md
---

---
src: ./pages/03-split.md
---

---
src: ./pages/04-present.md
---

---
src: ./pages/05-closing.md
---
