<template>
    <NFlex :wrap="false" align="center" :size="0" class="h-42px">
        <NButton
            quaternary
            :focusable="false"
            class="h-42px"
            @click="handleMinimize">
            <MinimizeIcon :size="16" />
        </NButton>
        <NButton
            quaternary
            :focusable="false"
            class="scale-x-[-1] h-42px"
            @click="handleToggleScreenSize">
            <component
                :is="isMaximized ? RestoreIcon : MaximizeIcon"
                :size="16" />
        </NButton>
        <NButton
            quaternary
            :focusable="false"
            class="h-42px"
            @click="handleClose">
            <CloseIcon :size="16" />
        </NButton>
    </NFlex>
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
