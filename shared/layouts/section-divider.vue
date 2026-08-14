<script setup lang="ts">
/**
 * 章の区切り用レイアウト。
 *
 * 使い方:
 *   layout: section-divider
 *   number: "01"
 */
defineProps<{ number?: string | number }>()
</script>

<template>
  <div class="slidev-layout section-divider">
    <div class="section-divider-inner">
      <div v-if="number" class="section-divider-number">
        {{ number }}
      </div>
      <div class="section-divider-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.section-divider {
  display: flex;
  align-items: center;
  height: 100%;
  background: linear-gradient(120deg, var(--slidev-theme-primary, #3aa675) 0%, #1f6f52 100%);
  color: #fff;
}

.section-divider-inner {
  display: flex;
  align-items: baseline;
  gap: 1.5rem;
}

.section-divider-number {
  font-size: 5rem;
  font-weight: 700;
  line-height: 1;
  opacity: 0.35;
  font-variant-numeric: tabular-nums;
}

.section-divider-body :deep(h1) {
  color: #fff;
  margin-bottom: 0.25rem;
}

.section-divider-body :deep(p) {
  color: rgba(255, 255, 255, 0.8);
}
</style>
