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
                <Card class="p-0">
                    <CardContent class="p-0">
                        <img
                            class="aspect-square w-full rounded-xl"
                            :src="item.cover"
                            alt=""
                            @click="handlePlay(item)" />
                    </CardContent>
                </Card>
            </CarouselItem>
        </CarouselContent>
    </Carousel>
</template>
<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
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
