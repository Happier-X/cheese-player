<template>
    <Carousel
        :opts="{
            align: 'start',
            loop: true
        }"
        :plugins="[
            Autoplay({
                delay: 2000
            })
        ]">
        <CarouselContent>
            <CarouselItem
                v-for="(item, index) in list"
                :key="index"
                class="basis-1/5">
                <img
                    class="aspect-square w-full rounded-lg shadow-sm"
                    :src="item.cover"
                    alt=""
                    @click="handlePlay(item)" />
                <div class="w-full">
                    <div class="font-semibold">
                        {{ item?.title ?? '未知歌曲' }}
                    </div>
                    <div class="text-sm text-gray-500">
                        {{ item?.artist ?? '未知艺术家' }}
                    </div>
                </div>
            </CarouselItem>
        </CarouselContent>
    </Carousel>
</template>
<script setup lang="ts">
import {
    Carousel,
    CarouselContent,
    CarouselItem
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
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
