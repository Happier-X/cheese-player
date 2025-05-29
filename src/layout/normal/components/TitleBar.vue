<template>
    <div
        data-tauri-drag-region
        class="w-full h-full flex items-center justify-between">
        <div></div>
        <div>
            <WindowControls />
        </div>
    </div>
</template>
<script setup lang="ts">
import WindowControls from '@/components/layout/WindowControls.vue'
</script>
