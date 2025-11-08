<template>
  <div class="text-center">
    <header class="flex flex-row gap-4 justify-center items-center my-4">
      <NuxtLink to="/" class="cursor-pointer">
        <img
          src="/sokol-krc-logo.png"
          alt="Logo TJ Sokol Praha-Krč"
          class="h-16 w-16"
          aria-hidden
        >
      </NuxtLink>
      <NuxtLink to="/" class="cursor-pointer">
        <h1 class="text-2xl">
          Běžecký oddíl TJ Sokol Praha-Krč
        </h1>
      </NuxtLink>
      <NuxtLink to="/" class="cursor-pointer">
        <img
          src="/sokol-krc-logo.png"
          alt="Logo TJ Sokol Praha-Krč"
          class="h-16 w-16"
          aria-hidden
        >
      </NuxtLink>
    </header>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: {
    // overriding default ignis.css
    style: 'max-width: 1200px!important;',
  },
})
</script>
