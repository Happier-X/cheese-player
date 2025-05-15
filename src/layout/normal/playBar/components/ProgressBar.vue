<template>
  <div class="w-full h-[15px] py-[6px] cursor-pointer">
    <div class="w-full h-[3px] bg-gray-300 relative">
      <div class="w-0 h-full relative" :style="{ width: playerStore.progress + '%' }">
        <div class="h-full w-full bg-black"></div>
        <div
          class="w-[12px] h-[12px] rounded-box shadow bg-black absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2"
        ></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { usePlayerStore } from '../../../../stores/player';

const playerStore = usePlayerStore();
</script>