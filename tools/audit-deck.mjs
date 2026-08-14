#!/usr/bin/env node
/**
 * デッキを実際にブラウザで描画し、レイアウトの崩れを自動検出する。
 *
 *   pnpm run audit                 … 本番デッキ（deck/slides.md）を検査
 *   pnpm run audit patterns        … catalog/patterns.md を検査
 *   pnpm run audit tech-talk       … catalog/tech-talk.md を検査
 *   pnpm run audit patterns --shot … 併せて 1 枚ずつ PNG を .audit/ に保存
 *
 * 検出するもの:
 *   - スライド枠からのはみ出し（切れて見えなくなっている要素）
 *   - 生の HTML タグがテキストとして表示されている（Markdown 解釈の事故）
 *   - 内容が空のスライド
 */
import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { load } from '@slidev/parser/fs'
import { chromium } from 'playwright-chromium'
import { catalogDir, deckEntry, listCatalog, printCatalog, root } from './catalog.mjs'

const args = process.argv.slice(2)
const withShots = args.includes('--shot')
const name = args.find(a => !a.startsWith('-'))

let entry = deckEntry
if (name) {
  entry = join(catalogDir, `${name}.md`)
  if (!existsSync(entry)) {
    console.error(`\n"${name}" は catalog/ にありません。`)
    printCatalog(listCatalog(), '使い方: pnpm run audit [名前]')
    process.exit(1)
  }
}

const PORT = 3099
const shotDir = join(root, '.audit')
if (withShots) {
  rmSync(shotDir, { recursive: true, force: true })
  mkdirSync(shotDir, { recursive: true })
}

console.log(`\n検査対象: ${entry.replace(root + '/', '')}`)

const server = spawn(join(root, 'node_modules', '.bin', 'slidev'), [entry, '--port', String(PORT)], {
  stdio: 'ignore',
})
const stop = () => { try { server.kill() } catch {} }
process.on('exit', stop)
process.on('SIGINT', () => { stop(); process.exit(130) })

const base = `http://localhost:${PORT}`
await waitForServer(base, 60_000)

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } })
const problems = []

// スライド総数は Slidev のパーサーから取る（src: での分割も解決される）
const total = (await load({ userRoot: dirname(entry), entry }, entry)).slides.length
console.log(`スライド数: ${total}\n`)

for (let i = 1; i <= total; i++) {
  // networkidle は HMR の WebSocket で滞留するため使わない
  await page.goto(`${base}/${i}`, { waitUntil: 'load' })
  await page.waitForSelector('#slide-content', { timeout: 20_000 }).catch(() => {})
  await page.waitForTimeout(300)

  const r = await page.evaluate(() => {
    const slide = document.querySelector('#slide-content')
    if (!slide) return { fatal: 'スライド要素が見つからない' }
    const box = slide.getBoundingClientRect()
    const tolerance = 2
    const overflow = []
    for (const el of slide.querySelectorAll('*')) {
      const cs = getComputedStyle(el)
      if (cs.display === 'none' || cs.visibility === 'hidden') continue
      const b = el.getBoundingClientRect()
      if (b.width === 0 || b.height === 0) continue
      const over = {
        上: box.top - b.top, 左: box.left - b.left,
        右: b.right - box.right, 下: b.bottom - box.bottom,
      }
      const [dir, px] = Object.entries(over).sort((a, c) => c[1] - a[1])[0]
      if (px > tolerance) {
        overflow.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.getAttribute('class') || '').split(' ')[0] || '',
          px: Math.round(px),
          dir,
        })
      }
    }
    const seen = new Set()
    const uniq = overflow.filter(o => {
      const k = `${o.tag}.${o.cls}.${o.dir}`
      if (seen.has(k)) return false
      seen.add(k); return true
    })
    const text = slide.innerText || ''
    return {
      leak: /<(div|span|img|ul|ol|li|table|figure|dl)[\s>]/.test(text) || /\sclass="/.test(text),
      empty: text.trim().length < 8,
      overflow: uniq.slice(0, 4),
      overflowCount: overflow.length,
    }
  })

  if (withShots) await page.screenshot({ path: join(shotDir, `${String(i).padStart(2, '0')}.png`) })

  const issues = []
  if (r.fatal) issues.push(r.fatal)
  if (r.leak) issues.push('生タグがテキストとして表示されている')
  if (r.empty) issues.push('内容が空')
  if (r.overflow?.length) {
    issues.push(`はみ出し ${r.overflowCount} 件 → ` +
      r.overflow.map(o => `${o.tag}.${o.cls}(${o.dir}に${o.px}px)`).join(' / '))
  }
  if (issues.length) problems.push({ page: i, issues })
}

await browser.close()
stop()

if (!problems.length) {
  console.log('✓ 崩れは検出されませんでした\n')
} else {
  console.log(`要確認 ${problems.length} 件:\n`)
  for (const p of problems) console.log(`  スライド ${String(p.page).padStart(2)} : ${p.issues.join(' / ')}`)
  console.log('')
}
if (withShots) console.log(`スクリーンショット: ${shotDir.replace(root + '/', '')}/\n`)
process.exit(problems.length ? 1 : 0)

async function waitForServer(url, timeoutMs) {
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(1500) })
      if (res.ok) return
    } catch {}
    await new Promise(r => setTimeout(r, 400))
  }
  throw new Error('開発サーバーが起動しませんでした')
}
