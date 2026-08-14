<script setup lang="ts">
/**
 * 全スライドの最前面（下層）に描画されるコンポーネント。
 * ここではフッターとしてページ番号を表示する。
 * 上層に出したい場合は global-top.vue を作成する。
 */
</script>

<template>
  <footer
    v-if="$slidev.nav.currentPage > 1"
    class="deck-footer"
  >
    <span class="deck-footer-title">{{ $slidev.configs.title }}</span>
    <span class="deck-footer-page">
      {{ $slidev.nav.currentPage }} / {{ $slidev.nav.total }}
    </span>
  </footer>
</template>

<style scoped>
.deck-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1.25rem;
  font-size: 0.7rem;
  opacity: 0.45;
  pointer-events: none;
}

.deck-footer-page {
  font-variant-numeric: tabular-nums;
}
</style>
