<template>
    <div class="w-full h-full">
        <div data-tauri-drag-region class="flex items-center justify-between">
            <div></div>
            <div class="flex items-center">
                <Button variant="ghost" @click="layoutStore.toggleLayout()">
                    <CloseImmersiveIcon />
                </Button>
                <WindowControls />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import WindowControls from '@/components/common/WindowControls.vue'
import { Button } from '@/components/ui/button'
import { Minimize2 as CloseImmersiveIcon } from 'lucide-vue-next'
import { useLayoutStore } from '@/stores/layout'

const layoutStore = useLayoutStore()
</script>
