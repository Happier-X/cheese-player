<template>
  <div
    class="w-full h-full flex items-center justify-end gap-2"
    data-tauri-drag-region
  >
    <div class="tooltip tooltip-bottom" data-tip="最小化">
      <button class="btn btn-sm btn-circle btn-ghost" @click="handleMinimize">
        <MinimizeIcon size="20px"></MinimizeIcon>
      </button>
    </div>
    <div
      class="tooltip tooltip-bottom"
      :data-tip="isMaximized ? '还原' : '最大化'"
    >
      <button
        class="btn btn-sm btn-circle btn-ghost"
        @click="handleSwitchScreenSize"
      >
        <component
          :is="isMaximized ? UnMaximizeIcon : MaximizeIcon"
          size="20px"
        />
      </button>
    </div>
    <div class="tooltip tooltip-bottom" data-tip="关闭">
      <button class="btn btn-sm btn-circle btn-ghost" @click="handleClose">
        <CloseIcon size="20px"></CloseIcon>
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  RiCloseLine as CloseIcon,
  RiCheckboxBlankLine as MaximizeIcon,
  RiSubtractLine as MinimizeIcon,
  RiCheckboxMultipleBlankLine as UnMaximizeIcon,
} from "@remixicon/vue";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { onMounted, ref } from "vue";

// 窗口对象
const appWindow = getCurrentWindow();
// 是否全屏
const isFullScreen = ref(false);
// 是否最大化
const isMaximized = ref(false);
onMounted(async () => {
  isMaximized.value = await appWindow.isMaximized();
  isFullScreen.value = await appWindow.isFullscreen();
  appWindow.onResized(async () => {
    isMaximized.value = await appWindow.isMaximized();
  });
});
/**
 * 最小化
 */
const handleMinimize = async () => {
  await appWindow.minimize();
};
/**
 * 切换屏幕大小
 */
const handleSwitchScreenSize = async () => {
  await appWindow.toggleMaximize();
};
/**
 * 关闭
 */
const handleClose = async () => {
  await appWindow.close();
};
</script>
