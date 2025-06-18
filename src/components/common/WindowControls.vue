<template>
    <NButton text :focusable="false" @click="handleMinimize">
        <MinimizeIcon :size="16" />
    </NButton>
    <NButton
        text
        :focusable="false"
        class="scale-x-[-1]"
        @click="handleToggleScreenSize">
        <component :is="isMaximized ? RestoreIcon : MaximizeIcon" :size="16" />
    </NButton>
    <NButton class="mr-3" text :focusable="false" @click="handleClose">
        <CloseIcon :size="16" />
    </NButton>
</template>
<script setup lang="ts">
import {
    Minus as MinimizeIcon,
    Square as MaximizeIcon,
    Copy as RestoreIcon,
    X as CloseIcon
} from 'lucide-vue-next'
import { useWindowControl } from '@/composables/useWindowControl'

const { isMaximized, handleMinimize, handleToggleScreenSize, handleClose } =
    useWindowControl()
</script>
