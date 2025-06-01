<template>
    <div class="w-screen h-screen">
        <keep-alive>
            <component :is="isNormal ? Normal : Immersive" />
        </keep-alive>
    </div>
</template>
<script setup lang="ts">
import Normal from '@/layout/normal/index.vue'
import Immersive from '@/layout/immersive/index.vue'
import { useLayout } from '@/composables/useLayout'

const { isNormal } = useLayout()
</script>
