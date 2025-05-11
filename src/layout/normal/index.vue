<template>
  <div class="w-full h-full bg-base-100">
    <div class="w-full h-[48px]">
      <TopBar></TopBar>
    </div>
    <div class="w-full h-[48px]">
      <MenuBar></MenuBar>
    </div>
    <div class="w-full h-[calc(100%-171px)] px-[5%]">
      <RouterView v-slot="{ Component }">
        <KeepAlive>
          <component :is="Component"></component>
        </KeepAlive>
      </RouterView>
    </div>
    <div class="w-full h-[75px]">
      <PlayBar></PlayBar>
    </div>
  </div>
</template>
<script setup lang="ts">
import TopBar from "./topBar/index.vue";
import MenuBar from "./menBar/index.vue";
import PlayBar from "./playBar/index.vue";
</script>
