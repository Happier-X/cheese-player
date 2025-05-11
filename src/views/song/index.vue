<template>
  <div class="w-full h-full flex flex-col">
    <div>
      <TopSwiper :list="songList"></TopSwiper>
    </div>
    <div class="flex-1 overflow-auto">
      <CheeseList :list="songList"></CheeseList>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import subsonicApi from "../../api/subsonic";
import CheeseList from "../../components/CheeseList.vue";
import TopSwiper from "./components/TopSwiper.vue";

// 歌曲总数
const total = ref(0);
// 歌曲列表
const songList = ref<any[]>([]);
/**
 * 获取歌曲列表
 */
const getSongList = async () => {
  let current = 0;
  const size = 100;
  let hasMoreSongs = true;
  try {
    while (hasMoreSongs) {
      const res: any = await subsonicApi.search({
        query: "",
        songCount: size,
        songOffset: current * size,
      });
      if (res.searchResult2?.song && res.searchResult2.song.length > 0) {
        res.searchResult2.song.forEach(async (item: any) => {
          item.coverImg = await subsonicApi.getCoverById({ id: item.id });
        });
        songList.value.push(...res.searchResult2.song);
        if (res.searchResult2.song.length < size) {
          hasMoreSongs = false;
        }
      } else {
        hasMoreSongs = false;
      }
      current++;
    }
    total.value = songList.value.length;
  } catch (error) {
    console.error("获取歌曲列表失败:", error);
  }
};
onMounted(() => {
  getSongList();
});
</script>
