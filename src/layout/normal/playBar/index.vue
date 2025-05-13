<template>
  <div
    class="w-full h-full p-3 flex items-center justify-between gap-3 relative"
  >
    <div class="w-full absolute top-[-1px] left-0">
      <ProgressBar />
    </div>
    <div class="w-full h-full">
      <MusicInfo
        :cover-img="playerStore.currentSongInfo?.coverImg"
        :title="playerStore.currentSongInfo?.title"
        :artist="playerStore.currentSongInfo?.artist"
        :album="playerStore.currentSongInfo?.album"
      />
    </div>
    <div class="w-full h-full">
      <PlayControl />
    </div>
    <div class="w-full h-full">
      <PlayTool />
    </div>
  </div>
</template>
<script setup lang="ts">
import ProgressBar from "./components/ProgressBar.vue";
import MusicInfo from "./components/MusicInfo.vue";
import PlayControl from "./components/PlayControl.vue";
import PlayTool from "./components/PlayTool.vue";
import { usePlayerStore } from "../../../stores/player";

// 播放器状态管理
const playerStore = usePlayerStore();
</script>
