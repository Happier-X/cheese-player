<template>
    <Card class="w-full h-full">
        <CardContent>
            <Carousel class="w-full h-full [&>div]:h-full!">
                <CarouselContent class="w-full h-full -ml-0">
                    <CarouselItem class="pl-0">Card Content</CarouselItem>
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
