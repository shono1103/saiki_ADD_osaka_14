import { defineConfig } from 'unocss'

/**
 * Slidev 内蔵の UnoCSS 設定にマージされる。
 * 50 型のテンプレートで繰り返し使う組み合わせを shortcuts にまとめてある。
 */
export default defineConfig({
  shortcuts: {
    // 結論・要点を置く帯
    'callout-box': 'px-4 py-3 rounded-lg border-l-4 border-brand bg-brand/8 dark:bg-brand/15',
    // 補足・注釈のボックス
    'note-box': 'px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800',
    // 枠線のカード
    'card-box': 'rounded-lg border border-gray-300 dark:border-gray-700 p-4',
    // 中央寄せのフレックスコンテナ
    'center-box': 'flex items-center justify-center',
    // 細罫（見出し下・区切り）
    'hair': 'border-t border-gray-300 dark:border-gray-700',
    // 通し番号のバッジ
    'num-badge': 'shrink-0 center-box rounded-full bg-brand text-white font-bold',
  },
  theme: {
    colors: {
      brand: {
        DEFAULT: '#3aa675',
        dark: '#1f6f52',
        soft: '#e6f2ec',
      },
    },
  },
})
