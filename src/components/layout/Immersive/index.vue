<template>
    <n-flex
        vertical
        :size="0"
        class="size-screen fixed top-0 left-0 bg-white z-99">
        <div class="w-full h-10">
            <TitleBar />
        </div>
        <n-flex align="center" justify="center" class="flex-1 overflow-hidden">
            <n-flex align="center" justify="center" class="w-9/20 h-full">
                <div class="w-full">
                    <MusicInfo
                        :currentSongInfo="playerStore.currentSongInfo"
                        column />
                </div>
            </n-flex>
            <div class="w-9/20 h-full">
                <Lyric />
            </div>
        </n-flex>
        <div class="w-full h-18">
            <PlayerBar />
        </div>
    </n-flex>
</template>
<script setup lang="ts">
import Lyric from '@/components/common/Lyric.vue'
import MusicInfo from '@/components/common/MusicInfo.vue'
import PlayerBar from './PlayerBar.vue'
import TitleBar from './TitleBar.vue'
import { usePlayerStore } from '@/stores/player'
import { NFlex } from 'naive-ui'

const playerStore = usePlayerStore()
</script>
