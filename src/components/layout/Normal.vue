<template>
    <div class="w-full h-full flex flex-col">
        <div class="w-full h-[calc(100%-75px)] flex">
            <div>
                <SideBar />
            </div>
            <div class="flex-1 flex flex-col">
                <div
                    data-tauri-drag-region
                    class="flex items-center justify-between border-b-1">
                    <div></div>
                    <WindowControls />
                </div>
                <RouterView v-slot="{ Component }">
                    <KeepAlive>
                        <component :is="Component"></component>
                    </KeepAlive>
                </RouterView>
            </div>
        </div>
        <div class="w-full h-[75px] p-3 flex items-center justify-between">
            <MusicInfo />
            <PlayControls />
            <div class="w-full"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import SideBar from '@/components/layout/SideBar.vue'
import WindowControls from '@/components/common/WindowControls.vue'
import MusicInfo from '@/components/common/MusicInfo.vue'
import PlayControls from '@/components/common/PlayControls.vue'
</script>
