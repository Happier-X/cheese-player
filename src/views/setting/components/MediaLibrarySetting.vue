<template>
  <CheeseCard title="媒体库">
    <div class="flex items-center justify-between">
      <div class="flex items-center justify-center gap-2">
        <div>
          {{
            mediaLibraryServerForm.url
              ? mediaLibraryServerForm.url
              : "服务器配置"
          }}
        </div>
        <div class="inline-grid *:[grid-area:1/1]">
          <div
            class="status animate-ping"
            :class="isConnected ? 'status-success' : 'status-error'"
          ></div>
          <div
            class="status"
            :class="isConnected ? 'status-success' : 'status-error'"
          ></div>
        </div>
      </div>
      <button
        class="btn btn-sm btn-circle btn-ghost"
        @click="visible = !visible"
      >
        <EditIcon size="20px"></EditIcon>
      </button>
    </div>
  </CheeseCard>
  <CheeseDialog v-model="visible" title="服务器配置">
    <fieldset class="fieldset">
      <label class="floating-label">
        <span>服务地址</span>
        <input
          type="text"
          class="input input-md w-full"
          v-model="mediaLibraryServerForm.url"
          placeholder="服务地址"
        />
      </label>
      <label class="floating-label mt-6">
        <span>用户名</span>
        <input
          type="text"
          class="input input-md w-full"
          placeholder="用户名"
          v-model="mediaLibraryServerForm.username"
        />
      </label>
      <label class="floating-label mt-6">
        <span>密码</span>
        <input
          type="password"
          class="input input-md w-full"
          placeholder="密码"
          v-model="mediaLibraryServerForm.password"
        />
      </label>
    </fieldset>
    <template #action>
      <button class="btn" @click="handleDialogClose">关闭</button>
      <button class="btn btn-neutral" @click="handleSave">保存</button>
    </template>
  </CheeseDialog>
</template>
<script setup lang="ts">
import CheeseCard from "../../../components/CheeseCard.vue";
import CheeseDialog from "../../../components/CheeseDialog.vue";
import { RiEditLine as EditIcon } from "@remixicon/vue";
import { ref, onMounted } from "vue";
import { Store } from "@tauri-apps/plugin-store";
import subsonicApi from "../../../api/subsonic";

// 是否展示对话框
const visible = ref(false);
/**
 * 关闭对话框
 */
const handleDialogClose = () => {
  visible.value = false;
};
/**
 * 媒体库服务器配置表单
 */
const mediaLibraryServerForm = ref({
  url: "",
  username: "",
  password: "",
});
// 设置存储
let settingStore = null as Store | null;
onMounted(async () => {
  settingStore = await Store.load("store.setting");
  mediaLibraryServerForm.value = (await settingStore?.get(
    "mediaLibraryServer"
  )) || {
    url: "",
    username: "",
    password: "",
  };
  handlePing();
});
/**
 * 保存设置
 */
const handleSave = async () => {
  await settingStore?.set("mediaLibraryServer", mediaLibraryServerForm.value);
  visible.value = false;
  handlePing();
};
/**
 * 测试连接
 */
const handlePing = async () => {
  const res: any = await subsonicApi.ping();
  if (res.status === "ok") {
    isConnected.value = true;
  } else {
    isConnected.value = false;
  }
};
// 是否连接成功
const isConnected = ref(false);
</script>
