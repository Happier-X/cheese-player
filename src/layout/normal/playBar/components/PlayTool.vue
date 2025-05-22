<template>
  <div class="w-full h-full flex items-center justify-end gap-2">
    <button
      class="btn btn-sm btn-circle btn-ghost"
      @click="playerStore.setLoopMode(playerStore.loopMode === 0 ? 1 : 0)"
    >
      <component
        :is="playerStore.loopMode === 0 ? ListLoopIcon : SingleLoopIcon"
        size="18"
      ></component>
    </button>
    <button
      class="btn btn-sm btn-circle btn-ghost"
      @click="playerStore.setPlayMode(playerStore.playMode === 0 ? 1 : 0)"
    >
      <component
        :is="playerStore.playMode === 0 ? OrderPlayIcon : ShufflePlayIcon"
        size="18"
      ></component>
    </button>
    <label for="my-drawer" class="btn btn-sm btn-circle btn-ghost">
      <PlayQueueIcon size="20" @click="handleShowPlayQueue"></PlayQueueIcon>
    </label>
  </div>

  <!-- <div class="drawer drawer-end">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-side">
      <label
        for="my-drawer"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <div class="bg-base-200 h-70 w-80 p-4">
        <SongList :list="playerStore.playQueue"></SongList>
      </div>
    </div>
  </div> -->
</template>
<script setup lang="ts">
import {
  RiRepeatOneFill as SingleLoopIcon,
  RiRepeat2Fill as ListLoopIcon,
  RiOrderPlayFill as OrderPlayIcon,
  RiShuffleFill as ShufflePlayIcon,
  RiPlayListFill as PlayQueueIcon,
} from "@remixicon/vue";
import { usePlayerStore } from "../../../../stores/player";
// import SongList from '@renderer/components/SongList.vue'

const playerStore = usePlayerStore();

const handleShowPlayQueue = () => {
  // console.log(playerStore.playQueue)
};
</script>
