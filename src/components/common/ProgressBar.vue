<template>
    <NSlider
        :value="playerStore.currentTime"
        :step="0.001"
        :min="0"
        :max="playerStore.duration"
        :format-tooltip="formatTooltip"
        :on-update:value="handleValueUpdate" />
</template>
<script setup lang="ts">
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()
const handleValueUpdate = (value: number) => {
    if (value) {
        playerStore.seek(value)
    }
}
const formatTooltip = (value: number) => {
    const minutes = Math.floor(value / 60)
    const seconds = Math.floor(value % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds} / ${Math.floor(playerStore.duration / 60)}:${
        Math.floor(playerStore.duration % 60) < 10 ? '0' : ''
    }${Math.floor(playerStore.duration % 60)}`
}
</script>
