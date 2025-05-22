<template>
  <div class="w-full h-full flex items-center justify-end gap-2" data-tauri-drag-region>
    <div class="tooltip tooltip-bottom" data-tip="设置">
      <Button variant="ghost" size="icon" @click="handleOpenSetting">
        <SettingIcon size="20px"></SettingIcon>
      </Button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { RiSettingsLine as SettingIcon } from "@remixicon/vue";
import { useRouter } from "vue-router";
import { Button } from "@/components/ui/button";

// 路由器实例
const router = useRouter();
// 打开设置页面
const handleOpenSetting = () => {
  router.push("/setting");
};
</script>
