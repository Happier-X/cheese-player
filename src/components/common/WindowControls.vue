<template>
    <div class="flex items-center">
        <Button variant="ghost" @click="handleMinimize">
            <MinimizeIcon />
        </Button>
        <Button
            class="scale-x-[-1]"
            variant="ghost"
            @click="handleToggleScreenSize">
            <component :is="isMaximized ? RestoreIcon : MaximizeIcon" />
        </Button>
        <Button variant="ghost" @click="handleClose">
            <CloseIcon />
        </Button>
    </div>
</template>
<script setup lang="ts">
import { Button } from '@/components/ui/button'
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
