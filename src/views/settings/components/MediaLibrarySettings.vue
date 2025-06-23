<template>
    <n-h3 prefix="bar" class="mt-5!">媒体库设置</n-h3>
    <n-flex vertical :size="12">
        <n-card>
            <n-flex justify="space-between" align="center">
                <n-flex vertical>
                    <n-text strong class="font-size-4">服务地址</n-text>
                    <n-tag
                        :type="
                            isLinked === 'false'
                                ? 'error'
                                : isLinked === 'true'
                                  ? 'success'
                                  : 'warning'
                        "
                        round
                        :bordered="false"
                        size="small">
                        {{
                            isLinked === 'false'
                                ? '未连接'
                                : isLinked === 'true'
                                  ? '已连接'
                                  : '连接中'
                        }}
                        <template #icon>
                            <component
                                :is="
                                    isLinked === 'false'
                                        ? UnlinkIcon
                                        : isLinked === 'true'
                                          ? LinkIcon
                                          : PingingIcon
                                "
                                :size="14"
                                :class="
                                    isLinked === 'pinging' ? 'animate-spin' : ''
                                " />
                        </template>
                    </n-tag>
                </n-flex>
                <n-input
                    v-model:value="mediaServer.url"
                    type="text"
                    placeholder="请输入服务地址"
                    :on-blur="handleMediaServerFormSubmit"
                    class="w-60!" />
            </n-flex>
        </n-card>
        <n-card>
            <n-flex justify="space-between" align="center">
                <n-flex vertical>
                    <n-text strong class="font-size-4">用户名</n-text>
                </n-flex>
                <n-input
                    v-model:value="mediaServer.username"
                    type="text"
                    placeholder="请输入用户名"
                    :on-blur="handleMediaServerFormSubmit"
                    class="w-60!" />
            </n-flex>
        </n-card>
        <n-card>
            <n-flex justify="space-between" align="center">
                <n-flex vertical>
                    <n-text strong class="font-size-4">密码</n-text>
                </n-flex>
                <n-input
                    v-model:value="mediaServer.password"
                    type="password"
                    show-password-on="click"
                    placeholder="请输入密码"
                    :on-blur="handleMediaServerFormSubmit"
                    class="w-60!" />
            </n-flex>
        </n-card>
    </n-flex>
</template>
<script setup lang="ts">
import subsonicApi from '@/api/subsonic'
import { Store } from '@tauri-apps/plugin-store'
import {
    Loader as PingingIcon,
    CircleCheck as LinkIcon,
    CircleX as UnlinkIcon
} from 'lucide-vue-next'
import { onMounted, ref } from 'vue'
import { NCard, NFlex, NInput, NTag, NText, NH3 } from 'naive-ui'

const mediaServer = ref({
    url: '',
    username: '',
    password: ''
})
let settingsStore = null as Store | null
onMounted(async () => {
    settingsStore = await Store.load('store.settings')
    mediaServer.value = (await settingsStore?.get('mediaServer')) || {
        url: '',
        username: '',
        password: ''
    }
    handlePing()
})
const isLinked = ref('false')
const handlePing = async () => {
    isLinked.value = 'pinging'
    try {
        const res: any = await subsonicApi.ping()
        if (res.status === 'ok') {
            isLinked.value = 'true'
        } else {
            isLinked.value = 'false'
        }
    } catch (error) {
        isLinked.value = 'false'
    }
}
const handleMediaServerFormSubmit = async () => {
    await settingsStore?.set('mediaServer', mediaServer.value)
    handlePing()
}
</script>
