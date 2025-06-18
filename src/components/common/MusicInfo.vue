<template>
    <NFlex align="center" :vertical="column" class="w-full h-full">
        <NImage
            class="aspect-square rounded-xl shadow-md"
            preview-disabled
            :class="{
                'h-full': !column,
                'w-3/5 mx-auto': column
            }"
            object-fit="cover"
            :src="
                currentSongInfo?.cover ??
                'https://img.daisyui.com/images/profile/demo/1@94.webp'
            "
            alt="封面"
            @click="handleClickCover" />
        <NFlex vertical :size="0" :class="{ 'text-center w-full': column }">
            <NText strong class="font-size-4 line-clamp-1">
                {{ currentSongInfo?.title ?? '未知歌曲' }}
            </NText>
            <NText :depth="3" class="line-clamp-1">
                {{ currentSongInfo?.artist ?? '未知艺术家' }} -
                {{ currentSongInfo?.album ?? '未知专辑' }}
            </NText>
        </NFlex>
    </NFlex>
</template>
<script setup lang="ts">
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
