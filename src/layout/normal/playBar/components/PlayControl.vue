<template>
  <div class="w-full h-full flex items-center justify-center gap-3">
    <button
      class="btn btn-sm btn-circle btn-ghost"
      @click="playerStore.playPrevious"
    >
      <PreviousIcon size="20"></PreviousIcon>
    </button>
    <button
      class="btn btn-circle"
      @click="
        playerStore.isPlaying ? playerStore.pause() : playerStore.resume()
      "
    >
      <component :is="playerStore.isPlaying ? PauseIcon : PlayIcon"></component>
    </button>
    <button
      class="btn btn-sm btn-circle btn-ghost"
      @click="playerStore.playNext"
    >
      <NextIcon size="20"></NextIcon>
    </button>
  </div>
</template>
<script setup lang="ts">
import {
  RiPlayFill as PlayIcon,
  RiPauseFill as PauseIcon,
  RiSkipBackFill as PreviousIcon,
  RiSkipForwardFill as NextIcon,
} from "@remixicon/vue";
import { usePlayerStore } from "../../../../stores/player";
// 播放器状态管理
const playerStore = usePlayerStore();
</script>
