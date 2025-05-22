<template>
  <div class="w-full h-full">
    <div class="w-full h-[48px]">
      <TitleBar />
    </div>
    <div class="w-full h-[48px]">
      <MenuBar />
    </div>
    <div class="w-full h-[calc(100%-171px)] px-[5%]">
      <RouterView v-slot="{ Component }">
        <KeepAlive>
          <component :is="Component"></component>
        </KeepAlive>
      </RouterView>
    </div>
    <div class="w-full h-[75px]">
      <PlayBar />
    </div>
  </div>
</template>
<script setup lang="ts">
import TitleBar from "./titleBar/index.vue";
import MenuBar from "./menBar/index.vue";
import PlayBar from "./playBar/index.vue";
</script>
