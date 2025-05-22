<template>
  <div class="w-full h-full flex items-center justify-end gap-2" data-tauri-drag-region>
    <div class="tooltip tooltip-bottom" data-tip="最小化">
      <Button variant="ghost" size="icon" @click="handleMinimize">
        <MinimizeIcon size="20px"></MinimizeIcon>
      </Button>
    </div>
    <div class="tooltip tooltip-bottom" :data-tip="isMaximized ? '还原' : '最大化'">
      <Button variant="ghost" size="icon" @click="handleSwitchScreenSize">
        <component :is="isMaximized ? UnMaximizeIcon : MaximizeIcon" size="20px" />
      </Button>
    </div>
    <div class="tooltip tooltip-bottom" data-tip="关闭">
      <Button variant="ghost" size="icon" @click="handleClose">
        <CloseIcon size="20px"></CloseIcon>
      </Button>
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
import { Button } from "@/components/ui/button";

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
