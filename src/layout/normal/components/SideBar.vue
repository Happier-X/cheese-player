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
            <SidebarFooter></SidebarFooter>
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
import {
    Disc3 as AlbumIcon,
    MicVocal as ArtistIcon,
    House as HomeIcon,
    Headphones as MusicIcon,
    ScrollText as PlaylistIcon
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
</script>
