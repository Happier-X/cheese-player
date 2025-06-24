<template>
    <n-grid x-gap="20" y-gap="20" :cols="5" collapsed :collapsed-rows="1">
        <n-gi v-for="(item, index) in list" :key="index">
            <n-flex vertical align="center">
                <img
                    class="aspect-square rounded-full shadow-md object-cover"
                    :src="item.artistImageUrl"
                    @click="handlePlay(item)" />
                <n-text strong class="font-size-4 line-clamp-1">
                    {{ item?.name ?? '未知艺术家' }}
                </n-text>
            </n-flex>
        </n-gi>
    </n-grid>
</template>
<script setup lang="ts">
import { usePlayerStore } from '@/stores/player'
import { NGrid, NGi, NFlex, NText } from 'naive-ui'

interface CarouselItem {
    cover: string
    [key: string]: any
}

const props = defineProps({
    list: {
        type: Array as () => CarouselItem[],
        required: true
    }
})
// 播放器状态管理
const playerStore = usePlayerStore()
/**
 * 播放歌曲
 */
async function handlePlay(item: any) {
    await playerStore.loadSong(item)
    playerStore.setPlayQueue(props.list)
    playerStore.play()
}
</script>
