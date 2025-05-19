<template>
    <div class="w-full h-full overflow-x-hidden overflow-y-scroll">
        <div class="w-full" v-for="(line, index) in playerStore.lyricLines" :key="index">
            <div class="w-full h-10 text-center text-2xl" :class="{
                'text-blue-500': index === playerStore.currentLyricLine,
                'text-gray-500': index !== playerStore.currentLyricLine
            }">
                {{ line.text }}
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { usePlayerStore } from "../../../stores/player";
const playerStore = usePlayerStore();
</script>