<template>
    <n-button
        text
        :focusable="false"
        class="font-size-6"
        @click="handleOpenSettings">
        <n-icon :component="SettingsIcon"></n-icon>
    </n-button>
</template>
<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui'
import { Settings as SettingsIcon } from 'lucide-vue-next'
</script>
