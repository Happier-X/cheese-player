<template>
    <div class="w-full h-full">
        <div class="w-full h-[48px]">
            <TitleBar />
        </div>
        <div class="w-full h-[calc(100%-123px)] flex items-center justify-center">
            <div class="w-9/20 h-full">
                <MusicInfo :cover-img="playerStore.currentSongInfo?.coverImg"
                    :title="playerStore.currentSongInfo?.title" :artist="playerStore.currentSongInfo?.artist"
                    :album="playerStore.currentSongInfo?.album" />
            </div>
            <div class="w-9/20 h-full">
                <Lyric />
            </div>
        </div>
        <div class="w-full h-[75px]">
            <PlayBar />
        </div>
    </div>
</template>
<script setup lang="ts">
import MusicInfo from "./musicInfo/index.vue";
import TitleBar from "./titleBar/index.vue";
import PlayBar from "./playBar/index.vue";
import Lyric from "./lyric/index.vue";
import { usePlayerStore } from "../../stores/player";
const playerStore = usePlayerStore();
</script>
