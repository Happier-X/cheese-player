<template>
    <n-flex align="center" :vertical="column" class="w-full h-full">
        <img
            class="aspect-square rounded-xl shadow-md object-cover"
            :class="{
                'h-full': !column,
                'w-3/5 mx-auto': column
            }"
            :src="
                currentSongInfo?.cover ??
                'https://img.daisyui.com/images/profile/demo/1@94.webp'
            "
            alt="封面"
            @click="handleClickCover" />
        <n-flex vertical :size="0" :class="{ 'text-center w-full': column }">
            <n-text strong class="font-size-4 line-clamp-1">
                {{ currentSongInfo?.title ?? '未知歌曲' }}
            </n-text>
            <n-text :depth="3" class="line-clamp-1">
                {{ currentSongInfo?.artist ?? '未知艺术家' }} -
                {{ currentSongInfo?.album ?? '未知专辑' }}
            </n-text>
        </n-flex>
    </n-flex>
</template>
<script setup lang="ts">
import { NFlex, NText } from 'naive-ui'
defineProps({
    currentSongInfo: {
        type: Object
    },
    column: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['clickCover'])
const handleClickCover = () => {
    emit('clickCover')
}
</script>
