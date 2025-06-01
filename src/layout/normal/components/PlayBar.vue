<template>
    <div class="w-full h-full p-3 flex items-center justify-between">
        <MusicInfo />
        <PlayControls />
        <div class="w-full"></div>
    </div>
</template>
<script setup lang="ts">
import MusicInfo from '@/components/MusicInfo.vue'
import PlayControls from '@/components/PlayControls.vue'
</script>
