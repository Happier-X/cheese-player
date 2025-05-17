<template>
  <div
    class="w-full h-full px-3 flex items-center justify-between gap-3"
  >
    <div class="w-full h-full">
      <!-- <MusicInfo
        :cover-img="playerStore.currentSongInfo?.coverImg"
        :title="playerStore.currentSongInfo?.title"
        :artist="playerStore.currentSongInfo?.artist"
        :album="playerStore.currentSongInfo?.album"
      /> -->
    </div>
    <div class="w-full h-full flex flex-col items-center justify-center py-2">
      <PlayControl />
      <ProgressBar />
    </div>
    <div class="w-full h-full">
      <PlayTool />
    </div>
  </div>
</template>
<script setup lang="ts">
// import MusicInfo from "./components/MusicInfo.vue";
import PlayControl from "./components/PlayControl.vue";
import ProgressBar from "./components/ProgressBar.vue";
import PlayTool from "./components/PlayTool.vue";
import { usePlayerStore } from "../../../stores/player";

// 播放器状态管理
const playerStore = usePlayerStore();
</script>
