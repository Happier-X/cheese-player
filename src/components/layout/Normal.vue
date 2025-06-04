<template>
    <div class="w-full h-full flex flex-col overflow-hidden">
        <div class="w-full h-[calc(100%-75px)] flex">
            <SidebarProvider
                style="--sidebar-width: 12rem"
                class="h-[calc(100vh-75px)]! min-h-0!">
                <Sidebar collapsible="icon" class="h-[calc(100vh-75px)]!">
                    <SidebarHeader>
                        <div class="flex items-center justify-center">
                            <MusicIcon />
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem
                                        v-for="item in menuList"
                                        :key="item.title">
                                        <SidebarMenuButton
                                            asChild
                                            :isActive="item.path === route.path"
                                            :tooltip="item.title"
                                            class="data-[active=true]:bg-[var(--sidebar-primary)] data-[active=true]:text-[var(--sidebar-primary-foreground)]">
                                            <RouterLink :to="item.path">
                                                <component :is="item.icon" />
                                                <span>{{ item.title }}</span>
                                            </RouterLink>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                    <SidebarFooter>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem
                                    v-for="item in bottomMenuList"
                                    :key="item.title">
                                    <SidebarMenuButton
                                        asChild
                                        :isActive="item.path === route.path"
                                        :tooltip="item.title"
                                        class="data-[active=true]:bg-[var(--sidebar-primary)] data-[active=true]:text-[var(--sidebar-primary-foreground)]">
                                        <RouterLink :to="item.path">
                                            <component :is="item.icon" />
                                            <span>{{ item.title }}</span>
                                        </RouterLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarFooter>
                </Sidebar>
                <div class="flex-1 flex flex-col">
                    <div
                        data-tauri-drag-region
                        class="flex items-center justify-between border-b-1">
                        <div></div>
                        <WindowControls />
                    </div>
                    <div class="flex-1 overflow-hidden">
                        <RouterView v-slot="{ Component }">
                            <KeepAlive>
                                <component :is="Component"></component>
                            </KeepAlive>
                        </RouterView>
                    </div>
                </div>
            </SidebarProvider>
        </div>
        <div
            class="w-full h-[75px] p-3 flex items-center justify-between relative z-99">
            <ProgressBar class="absolute -top-0.75 left-0" />
            <MusicInfo
                :current-song-info="playerStore.currentSongInfo"
                @click-cover="layoutStore.toggleLayout" />
            <PlayControls />
            <div class="w-full"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import MusicInfo from '@/components/common/MusicInfo.vue'
import PlayControls from '@/components/common/PlayControls.vue'
import WindowControls from '@/components/common/WindowControls.vue'
import ProgressBar from '@/components/common/ProgressBar.vue'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider
} from '@/components/ui/sidebar'
import {
    Disc3 as AlbumIcon,
    MicVocal as ArtistIcon,
    House as HomeIcon,
    Headphones as MusicIcon,
    ScrollText as PlaylistIcon,
    Settings as SettingsIcon
} from 'lucide-vue-next'
import { useRoute } from 'vue-router'
import { usePlayerStore } from '@/stores/player'
import { useLayoutStore } from '@/stores/layout'

const route = useRoute()
const menuList = [
    {
        title: '首页',
        icon: HomeIcon,
        path: '/home'
    },
    {
        title: '专辑',
        icon: AlbumIcon,
        path: '/album'
    },
    {
        title: '艺术家',
        icon: ArtistIcon,
        path: '/artist'
    },
    {
        title: '歌单',
        icon: PlaylistIcon,
        path: '/playlist'
    }
]
const bottomMenuList = [
    {
        title: '设置',
        icon: SettingsIcon,
        path: '/settings'
    }
]
const playerStore = usePlayerStore()
const layoutStore = useLayoutStore()
</script>
