<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useLayoutStore } from "@/stores/layout.store";

const layoutStore = useLayoutStore();
await layoutStore.fetchLayoutData();

onMounted(() => {
  window.scrollTo(0, 0);
});

</script>
