#!/usr/bin/env node
/**
 * catalog/ のデッキをブラウザで閲覧する。
 *
 *   pnpm run view              … 閲覧できるデッキの一覧を表示
 *   pnpm run view patterns     … 1 画面パターン集を開く
 *   pnpm run view tech-talk    … 技術解説デッキの構成例を開く
 */
import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { catalogDir, listCatalog, printCatalog, root } from './catalog.mjs'

const entries = listCatalog()
const name = process.argv.slice(2).find(arg => !arg.startsWith('-'))

if (!name) {
  console.log('\n閲覧できるデッキ:')
  printCatalog(entries, '使い方: pnpm run view <名前>')
  process.exit(0)
}

const target = join(catalogDir, `${name}.md`)
if (!existsSync(target)) {
  console.error(`\n"${name}" は catalog/ にありません。`)
  printCatalog(entries, '使い方: pnpm run view <名前>')
  process.exit(1)
}

const slidev = join(root, 'node_modules', '.bin', 'slidev')
const child = spawn(slidev, [target, '--open'], { stdio: 'inherit' })
child.on('exit', code => process.exit(code ?? 0))
