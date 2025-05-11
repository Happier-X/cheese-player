<template>
  <CheeseCard title="媒体库">
    <div class="flex items-center justify-between">
      <div>服务器配置</div>
      <button
        class="btn btn-sm btn-circle btn-ghost"
        @click="visible = !visible"
      >
        <EditIcon size="20px"></EditIcon>
      </button>
    </div>
  </CheeseCard>
  <CheeseDialog v-model="visible" title="服务器配置">
    <form action="#">
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
    </form>
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
import { api } from "../../../api";

// 是否展示对话框
const visible = ref(false);
/**
 * 关闭对话框
 */
const handleDialogClose = () => {
  visible.value = false;
};
const mediaLibraryServerForm = ref({
  url: "",
  username: "",
  password: "",
});
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
});
/**
 * 保存设置
 */
const handleSave = async () => {
  // 设置存储
  await settingStore?.set("mediaLibraryServer", mediaLibraryServerForm.value);
  visible.value = false;
  const res = await api.ping();
  console.log(1111111111, res);
};
</script>
