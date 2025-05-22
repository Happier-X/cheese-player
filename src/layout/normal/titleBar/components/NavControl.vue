<template>
  <div class="w-full h-full flex items-center justify-start gap-2" data-tauri-drag-region>
    <div class="tooltip tooltip-bottom" data-tip="后退">
      <Button variant="ghost" size="icon" @click="handleBack">
        <GoBackIcon size="20px"></GoBackIcon>
      </Button>
    </div>
    <div class="tooltip tooltip-bottom" data-tip="前进">
      <Button variant="ghost" size="icon" @click="handleForward">
        <GoForwardIcon size="20px"></GoForwardIcon>
      </Button>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  RiArrowLeftSLine as GoBackIcon,
  RiArrowRightSLine as GoForwardIcon,
} from "@remixicon/vue";
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Button } from '@/components/ui/button';

// 路由器对象
const router = useRouter();
// 路由对象
const route = useRoute();
/**
 * 后退
 */
const handleBack = () => {
  router.back();
};
/**
 * 前进
 */
const handleForward = () => {
  router.forward();
};
// 是否可以后退
const canGoBack = ref(false);
// 是否可以前进
const canGoForward = ref(false);
// 监听路由变化
watch(route, () => {
  canGoBack.value = window.history.state?.back !== null;
  canGoForward.value = window.history.state?.forward !== null;
});
</script>
