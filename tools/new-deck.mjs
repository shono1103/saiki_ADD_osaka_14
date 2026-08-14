#!/usr/bin/env node
/**
 * catalog/ のデッキ構成を本番（deck/）に流し込む。
 * 章扉（layout: section-divider）で区切り、章ごとに deck/pages/ へ書き出す。
 * deck/slides.md には headmatter・表紙・目次と、各章への src: だけが残る。
 *
 *   pnpm run new                 … 使えるデッキ構成の一覧を表示
 *   pnpm run new tech-talk       … deck/ が空ならそのまま展開
 *   pnpm run new tech-talk -f    … 既存の deck/slides.md と deck/pages/ を退避して上書き
 *   pnpm run new tech-talk --flat … 分割せず 1 ファイルのまま deck/slides.md に置く
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, rmSync, writeFileSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'
import { catalogDir, deckEntry, listCatalog, printCatalog } from './catalog.mjs'
import { buildIndex, parseDeck, splitIntoChapters, stringifySlides } from './split-deck.mjs'

const deckDir = dirname(deckEntry)
const pagesDir = join(deckDir, 'pages')

// patterns.md は 1 画面単位のカタログなので、デッキの雛形としては使わない
const entries = listCatalog({ includePatterns: false })
const args = process.argv.slice(2)
const force = args.includes('--force') || args.includes('-f')
const flat = args.includes('--flat')
const name = args.find(arg => !arg.startsWith('-'))

if (!name) {
  console.log('\n使えるデッキ構成:')
  printCatalog(entries, '使い方: pnpm run new <名前>')
  process.exit(0)
}

const source = join(catalogDir, `${name}.md`)
if (!entries.some(e => e.name === name) || !existsSync(source)) {
  console.error(`\nデッキ構成 "${name}" が見つかりません。`)
  printCatalog(entries, '使い方: pnpm run new <名前>')
  process.exit(1)
}

const hasPages = existsSync(pagesDir) && readdirSync(pagesDir).some(f => f.endsWith('.md'))
if ((existsSync(deckEntry) || hasPages) && !force) {
  console.error('\ndeck/ に既存のスライドがあります。')
  console.error('上書きする場合は --force を付けてください（既存ファイルは退避されます）。')
  console.error(`\n  pnpm run new ${name} --force\n`)
  process.exit(1)
}

// 既存の成果物を退避する
if (existsSync(deckEntry) || hasPages) {
  const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
  if (existsSync(deckEntry)) {
    const backup = join(deckDir, `slides.${stamp}.bak.md`)
    renameSync(deckEntry, backup)
    console.log(`既存の deck/slides.md を deck/${basename(backup)} に退避しました。`)
  }
  if (hasPages) {
    const backup = join(deckDir, `pages.${stamp}.bak`)
    renameSync(pagesDir, backup)
    console.log(`既存の deck/pages/ を deck/${basename(backup)}/ に退避しました。`)
  }
}

const { headmatter, slides } = parseDeck(readFileSync(source, 'utf8'))

if (flat) {
  writeFileSync(deckEntry, `${headmatter}\n\n${stringifySlides(slides)}`)
  console.log(`\n✓ catalog/${name}.md を deck/slides.md に展開しました（分割なし・${slides.length} 枚）。`)
  console.log('  pnpm dev で編集を開始できます。\n')
  process.exit(0)
}

const { opening, chapters } = splitIntoChapters(slides)

if (!chapters.length) {
  writeFileSync(deckEntry, `${headmatter}\n\n${stringifySlides(slides)}`)
  console.log(`\n✓ catalog/${name}.md を deck/slides.md に展開しました（${slides.length} 枚）。`)
  console.log('  章扉（layout: section-divider）が無いため分割していません。\n')
  process.exit(0)
}

rmSync(pagesDir, { recursive: true, force: true })
mkdirSync(pagesDir, { recursive: true })
for (const c of chapters) writeFileSync(join(pagesDir, c.file), stringifySlides(c.slides))
writeFileSync(deckEntry, buildIndex(headmatter, opening, chapters))

console.log(`\n✓ catalog/${name}.md を deck/ に展開しました（全 ${slides.length} 枚）。`)
console.log(`\n  deck/slides.md            表紙・目次と各章への src:（${opening.length} 枚）`)
for (const c of chapters) {
  console.log(`  deck/pages/${c.file.padEnd(24)} ${c.title}（${c.slides.length} 枚）`)
}
console.log('\n  pnpm dev で編集を開始できます。\n')
