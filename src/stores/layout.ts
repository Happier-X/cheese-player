import { defineStore } from 'pinia'
import { ref } from 'vue'

// 布局状态管理
export const useLayoutStore = defineStore('layout', () => {
    // 是否为正常模式
    const isNormal = ref(true)
    // 切换布局
    const toggleLayout = () => {
        isNormal.value = !isNormal.value
    }
    return {
        isNormal,
        toggleLayout
    }
})
