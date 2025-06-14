<template>
    <Carousel
        class="w-full h-full [&>div]:h-full!"
        :opts="{
            align: 'start',
            loop: true
        }"
        :plugins="[
            Autoplay({
                delay: 2000
            })
        ]">
        <CarouselContent class="h-full">
            <CarouselItem
                v-for="(item, index) in list"
                :key="index"
                class="basis-1/5">
                <Card class="p-0">
                    <CardContent class="p-0">
                        <img
                            class="aspect-square w-full rounded-xl"
                            :src="item.cover"
                            alt="" />
                    </CardContent>
                </Card>
            </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
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

defineProps({
    list: {
        type: Array
    }
})
</script>
