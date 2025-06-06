<template>
    <Card class="w-full h-full p-0">
        <CardContent class="w-full h-full p-0">
            <Carousel class="w-full h-full [&>div]:h-full!">
                <CarouselContent class="w-full h-full -ml-0">
                    <CarouselItem class="w-full h-full pl-0 rounded-lg">
                        <img
                            src="https://img.daisyui.com/images/profile/demo/1@94.webp"
                            class="h-full rounded-lg"
                            alt="" />
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
</script>
