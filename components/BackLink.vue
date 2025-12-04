<template>
  <div class="mt-4 mb-2">
    <hr class="mb-2">
    ←
    <NuxtLink :to="backlink" :class="LINK">
      {{ label }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  backlink: string
  label: string
}>()
</script>
