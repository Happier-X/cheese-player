<template>
    <n-flex
        align="center"
        justify="space-between"
        class="h-full px-3"
        data-tauri-drag-region>
        <n-flex align="center">
            <n-button
                text
                :focusable="false"
                class="font-size-5"
                @click="handleBack">
                <n-icon :component="BackIcon" />
            </n-button>
            <n-button
                text
                :focusable="false"
                class="font-size-5"
                @click="handleForward">
                <n-icon :component="ForwardIcon" />
            </n-button>
        </n-flex>
        <n-flex align="center">
            <n-button
                text
                :focusable="false"
                class="font-size-5"
                @click="handleOpenSettings">
                <n-icon :component="SettingsIcon" />
            </n-button>
            <n-button
                text
                :focusable="false"
                class="font-size-5"
                @click="handleMinimize">
                <n-icon :component="MinimizeIcon" />
            </n-button>
            <n-button
                text
                :focusable="false"
                class="scale-x-[-1] font-size-5"
                @click="handleToggleScreenSize">
                <n-icon :component="isMaximized ? RestoreIcon : MaximizeIcon" />
            </n-button>
            <n-button
                text
                :focusable="false"
                class="font-size-5"
                @click="handleClose">
                <n-icon :component="CloseIcon" />
            </n-button>
        </n-flex>
    </n-flex>
</template>
<script setup lang="ts">
import { useWindowControl } from '@/composables/useWindowControl'
import {
    ChevronLeft as BackIcon,
    ChevronRight as ForwardIcon,
    X as CloseIcon,
    Square as MaximizeIcon,
    Minus as MinimizeIcon,
    Copy as RestoreIcon,
    Settings as SettingsIcon
} from 'lucide-vue-next'
import { NButton, NIcon, NFlex } from 'naive-ui'
import { useRouter } from 'vue-router'

const { isMaximized, handleMinimize, handleToggleScreenSize, handleClose } =
    useWindowControl()
const router = useRouter()
const handleBack = () => {
    router.back()
}
const handleForward = () => {
    router.forward()
}
const handleOpenSettings = () => {
    router.push('/settings')
}
</script>
