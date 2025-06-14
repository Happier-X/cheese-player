<template>
    <div class="w-full h-full p-4">
        <div class="w-full h-full">
            <div class="w-full">
                <Carousel :list="songList.slice(0, 10)" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import subsonicApi from '@/api/subsonic'
// import { usePlayerStore } from '@/stores/player'
import Carousel from '@/views/home/components/Carousel.vue'

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
// 播放器状态管理
// const playerStore = usePlayerStore()
/**
 * 播放歌曲
 */
// async function handlePlay(item: any) {
//     await playerStore.loadSong(item)
//     playerStore.setPlayQueue(songList.value)
//     playerStore.play()
// }
</script>
