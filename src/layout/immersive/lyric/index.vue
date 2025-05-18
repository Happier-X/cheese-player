<template>
    {{ playerStore.lyricLines[playerStore.currentLyricLine] }}
</template>
<script setup lang="ts">
import { usePlayerStore } from "../../../stores/player";
const playerStore = usePlayerStore();
</script>