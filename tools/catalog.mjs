/**
 * catalog/ の一覧取得を view-deck.mjs / new-deck.mjs で共有する。
 */
import { readFileSync, readdirSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

export const root = join(dirname(fileURLToPath(import.meta.url)), '..')
export const catalogDir = join(root, 'catalog')
export const deckEntry = join(root, 'deck', 'slides.md')

/** frontmatter の先頭コメント行を説明として取り出す */
function describe(file) {
  const lines = readFileSync(join(catalogDir, file), 'utf8').split('\n')
  const comment = lines.slice(1, 4).find(line => line.startsWith('# '))
  return comment ? comment.slice(2).trim() : ''
}

/**
 * @param {{ includePatterns?: boolean }} options
 * @returns {{ name: string, file: string, description: string }[]}
 */
export function listCatalog({ includePatterns = true } = {}) {
  return readdirSync(catalogDir)
    .filter(file => file.endsWith('.md') && file !== 'README.md')
    .filter(file => includePatterns || file !== 'patterns.md')
    .sort()
    .map(file => ({
      name: basename(file, '.md'),
      file,
      description: describe(file),
    }))
}

export function printCatalog(entries, usage) {
  const width = Math.max(...entries.map(e => e.name.length))
  console.log('')
  for (const { name, description } of entries)
    console.log(`  ${name.padEnd(width)}  ${description}`)
  console.log(`\n${usage}\n`)
}
