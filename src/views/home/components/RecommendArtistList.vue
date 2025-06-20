<template>
    <NGrid x-gap="20" y-gap="20" :cols="7" collapsed :collapsed-rows="1">
        <NGi v-for="(item, index) in list" :key="index">
            <NFlex vertical align="center">
                <NAvatar
                    class="size-full shadow-md"
                    round
                    :src="item.artistImageUrl"
                    @click="handlePlay(item)" />
                <NText strong class="font-size-4 line-clamp-1">
                    {{ item?.name ?? '未知艺术家' }}
                </NText>
            </NFlex>
        </NGi>
    </NGrid>
</template>
<script setup lang="ts">
import { usePlayerStore } from '@/stores/player'
import { NGrid, NGi, NFlex, NAvatar, NText } from 'naive-ui'

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
