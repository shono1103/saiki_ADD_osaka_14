<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{ count?: number }>(), { count: 0 })

const counter = ref(props.count)
</script>

<template>
  <div class="counter inline-flex items-center gap-4 select-none">
    <button class="counter-btn" @click="counter -= 1">
      -
    </button>
    <span class="counter-value">{{ counter }}</span>
    <button class="counter-btn" @click="counter += 1">
      +
    </button>
  </div>
</template>

<style scoped>
.counter-btn {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.5rem;
  border: 1px solid var(--slidev-theme-primary, #3aa675);
  color: var(--slidev-theme-primary, #3aa675);
  line-height: 1;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.counter-btn:hover {
  background-color: var(--slidev-theme-primary, #3aa675);
  color: #fff;
}

.counter-value {
  min-width: 3rem;
  text-align: center;
  font-size: 2rem;
  font-variant-numeric: tabular-nums;
}
</style>
