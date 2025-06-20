<template>
    <NSlider
        :value="sliderValue"
        :step="0.001"
        :min="0"
        :max="playerStore.duration"
        :format-tooltip="formatTooltip"
        :on-update:value="handleValueUpdate"
        :on-dragstart="handleDragStart"
        :on-dragend="handleDragEnd"
        :disabled="playerStore.duration <= 0" />
</template>
<script setup lang="ts">
import { usePlayerStore } from '@/stores/player'
import { ref, watch } from 'vue'
import { NSlider } from 'naive-ui'

const playerStore = usePlayerStore()
const isDragging = ref(false)
const sliderValue = ref(0)

watch(
    () => playerStore.currentTime,
    (newTime) => {
        if (!isDragging.value) {
            sliderValue.value = newTime
        }
    },
    { immediate: true }
)

const handleValueUpdate = (value: number) => {
    if (value !== undefined && value !== null) {
        sliderValue.value = value
        if (!isDragging.value) {
            playerStore.seek(value)
        }
    }
}

const handleDragStart = () => {
    isDragging.value = true
}

const handleDragEnd = () => {
    if (sliderValue.value !== playerStore.currentTime) {
        playerStore.seek(sliderValue.value)
    }
    isDragging.value = false
}

const formatTooltip = (value: number) => {
    const minutes = Math.floor(value / 60)
    const seconds = Math.floor(value % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds} / ${Math.floor(playerStore.duration / 60)}:${
        Math.floor(playerStore.duration % 60) < 10 ? '0' : ''
    }${Math.floor(playerStore.duration % 60)}`
}
</script>
