<template>
    <div
        class="w-full h-full flex items-center gap-2"
        :class="{ 'flex-col items-center': column }">
        <img
            class="aspect-square rounded-lg shadow-sm"
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
        <div :class="{ 'text-center w-full': column }">
            <div class="font-semibold">
                {{ currentSongInfo?.title ?? '未知歌曲' }}
            </div>
            <div class="text-sm text-gray-500">
                {{ currentSongInfo?.artist ?? '未知艺术家' }} -
                {{ currentSongInfo?.album ?? '未知专辑' }}
            </div>
        </div>
    </div>
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
