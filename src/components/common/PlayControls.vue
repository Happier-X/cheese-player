<template>
    <div class="flex items-center justify-center gap-3">
        <Button variant="ghost" size="icon" @click="playerStore.playPrevious">
            <PreviousIcon />
        </Button>
        <Button
            variant="outline"
            size="icon"
            class="scale-110"
            @click="
                playerStore.isPlaying
                    ? playerStore.pause()
                    : playerStore.resume()
            ">
            <component :is="playerStore.isPlaying ? PauseIcon : PlayIcon" />
        </Button>
        <Button variant="ghost" size="icon" @click="playerStore.playNext">
            <NextIcon />
        </Button>
    </div>
</template>
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
    Play as PlayIcon,
    SkipBack as PreviousIcon,
    SkipForward as NextIcon,
    Pause as PauseIcon
} from 'lucide-vue-next'
import { usePlayerStore } from '@/stores/player'
const playerStore = usePlayerStore()
</script>
