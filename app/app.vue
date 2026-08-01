<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <VueQueryDevtools button-position="bottom-left" />
</template>

<script setup>
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { useLayoutStore } from "@/stores/layout.store";

const layoutStore = useLayoutStore();
await layoutStore.fetchLayoutData();

onMounted(() => {
  window.scrollTo(0, 0);
});

</script>
