<template>
    <NGrid x-gap="20" y-gap="20" :cols="7" collapsed :collapsed-rows="1">
        <NGi v-for="(item, index) in list" :key="index">
            <NFlex vertical align="center">
                <NAvatar
                    class="size-full shadow-md"
                    round
                    :src="item.cover"
                    @click="handlePlay(item)" />
                <NText strong class="font-size-4 line-clamp-1">
                    {{ item?.title ?? '未知艺术家' }}
                </NText>
            </NFlex>
        </NGi>
    </NGrid>
</template>
<script setup lang="ts">
import { CarouselItem } from '@/components/ui/carousel'
import { usePlayerStore } from '@/stores/player'

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
