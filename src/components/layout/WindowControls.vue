<template>
    <div class="w-full h-full">
        <Button
            variant="text"
            v-for="(item, index) in ButtonList"
            :key="index"
            @click="item.action">
            <component :is="item.icon" class="scale-x-[-1]" :size="20" />
        </Button>
    </div>
</template>
<script setup lang="ts">
import {
    Bolt as SettingsIcon,
    Minus as MinimizeIcon,
    Square as MaximizeIcon,
    Copy as RestoreIcon,
    X as CloseIcon
} from 'lucide-vue-next'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { ref, onMounted, computed } from 'vue'

// 窗口对象
const appWindow = getCurrentWindow()
// 是否全屏
const isFullScreen = ref(false)
// 是否最大化
const isMaximized = ref(false)
onMounted(async () => {
    isMaximized.value = await appWindow.isMaximized()
    isFullScreen.value = await appWindow.isFullscreen()
    appWindow.onResized(async () => {
        isMaximized.value = await appWindow.isMaximized()
    })
})
/**
 * 最小化
 */
const handleMinimize = async () => {
    await appWindow.minimize()
}
/**
 * 切换屏幕大小
 */
const handleSwitchScreenSize = async () => {
    await appWindow.toggleMaximize()
}
/**
 * 关闭
 */
const handleClose = async () => {
    await appWindow.close()
}
// 按钮列表
const ButtonList = computed(() => [
    {
        icon: MinimizeIcon,
        action: handleMinimize
    },
    {
        icon: isMaximized.value ? RestoreIcon : MaximizeIcon,
        action: handleSwitchScreenSize
    },
    {
        icon: CloseIcon,
        action: handleClose
    }
])
</script>
