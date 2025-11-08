<template>
  <div class="flex flex-col gap-2">
    <p>Od roku 2019 pořádáme běžecké závody pro veřejnost v okolí Krčské Sokolovny.</p>
    <p>Na této stránce najdete historii a výsledky všech závodů.</p>

    <NuxtLink to="/races" :class="LINK">
      Seznam všech závodů
    </NuxtLink>
    <NuxtLink to="/runners" :class="LINK">
      Seznam všech účastíků
    </NuxtLink>
  </div>
</template>
