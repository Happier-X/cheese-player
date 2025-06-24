<template>
    <n-grid x-gap="20" y-gap="20" :cols="5" collapsed :collapsed-rows="2">
        <n-gi v-for="(item, index) in list" :key="index">
            <n-flex vertical>
                <img
                    class="aspect-square rounded-xl shadow-md object-cover"
                    :src="item.cover"
                    :alt="item.title"
                    @click="handlePlay(item)" />
                <n-flex vertical :size="0">
                    <n-text strong class="font-size-4 line-clamp-1">
                        {{ item?.title ?? '未知歌曲' }}
                    </n-text>
                    <n-text :depth="3" class="line-clamp-1">
                        {{ item?.artist ?? '未知艺术家' }}
                    </n-text>
                </n-flex>
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
