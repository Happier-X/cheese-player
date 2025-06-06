<template>
    <Card class="w-full h-full p-0">
        <CardContent class="w-full h-full p-0">
            <Carousel
                class="w-full h-full [&>div]:h-full!"
                :opts="{
                    loop: true
                }"
                :plugins="[
                    Autoplay({
                        delay: 2000
                    }),
                    Fade()
                ]">
                <CarouselContent class="w-full h-full -ml-0">
                    <CarouselItem
                        class="w-full h-full pl-0 rounded-lg"
                        v-for="(item, index) in list"
                        :key="index">
                        <Banner :img="item.cover" />
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
        </CardContent>
    </Card>
</template>
<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import {
    Carousel,
    CarouselContent,
    CarouselItem
} from '@/components/ui/carousel'
import Banner from '@/views/home/components/Banner.vue'
import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'

defineProps({
    list: {
        type: Array
    }
})
</script>
