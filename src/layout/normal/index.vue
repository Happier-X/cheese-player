<template>
    <div class="w-full h-full flex flex-col">
        <div class="w-full flex-1 flex">
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
        <PlayBar />
    </div>
</template>
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import SideBar from '@/layout/normal/components/SideBar.vue'
import TitleBar from '@/layout/normal/components/TitleBar.vue'
import PlayBar from '@/layout/normal/components/PlayBar.vue'
</script>
