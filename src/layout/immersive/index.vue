<template>
    <div class="w-full h-full">
        <div class="w-full h-[48px]">
            <TitleBar/>
        </div>
        <div class="w-full h-[calc(100%-123px)] flex items-center justify-center">
            <div class="w-9/20 h-full bg-pink-200">123</div>
            <div class="w-9/20 h-full bg-blue-200">456</div>
        </div>
        <div class="w-full h-[75px]">
            <PlayBar />
        </div>
    </div>
</template>
<script setup lang="ts">
import TitleBar from "./titleBar/index.vue";
import PlayBar from "./playBar/index.vue";
</script>
