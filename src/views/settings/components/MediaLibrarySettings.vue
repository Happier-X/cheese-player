<template>
    <div class="pt-5">
        <NH3 prefix="bar">媒体库设置</NH3>
        <NFlex vertical :size="12">
            <NCard>
                <NFlex justify="space-between" align="center">
                    <NFlex vertical>
                        <NText strong class="font-size-4">服务地址</NText>
                        <NTag
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
                                        isLinked === 'pinging'
                                            ? 'animate-spin'
                                            : ''
                                    " />
                            </template>
                        </NTag>
                    </NFlex>
                    <NInput
                        v-model:value="mediaServer.url"
                        type="text"
                        placeholder="请输入服务地址"
                        :on-blur="handleMediaServerFormSubmit"
                        class="w-60!" />
                </NFlex>
            </NCard>
            <NCard>
                <NFlex justify="space-between" align="center">
                    <NFlex vertical>
                        <NText strong class="font-size-4">用户名</NText>
                    </NFlex>
                    <NInput
                        v-model:value="mediaServer.username"
                        type="text"
                        placeholder="请输入用户名"
                        :on-blur="handleMediaServerFormSubmit"
                        class="w-60!" />
                </NFlex>
            </NCard>
            <NCard>
                <NFlex justify="space-between" align="center">
                    <NFlex vertical>
                        <NText strong class="font-size-4">密码</NText>
                    </NFlex>
                    <NInput
                        v-model:value="mediaServer.password"
                        type="password"
                        show-password-on="click"
                        placeholder="请输入密码"
                        :on-blur="handleMediaServerFormSubmit"
                        class="w-60!" />
                </NFlex>
            </NCard>
        </NFlex>
    </div>
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
