<template>
  <div
    class="w-full h-full flex items-center justify-start gap-2"
    data-tauri-drag-region
  >
      <button
        class="btn btn-sm btn-circle btn-ghost"
        @click="handleChangeLayout"
      >
        <CloseImmersiveIcon size="20px"></CloseImmersiveIcon>
      </button>
  </div>
</template>
<script setup lang="ts">
import {
  RiArrowDownSLine as CloseImmersiveIcon,
} from "@remixicon/vue";
import { useLayoutStore } from "../../../../stores/layout";

const layoutStore = useLayoutStore();
const handleChangeLayout = () => {
  layoutStore.changeLayout();
};
</script>
