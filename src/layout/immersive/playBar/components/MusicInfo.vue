<template>
  <div class="w-full h-full flex items-center gap-3">
    <div class="h-full">
      <img
        class="h-full aspect-square object-cover rounded-box"
        :src="coverImg"
        @click="changeLayout"
      />
    </div>
    <div>
      <div>{{ title }}</div>
      <div class="text-xs font-semibold opacity-60">
        {{ artist }} - {{ album }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useLayoutStore } from "../../../../stores/layout";
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
const layoutStore = useLayoutStore();
const changeLayout = () => {
  layoutStore.changeLayout();
};
</script>
