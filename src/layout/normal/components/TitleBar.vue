<template>
    <div
        data-tauri-drag-region
        class="flex items-center justify-between border-b-1">
        <div class="px-3 select-none">Cheese Player</div>
        <WindowControls />
    </div>
</template>
<script setup lang="ts">
import WindowControls from '@/components/layout/WindowControls.vue'
</script>
