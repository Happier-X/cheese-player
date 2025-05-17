<template>
  <div
    data-tauri-drag-region
    class="w-full h-full px-3 flex items-center justify-between"
  >
    <LayoutControl></LayoutControl>
    <WindowControl></WindowControl>
  </div>
</template>
<script setup lang="ts">
import LayoutControl from "./components/LayoutControl.vue";
import WindowControl from "./components/WindowControl.vue";
</script>
