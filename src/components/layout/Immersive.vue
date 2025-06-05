<template>
    <div class="w-full h-full flex flex-col overflow-hidden">
        <div data-tauri-drag-region class="flex items-center justify-between">
            <div></div>
            <div class="flex items-center">
                <Button variant="ghost" @click="layoutStore.toggleLayout()">
                    <CloseImmersiveIcon />
                </Button>
                <WindowControls />
            </div>
        </div>
        <div class="flex-1 flex items-center justify-center overflow-hidden">
            <div class="w-9/20 h-full flex items-center justify-center">
                <div class="w-full">
                    <MusicInfo
                        :currentSongInfo="playerStore.currentSongInfo"
                        column />
                </div>
            </div>
            <div class="w-9/20 h-full">
                <Lyric />
            </div>
        </div>
        <div
            class="w-full h-[75px] p-3 flex items-center justify-between relative z-99">
            <ProgressBar class="absolute -top-0.75 left-0" />
            <div class="w-full"></div>
            <PlayControls />
            <QueueControls />
        </div>
    </div>
</template>
<script setup lang="ts">
import WindowControls from '@/components/common/WindowControls.vue'
import { Button } from '@/components/ui/button'
import { Minimize2 as CloseImmersiveIcon } from 'lucide-vue-next'
import { useLayoutStore } from '@/stores/layout'
import MusicInfo from '@/components/common/MusicInfo.vue'
import { usePlayerStore } from '@/stores/player'
import Lyric from '@/components/common/Lyric.vue'
import ProgressBar from '@/components/common/ProgressBar.vue'
import PlayControls from '@/components/common/PlayControls.vue'
import QueueControls from '@/components/common/QueueControls.vue'

const layoutStore = useLayoutStore()
const playerStore = usePlayerStore()
</script>
