<template>
    <keep-alive>
        <component :is="layoutStore.isNormal ? Normal : Immersive" />
    </keep-alive>
</template>
<script setup lang="ts">
import Normal from '@/components/layout/Normal.vue'
import Immersive from '@/components/layout/Immersive.vue'
import { useLayoutStore } from '@/stores/layout'

const layoutStore = useLayoutStore()
</script>
