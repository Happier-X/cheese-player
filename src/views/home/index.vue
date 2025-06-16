<template>
    <div class="w-full h-full p-4 overflow-hidden">
        <div
            class="w-full h-full flex flex-col gap-4 overflow-y-scroll scrollbar-hide">
            <div class="flex flex-col gap-4">
                <div class="flex items-center justify-between">
                    <span class="text-2xl font-bold">推荐歌曲</span>
                    <Button variant="ghost">查看更多</Button>
                </div>
                <RecommendSongList :list="songList" />
            </div>
            <div class="flex flex-col gap-4">
                <div class="flex items-center justify-between">
                    <span class="text-2xl font-bold">推荐艺术家</span>
                    <Button variant="ghost">查看更多</Button>
                </div>
                <RecommendArtistList :list="songList" />
            </div>
            <div class="flex flex-col gap-4">
                <div class="flex items-center justify-between">
                    <span class="text-2xl font-bold">推荐专辑</span>
                    <Button variant="ghost">查看更多</Button>
                </div>
                <!-- <Carousel :list="songList" /> -->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import subsonicApi from '@/api/subsonic'
import { onMounted, ref } from 'vue'
import { Button } from '@/components/ui/button'
import RecommendSongList from '@/views/home/components/RecommendSongList.vue'
import RecommendArtistList from '@/views/home/components/RecommendArtistList.vue'

// 歌曲总数
const total = ref(0)
// 歌曲列表
const songList = ref<any[]>([])
/**
 * 获取歌曲列表
 */
const getSongList = async () => {
    let current = 0
    const size = 100
    let hasMoreSongs = true
    try {
        songList.value = [] // 清空现有歌曲列表
        while (hasMoreSongs) {
            const res: any = await subsonicApi.search({
                query: '',
                songCount: size,
                songOffset: current * size
            })
            if (res.searchResult2?.song && res.searchResult2.song.length > 0) {
                const songs = res.searchResult2.song
                await Promise.all(
                    songs.map(async (item: any) => {
                        item.cover = await subsonicApi.getCoverById({
                            id: item.id
                        })
                        return item
                    })
                )
                songList.value.push(...songs)
                if (res.searchResult2.song.length < size) {
                    hasMoreSongs = false
                }
            } else {
                hasMoreSongs = false
            }
            current++
        }
        total.value = songList.value.length
    } catch (error) {
        console.error('获取歌曲列表失败:', error)
    }
}
onMounted(() => {
    getSongList()
})
</script>
