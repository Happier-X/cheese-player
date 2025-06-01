<template>
    <div class="w-full h-full flex flex-col">
        <div class="w-full h-[calc(100%-75px)] flex">
            <div>
                <SideBar />
            </div>
            <div class="flex-1 flex flex-col">
                <TitleBar />
                <RouterView v-slot="{ Component }">
                    <KeepAlive>
                        <component :is="Component"></component>
                    </KeepAlive>
                </RouterView>
            </div>
        </div>
        <div class="w-full h-[75px]">
            <PlayBar />
        </div>
    </div>
</template>
<script setup lang="ts">
import PlayBar from '@/layout/normal/components/PlayBar.vue'
import SideBar from '@/layout/normal/components/SideBar.vue'
import TitleBar from '@/layout/normal/components/TitleBar.vue'
</script>
