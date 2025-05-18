<template>
  <div class="w-full h-full flex items-center justify-center">
    <div class="w-3/5 h-3/5 flex flex-col items-center justify-center gap-5">
      <img class="w-full aspect-square object-cover rounded-2xl" :src="coverImg" />
      <div class="w-full">
        <div class="text-lg font-semibold">{{ title }}</div>
        <div class="text-xs font-semibold opacity-60">
          {{ artist }} - {{ album }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
/**
 * 接收的属性
 */
defineProps({
  coverImg: {
    type: String,
    default: "https://img.daisyui.com/images/profile/demo/1@94.webp",
  },
  title: {
    type: String,
    default: "标题",
  },
  artist: {
    type: String,
    default: "艺术家",
  },
  album: {
    type: String,
    default: "专辑",
  },
});
</script>
