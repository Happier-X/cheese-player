<template>
    <n-flex
        align="center"
        justify="space-between"
        class="size-full px-3"
        data-tauri-drag-region>
        <n-flex align="center">
            <n-button
                text
                :focusable="false"
                @click="layoutStore.toggleLayout()">
                <CloseImmersiveIcon class="size-5" />
            </n-button>
        </n-flex>
        <n-flex align="center">
            <n-button text :focusable="false" @click="handleMinimize">
                <MinimizeIcon class="size-5" />
            </n-button>
            <n-button
                text
                :focusable="false"
                class="scale-x-[-1]"
                @click="handleToggleScreenSize">
                <component
                    :is="isMaximized ? RestoreIcon : MaximizeIcon"
                    class="size-5" />
            </n-button>
            <n-button text :focusable="false" @click="handleClose">
                <CloseIcon class="size-5" />
            </n-button>
        </n-flex>
    </n-flex>
</template>
<script setup lang="ts">
import { useWindowControl } from '@/composables/useWindowControl'
import {
    X as CloseIcon,
    ChevronDown as CloseImmersiveIcon,
    Square as MaximizeIcon,
    Minus as MinimizeIcon,
    Copy as RestoreIcon
} from 'lucide-vue-next'
import { NButton, NFlex } from 'naive-ui'
import { useRouter } from 'vue-router'
import { useLayoutStore } from '@/stores/layout'

const { isMaximized, handleMinimize, handleToggleScreenSize, handleClose } =
    useWindowControl()
const router = useRouter()
const handleBack = () => {
    router.back()
}
const handleForward = () => {
    router.forward()
}
const layoutStore = useLayoutStore()
</script>
