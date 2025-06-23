<template>
    <NGrid x-gap="20" y-gap="20" :cols="5" collapsed :collapsed-rows="2">
        <NGi v-for="(item, index) in list" :key="index">
            <NFlex vertical>
                <NImage
                    class="aspect-square rounded-xl shadow-md"
                    preview-disabled
                    object-fit="cover"
                    :src="item.cover"
                    :alt="item.title"
                    @click="handlePlay(item)" />
                <NFlex vertical :size="0">
                    <NText strong class="font-size-4 line-clamp-1">
                        {{ item?.title ?? '未知歌曲' }}
                    </NText>
                    <NText :depth="3" class="line-clamp-1">
                        {{ item?.artist ?? '未知艺术家' }}
                    </NText>
                </NFlex>
            </NFlex>
        </NGi>
    </NGrid>
</template>
<script setup lang="ts">
import { usePlayerStore } from '@/stores/player'
import { NGrid, NGi, NFlex, NImage, NText } from 'naive-ui'

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
