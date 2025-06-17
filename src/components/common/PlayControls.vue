<template>
    <NFlex align="center" justify="center">
        <NButton
            quaternary
            circle
            :focusable="false"
            @click="playerStore.playPrevious">
            <PreviousIcon :size="18" />
        </NButton>
        <NButton
            tertiary
            circle
            :focusable="false"
            class="scale-110"
            @click="
                playerStore.isPlaying
                    ? playerStore.pause()
                    : playerStore.resume()
            ">
            <component
                :is="playerStore.isPlaying ? PauseIcon : PlayIcon"
                :size="20" />
        </NButton>
        <NButton
            quaternary
            circle
            :focusable="false"
            @click="playerStore.playNext">
            <NextIcon :size="18" />
        </NButton>
    </NFlex>
</template>
<script setup lang="ts">
import {
    Play as PlayIcon,
    SkipBack as PreviousIcon,
    SkipForward as NextIcon,
    Pause as PauseIcon
} from 'lucide-vue-next'
import { usePlayerStore } from '@/stores/player'
import { NFlex } from 'naive-ui'
const playerStore = usePlayerStore()
</script>
