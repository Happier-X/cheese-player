<template>
    <div class="size-screen">
        <NLayout>
            <NLayoutHeader bordered data-tauri-drag-region>
                <NFlex align="center" justify="space-between" :wrap="false">
                    <div data-tauri-drag-region class="h-42px flex-1"></div>
                    <NButton
                        text
                        :focusable="false"
                        @click="layoutStore.toggleLayout()">
                        <CloseImmersiveIcon :size="16" />
                    </NButton>
                    <WindowControls />
                </NFlex>
            </NLayoutHeader>
            <NLayoutContent
                class="h-[calc(100vh-75px-43px)]"
                content-class="px-5 pb-5"
                :native-scrollbar="false">
                <NFlex
                    align="center"
                    justify="center"
                    class="h-full overflow-hidden">
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
                </NFlex>
            </NLayoutContent>
            <NLayoutFooter class="bg-[unset]">
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
            </NLayoutFooter>
        </NLayout>
    </div>
</template>
<script setup lang="ts">
import WindowControls from '@/components/common/WindowControls.vue'
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
