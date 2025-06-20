<template>
    <NFlex vertical :size="0" class="size-screen">
        <NFlex
            data-tauri-drag-region
            items="center"
            justify="space-between"
            class="h-42px pl-3">
            <NButton
                text
                :focusable="false"
                @click="layoutStore.toggleLayout()">
                <CloseImmersiveIcon :size="20" />
            </NButton>
            <WindowControls />
        </NFlex>
        <NFlex align="center" justify="center" class="flex-1 overflow-hidden">
            <NFlex align="center" justify="center" class="w-9/20 h-full">
                <div class="w-full">
                    <MusicInfo
                        :currentSongInfo="playerStore.currentSongInfo"
                        column />
                </div>
            </NFlex>
            <div class="w-9/20 h-full">
                <Lyric />
            </div>
        </NFlex>
        <NFlex
            align="center"
            justify="space-between"
            :wrap="false"
            class="h-[75px] p-3 relative">
            <ProgressBar class="absolute -top-9px left-0" />
            <div class="w-full"></div>
            <PlayControls class="w-full" />
            <QueueControls class="w-full" />
        </NFlex>
    </NFlex>
</template>
<script setup lang="ts">
import WindowControls from '@/components/common/WindowControls.vue'
import { ChevronDown as CloseImmersiveIcon } from 'lucide-vue-next'
import { useLayoutStore } from '@/stores/layout'
import MusicInfo from '@/components/common/MusicInfo.vue'
import { usePlayerStore } from '@/stores/player'
import Lyric from '@/components/common/Lyric.vue'
import ProgressBar from '@/components/common/ProgressBar.vue'
import PlayControls from '@/components/common/PlayControls.vue'
import QueueControls from '@/components/common/QueueControls.vue'
import { NFlex, NButton } from 'naive-ui'

const layoutStore = useLayoutStore()
const playerStore = usePlayerStore()
</script>
