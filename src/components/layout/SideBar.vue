<template>
    <SidebarProvider :defaultOpen="false">
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
                            <SidebarMenuButton asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    @click="item.action">
                                    <component :is="item.icon" />
                                </Button>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarFooter>
        </Sidebar>
    </SidebarProvider>
</template>
<script setup lang="ts">
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
import { Button } from '@/components/ui/button'
import {
    Disc3 as AlbumIcon,
    MicVocal as ArtistIcon,
    House as HomeIcon,
    Headphones as MusicIcon,
    ScrollText as PlaylistIcon,
    Settings as SettingsIcon
} from 'lucide-vue-next'
import { useRoute } from 'vue-router'
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
        action: () => {
            alert('设置功能尚未实现')
        }
    }
]
</script>
