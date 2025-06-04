<template>
    <div class="w-full h-full flex items-center gap-2">
        <img
            class="h-full aspect-square rounded-lg"
            :src="
                currentSongInfo?.cover ??
                'https://img.daisyui.com/images/profile/demo/1@94.webp'
            "
            alt="封面" />
        <div>
            <div>{{ currentSongInfo?.title ?? '未知歌曲' }}</div>
            <div>
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
    }
})
</script>
