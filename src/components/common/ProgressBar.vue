<template>
    <Slider
        :class="circle ? '' : '[&>span:first-child]:rounded-none!'"
        :model-value="[isDragging ? tempProgress : playerStore.progress]"
        :step="0.01"
        thumbAlignment="overflow"
        @valueCommit="handleValueCommit"
        @update:model-value="handleValueUpdate" />
</template>
<script setup lang="ts">
import { Slider } from '@/components/ui/slider'
import { usePlayerStore } from '@/stores/player'
import { ref } from 'vue'

const playerStore = usePlayerStore()
const isDragging = ref(false)
const tempProgress = ref(0)
defineProps({
    circle: {
        type: Boolean,
        default: false
    }
})
const handleValueUpdate = (payload: number[] | undefined) => {
    if (isDragging.value && payload) {
        tempProgress.value = payload[0]
    } else if (!isDragging.value && payload) {
        isDragging.value = true
        tempProgress.value = payload[0]
    }
}
const handleValueCommit = (payload: number[] | undefined) => {
    if (payload) {
        playerStore.seek(payload[0])
        isDragging.value = false
    }
}
</script>
