<template>
    <div class="w-full h-full">
        <div class="w-full h-[32px]">
            <TitleBar />
        </div>
        <div class="w-full h-[50px]">
            <MenuBar />
        </div>
        <div class="w-full">
            <RouterView v-slot="{ Component }">
                <KeepAlive>
                    <component :is="Component"></component>
                </KeepAlive>
            </RouterView>
        </div>
    </div>
</template>
<script setup lang="ts">
import TitleBar from '@/layout/normal/components/TitleBar.vue'
import MenuBar from '@/layout/normal/components/MenuBar.vue'
</script>
