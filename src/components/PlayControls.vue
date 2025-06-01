<template>
    <div class="flex items-center gap-2">
        <Button variant="ghost" size="icon">
            <PreviousIcon />
        </Button>
        <Button variant="outline" size="icon">
            <component :is="PlayIcon" />
        </Button>
        <Button variant="ghost" size="icon">
            <NextIcon />
        </Button>
    </div>
</template>
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
    Play as PlayIcon,
    SkipBack as PreviousIcon,
    SkipForward as NextIcon,
    Pause as PauseIcon
} from 'lucide-vue-next'
</script>
