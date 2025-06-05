<template>
    <div class="flex items-center gap-3">
        <Button
            variant="ghost"
            size="icon"
            @click="
                playerStore.setLoopMode(playerStore.loopMode === 0 ? 1 : 0)
            ">
            <component
                :is="
                    playerStore.loopMode === 0 ? ListLoopIcon : SingleLoopIcon
                " />
        </Button>
        <Button
            variant="ghost"
            size="icon"
            @click="
                playerStore.setPlayMode(playerStore.playMode === 0 ? 1 : 0)
            ">
            <component
                :is="
                    playerStore.playMode === 0 ? OrderPlayIcon : ShufflePlayIcon
                " />
        </Button>
    </div>
</template>
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
    Repeat as ListLoopIcon,
    Repeat1 as SingleLoopIcon,
    ListOrdered as OrderPlayIcon,
    Shuffle as ShufflePlayIcon
} from 'lucide-vue-next'
import { usePlayerStore } from '@/stores/player'
const playerStore = usePlayerStore()
</script>
