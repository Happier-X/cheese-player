<template>
  <div class="w-full h-full flex items-center justify-center gap-20">
    <div
      v-for="(item, index) in menuList"
      :key="index"
      class="rounded-box p-1 text-gray-300 hover:text-neutral text-nowrap font-bold text-lg"
    >
      <RouterLink
        :to="item.path"
        :class="{ 'text-neutral': activeMenuKey === item.key }"
      >
        {{ item.name }}
      </RouterLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

// 当前选中的菜单
const activeMenuKey = ref("song");
// 菜单列表
const menuList = ref([
  {
    name: "歌曲",
    key: "song",
    path: "/song",
  },
  {
    name: "专辑",
    key: "album",
    path: "/album",
  },
  {
    name: "歌手",
    key: "artist",
    path: "/artist",
  },
  {
    name: "歌单",
    key: "songList",
    path: "/songList",
  },
]);
// 路由实例
const route = useRoute();
// 监听路由变化
watch(
  () => route.path,
  (newPath) => {
    activeMenuKey.value =
      menuList.value.find((item) => item.path === newPath)?.key || "";
  }
);
</script>
