<template>
  <Layout></Layout>
</template>
<script setup lang="ts">
import Layout from "./layout/index.vue";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { usePlayerStore } from "./stores/player";

const playerStore = usePlayerStore();
const appWindow = getCurrentWindow();
appWindow.onCloseRequested(() => {
  playerStore.saveCurrentPlayInfo();
});
</script>
