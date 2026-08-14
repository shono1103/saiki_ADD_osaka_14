# Slidev プレゼンテーションテンプレート

[Slidev](https://sli.dev) でスライドを作るためのプロジェクトです。
**台本を書く → 参照デッキを眺める → 本番デッキを作る** という流れを、3 つのディレクトリに分けています。

```
script/     ①台本を書く（人間）
   ↓        AI に渡す
catalog/    ②見せ方を選ぶ（構成 10 種 / 1画面パターン 67 種）
   ↓
deck/       ③本番デッキ（成果物）
```

## セットアップ

パッケージマネージャーは **pnpm** を使います。

```bash
pnpm install
pnpm dev
```

pnpm が入っていない場合は Corepack で有効化できます。

```bash
corepack enable
```

## 使い方

### 1. 台本を書く（`script/`）

```bash
cp script/_format.md script/2026-02-15-my-talk.md
```

ゴール・伝えたいこと・章ごとの内容と時間配分・数字と出典を埋めます。
書き方は [`script/README.md`](script/README.md)、記入例は `script/example-tech-talk.md` を参照してください。

### 2. 見せ方を選ぶ（`catalog/`）

```bash
pnpm run view              # 閲覧できるデッキの一覧
pnpm run view patterns     # 1 画面パターン集（67 種）
pnpm run view tech-talk    # 技術解説のデッキ構成
```

ブラウザで開きます。<kbd>o</kbd> で全スライドの一覧表示。
気に入った構成があれば台本の frontmatter に `deck: tech-talk` と書いておきます。
1 画面単位の希望があれば、章ごとに `P08 Before / After` のように P 番号を書きます。

詳細は [`catalog/README.md`](catalog/README.md)。

### 3. 本番デッキを作る（`deck/`）

AI に台本を渡します。

> `script/2026-02-15-my-talk.md` の台本から `deck/slides.md` を作成してください

AI 向けの変換手順・制約は [`CLAUDE.md`](CLAUDE.md) に書いてあります。

手作業でカタログの構成から始めることもできます。

```bash
pnpm run new tech-talk          # 章扉で切って deck/ に展開
pnpm run new tech-talk --force  # 既存をバックアップして上書き
pnpm run new tech-talk --flat   # 分割せず 1 ファイルで展開
```

展開すると、こうなります。

```
deck/slides.md            表紙・目次と各章への src:（4 枚）
deck/pages/01-背景と課題.md   背景と課題（2 枚）
deck/pages/02-仕組み.md      仕組み（4 枚）
deck/pages/03-実践.md       実践（5 枚）
```

できたら確認します。

```bash
pnpm dev
```

## コマンド

| コマンド | 内容 |
| --- | --- |
| `pnpm dev` | 本番デッキ（`deck/slides.md`）を開く |
| `pnpm run view [名前]` | カタログのデッキを閲覧する |
| `pnpm run new <名前>` | カタログの構成を `deck/slides.md` に流し込む |
| `pnpm run audit [名前]` | ブラウザで描画して崩れを自動検出（`--shot` で PNG 保存） |
| `pnpm build` | 静的サイトとして `dist/` に出力 |
| `pnpm serve` | ビルド結果をローカルで確認 |
| `pnpm pdf` | PDF を `export/slides.pdf` に出力 |
| `pnpm pdf:clicks` | クリックアニメーションを 1 ページずつ展開した PDF |
| `pnpm png` | 各スライドを PNG で `export/png/` に出力 |
| `pnpm notes` | スピーカーノートを `export/notes.pdf` に出力 |

## ディレクトリ構成

```
.
├── CLAUDE.md              AI 向けの作業手順（台本 → 本番の変換ルール）
│
├── script/                ① 台本
│   ├── _format.md         台本の雛形。コピーして使う
│   └── example-tech-talk.md
│
├── catalog/               ② デッキ閲覧（参照専用）
│   ├── patterns.md        1 画面パターン集 67 種
│   ├── tech-talk.md       用途別デッキ構成 10 種
│   ├── proposal.md
│   ├── ...
│   └── public/images/
│
├── deck/                  ③ 本番デッキ（成果物）
│   ├── slides.md          目次ファイル（headmatter・表紙・各章への src:）
│   ├── pages/             章ごとの本文。ここを書く
│   │   ├── 01-basics.md
│   │   └── 02-layout.md
│   ├── snippets/          スライドに取り込むコード片
│   └── public/images/     自分の画像はここに置く
│
├── shared/                共通部品（Slidev addon として読み込まれる）
│   ├── layouts/section-divider.vue
│   ├── components/Counter.vue
│   ├── styles/index.css   日本語向けの禁則処理・約物詰め・行間
│   ├── global-bottom.vue  全スライド共通のフッター（ページ番号）
│   └── uno.config.ts      UnoCSS のショートカットと brand カラー
│
└── tools/                 view / new のスクリプト
```

### なぜ `shared/` は addon なのか

Slidev は**エントリファイルのあるディレクトリ**をプロジェクトルートとして扱います。
そのため `deck/slides.md` と `catalog/patterns.md` は別々のルートになり、
`layouts/` や `styles/` をそのまま共有できません。

`shared/` を pnpm workspace 上の Slidev addon（`slidev-addon-shared`）にして、
各デッキの headmatter で読み込むことで解決しています。

```yaml
theme: default
addons:
  - shared
```

**この 2 行を消すとカスタムレイアウトが解決できずビルドが落ちます。**

画像だけは addon 経由だと `/theme/images/...` になってしまうため、
`deck/public/` と `catalog/public/` にそれぞれ置いています。

## カスタマイズ

### 色を変える

`shared/styles/index.css` の `--slidev-theme-primary` と、
`shared/uno.config.ts` の `brand` を同じ値に書き換えると、
章扉・コンポーネント・パターン集の色がまとめて変わります。

### テーマを変える

各デッキの headmatter の `theme` を変更します。`seriph` は同梱済みです。

```bash
pnpm add @slidev/theme-apple-basic   # 他のテーマを使う場合
```

テーマ一覧: https://sli.dev/resources/theme-gallery

### フォント

headmatter の `fonts` に指定したフォントは Google Fonts から自動で読み込まれます。
日本語は `Noto Sans JP` / `Noto Serif JP` が無難です。

### ページ番号を消す

`shared/global-bottom.vue` を削除するか、中身を空にしてください。

## マークアップの決まり

レイアウトのためだけの `<div>` を並べず、意味に合ったタグを使っています。
列挙は `<ul>` / `<ol>`、ラベルと値の対は `<dl>`、引用は `<blockquote>`、図表は `<figure>`。
CSS で描いたグラフには `role="img"` と `aria-label` で数値を書き、装飾は `aria-hidden="true"`。

テーマ側の指定（`.slidev-layout ul { list-style: square }` など）は詳細度が高いため、
**`!list-none` や `!text-base` のように `!` を付けて上書き**しています。これを外すと見た目が崩れます。

詳細は [`CLAUDE.md`](CLAUDE.md) の「マークアップの決まり」を参照してください。

## 崩れの自動検出

```bash
pnpm run audit              # 本番デッキ
pnpm run audit patterns     # パターン集
pnpm run audit tech-talk --shot   # PNG も .audit/ に保存
```

Playwright で実際に描画し、**スライド枠からのはみ出し・生タグの流出・空スライド**を検出します。
図が画面下に切れている、といった目視では見落としやすい崩れを機械的に拾えます。

## つまずきやすい点

- **headmatter の `addons: - shared` を消さない** — カスタムレイアウトが解決できなくなります。
- **スライド内 `<style>` の CSS コメントに HTML タグ名を書かない** — Vue のパーサーが
  タグの入れ子と誤認してビルドが失敗します。
- **`<div>` の中で改行を保ちたいときは生 HTML で書く** — 空行を挟むと中身が Markdown として
  解釈され、連続した行が 1 つの段落にまとめられます。
- **コードブロックの中に `---` を単独行で書かない** — スライドの区切りとして解釈されます。
- **`<img src>` の画像は実在させる** — 無いとビルドが `UNRESOLVED_IMPORT` で落ちます。

## 公開する

デプロイ先は **GitHub Pages（無料枠）** に固定しています。
公開されるのは **リリースタグを push したときだけ**です。`main` への push では公開されません。

```bash
git tag v1.0.0
git push origin v1.0.0   # ここで .github/workflows/deploy.yml が走る
```

タグを付けずに流したいときは、Actions タブの「Deploy to GitHub Pages」から手動実行できます。

初回だけリポジトリ側の設定が必要です。

1. リポジトリを **public** にする（private のまま Pages を使うには有料プランが必要）
2. Settings → Pages → Source を「**GitHub Actions**」にする

公開 URL は `https://<ユーザー名>.github.io/<リポジトリ名>/` です。
サブパス配信になるため、ワークフローは `--base /<リポジトリ名>/` を付けてビルドしています。

手元で出力を確認するときは次のとおりです。

```bash
pnpm build   # dist/ に出力
pnpm serve   # dist/ をローカルで配信
```

無料枠の目安は公開サイト 1 GB・転送量 100 GB/月（いずれもソフトリミット）。
public リポジトリなら GitHub Actions の実行時間も無料です。

## 参考リンク

- [ドキュメント](https://sli.dev)
- [構文リファレンス](https://sli.dev/guide/syntax)
- [組み込みレイアウト一覧](https://sli.dev/builtin/layouts)
- [組み込みコンポーネント一覧](https://sli.dev/builtin/components)
