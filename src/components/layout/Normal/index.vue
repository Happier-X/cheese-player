<template>
    <div class="size-screen relative">
        <n-layout position="absolute" has-sider>
            <n-layout-sider
                bordered
                class="h-[calc(100vh-4.5rem)]"
                show-trigger="bar"
                :collapsed="collapsed"
                :collapsed-width="64"
                collapse-mode="width"
                @collapse="collapsed = true"
                @expand="collapsed = false">
                <SideBar :collapsed="collapsed" />
            </n-layout-sider>
            <div class="size-full relative">
                <n-layout position="absolute">
                    <n-layout-header class="h-10" bordered>
                        <TitleBar />
                    </n-layout-header>
                    <n-layout-content
                        position="absolute"
                        class="top-10! bottom-18!"
                        content-class="px-6 pb-5"
                        :native-scrollbar="false">
                        <RouterView v-slot="{ Component }">
                            <KeepAlive>
                                <component :is="Component"></component>
                            </KeepAlive>
                        </RouterView>
                    </n-layout-content>
                </n-layout>
            </div>
            <n-layout-footer position="absolute" class="h-18 bg-[unset] z-1">
                <PlayerBar />
            </n-layout-footer>
        </n-layout>
    </div>
</template>
<script setup lang="ts">
import PlayerBar from './PlayerBar.vue'
import SideBar from './SideBar.vue'
import TitleBar from './TitleBar.vue'
import {
    NLayout,
    NLayoutContent,
    NLayoutFooter,
    NLayoutHeader,
    NLayoutSider
} from 'naive-ui'
import { ref } from 'vue'

const collapsed = ref(false)
</script>
