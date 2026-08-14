/**
 * Markdown のデッキを「headmatter + スライド列」に分解し、章ごとのファイルに割り直す。
 * 章の境目は `layout: section-divider` のスライド。
 */

/** @typedef {{ frontmatter: string | null, body: string }} Slide */

/**
 * @param {string} source
 * @returns {{ headmatter: string, slides: Slide[] }}
 */
export function parseDeck(source) {
  const lines = source.split('\n')
  if (lines[0] !== '---') throw new Error('headmatter が見つかりません')

  let i = 1
  while (i < lines.length && lines[i] !== '---') i++
  const headmatter = lines.slice(0, i + 1).join('\n')
  i++

  const slides = []
  let frontmatter = null
  let body = []
  const flush = () => slides.push({ frontmatter, body: body.join('\n').replace(/^\n+|\n+$/g, '') })

  while (i < lines.length) {
    if (lines[i] === '---') {
      flush()
      frontmatter = null
      body = []
      i++
      if (i < lines.length && /^[a-zA-Z_]+:/.test(lines[i])) {
        const fm = []
        while (i < lines.length && lines[i] !== '---') fm.push(lines[i++])
        i++
        frontmatter = fm.join('\n')
      }
      continue
    }
    body.push(lines[i++])
  }
  flush()
  return { headmatter, slides }
}

/** スライド列を Markdown に戻す（1 枚目の frontmatter も保持する） */
export function stringifySlides(slides) {
  return slides
    .map((s, n) => {
      const fm = s.frontmatter ? `---\n${s.frontmatter}\n---\n\n` : n === 0 ? '' : '---\n\n'
      return (n === 0 ? fm : `\n${fm}`) + s.body
    })
    .join('\n')
    .replace(/\n+$/, '') + '\n'
}

const isDivider = s => s.frontmatter?.includes('layout: section-divider') ?? false

/** スライドの本文から見出しを取り出す */
function headingOf(slide) {
  const m = slide.body.split('\n').find(l => l.startsWith('# '))
  return m ? m.slice(2).trim() : ''
}

/** ファイル名に使えない文字を落とす */
function slugify(title, fallback) {
  const s = title
    .replace(/[\\/:*?"<>|]/g, '')
    .replace(/\s+/g, '-')
    .trim()
  return s || fallback
}

/**
 * 章ごとに分割する。
 * @returns {{ opening: Slide[], chapters: { file: string, title: string, slides: Slide[] }[] }}
 */
export function splitIntoChapters(slides) {
  const first = slides.findIndex(isDivider)
  if (first === -1) return { opening: slides, chapters: [] }

  const opening = slides.slice(0, first)
  const chapters = []
  let current = null
  for (const slide of slides.slice(first)) {
    if (isDivider(slide)) {
      const title = headingOf(slide)
      const no = String(chapters.length + 1).padStart(2, '0')
      current = { file: `${no}-${slugify(title, `chapter${no}`)}.md`, title, slides: [] }
      chapters.push(current)
    }
    current.slides.push(slide)
  }
  return { opening, chapters }
}

/** 目次だけを持つ slides.md を組み立てる */
export function buildIndex(headmatter, opening, chapters) {
  let out = `${headmatter}\n\n${stringifySlides(opening)}`
  for (const c of chapters) out += `\n---\nsrc: ./pages/${c.file}\n---\n`
  return out
}
