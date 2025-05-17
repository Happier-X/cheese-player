<template>
  <div
    data-tauri-drag-region
    class="w-full h-full px-3 flex items-center justify-between"
  >
    <NavControl></NavControl>
    <div class="flex items-center justify-center gap-2">
      <SoftwareControl></SoftwareControl>
      <WindowControl></WindowControl>
    </div>
  </div>
</template>
<script setup lang="ts">
import NavControl from "./components/NavControl.vue";
import SoftwareControl from "./components/SoftwareControl.vue";
import WindowControl from "./components/WindowControl.vue";
</script>
