<template>
    <div class="w-full h-full p-4">
        <div class="w-full max-w-full flex flex-col gap-8">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl font-semibold tracking-tight">推荐歌曲</h2>
                <div class="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        class="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                        @click="prevRecommendedSection">
                        <ChevronLeft class="h-5 w-5" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        class="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                        @click="nextRecommendedSection">
                        <ChevronRight class="h-5 w-5" />
                    </Button>
                </div>
            </div>
            <div class="relative">
                <Carousel
                    :opts="{
                        align: 'start',
                        loop: true,
                        dragFree: true
                    }"
                    :plugins="[
                        Autoplay({ delay: 5000, stopOnInteraction: true })
                    ]"
                    class="w-full overflow-hidden">
                    <CarouselContent class="py-2">
                        <CarouselItem
                            v-for="(item, index) in recommendedSongs"
                            :key="index"
                            class="md:basis-1/5 lg:basis-1/6">
                            <div class="flex flex-col gap-3 p-2 group h-full">
                                <!-- 封面图片 -->
                                <div
                                    class="relative aspect-square overflow-hidden rounded-xl">
                                    <!-- 图片 -->
                                    <img
                                        :src="item.cover"
                                        alt="封面"
                                        class="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-300 ease-in-out" />

                                    <!-- 渐变叠加层 - 总是存在但根据悬停透明度变化 -->
                                    <div
                                        class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>

                                    <!-- 播放按钮 -->
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        class="absolute bottom-2 right-2 rounded-full bg-primary text-primary-foreground opacity-0 group-hover:opacity-100 transition-all shadow-lg h-10 w-10 transform translate-y-2 group-hover:translate-y-0 duration-300"
                                        @click="handlePlay(item)">
                                        <Play class="h-5 w-5" />
                                    </Button>
                                </div>

                                <!-- 文字信息 -->
                                <div class="flex flex-col min-h-[3rem] px-1">
                                    <h3
                                        class="font-medium line-clamp-1 group-hover:text-primary transition-colors duration-200"
                                        :title="item?.title">
                                        {{ item?.title ?? '未知歌曲' }}
                                    </h3>
                                    <p
                                        class="text-sm text-muted-foreground line-clamp-1"
                                        :title="item?.artist">
                                        {{ item?.artist ?? '未知艺术家' }}
                                    </p>
                                </div>
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious
                        class="carousel-prev !opacity-0 !invisible absolute" />
                    <CarouselNext
                        class="carousel-next !opacity-0 !invisible absolute" />
                </Carousel>
            </div>

            <!-- 推荐艺术家 -->
            <section>
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-2xl font-semibold tracking-tight">
                        推荐艺术家
                    </h2>
                    <Button variant="ghost" size="sm" class="gap-1">
                        <Users class="h-4 w-4" />
                        查看更多艺术家
                    </Button>
                </div>
                <div
                    class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                    <div
                        v-for="(artist, index) in recommendedArtists"
                        :key="index"
                        class="flex flex-col items-center gap-3 p-2 cursor-pointer group"
                        @click="goToArtistPage(artist)">
                        <!-- 艺术家头像 -->
                        <div
                            class="relative aspect-square w-full overflow-hidden">
                            <Avatar class="w-full h-full">
                                <AvatarImage
                                    :src="artist.image"
                                    class="object-cover transform group-hover:scale-105 transition-transform duration-300" />
                                <AvatarFallback
                                    class="text-2xl bg-gradient-to-br from-primary/80 to-primary/30">
                                    {{ artist.name?.[0]?.toUpperCase() ?? '?' }}
                                </AvatarFallback>
                            </Avatar>
                            <div
                                class="absolute inset-0 rounded-full bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>

                        <!-- 艺术家名称 -->
                        <div class="text-center">
                            <h3
                                class="font-medium line-clamp-1 group-hover:text-primary transition-colors duration-200"
                                :title="artist.name">
                                {{ artist.name ?? '未知艺术家' }}
                            </h3>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 推荐专辑 -->
            <section>
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-2xl font-semibold tracking-tight">
                        推荐专辑
                    </h2>
                    <Button variant="ghost" size="sm" class="gap-1">
                        <Disc3 class="h-4 w-4" />
                        浏览更多专辑
                    </Button>
                </div>

                <div
                    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                    <div
                        v-for="(album, index) in recommendedAlbums"
                        :key="index"
                        class="group cursor-pointer"
                        @click="goToAlbumPage(album)">
                        <!-- 专辑封面 -->
                        <div
                            class="relative aspect-square mb-3 overflow-hidden rounded-md shadow-md">
                            <img
                                :src="album.cover"
                                :alt="album.name"
                                class="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-300 ease-out" />

                            <!-- 渐变和控件叠加层 -->
                            <div
                                class="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                                <div class="flex items-center gap-2">
                                    <!-- 播放按钮 -->
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        class="rounded-full bg-primary text-primary-foreground h-12 w-12 shadow-xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75"
                                        @click.stop="playAlbum(album)">
                                        <Play class="h-6 w-6" />
                                    </Button>
                                </div>
                            </div>

                            <!-- 专辑年份标签 -->
                            <div
                                class="absolute top-2 right-2 bg-background/80 text-foreground px-2 py-0.5 text-xs font-medium rounded-full backdrop-blur-sm">
                                {{ album.year || '未知年份' }}
                            </div>
                        </div>

                        <!-- 专辑信息 -->
                        <div>
                            <h3
                                class="font-medium line-clamp-1 group-hover:text-primary transition-colors duration-200"
                                :title="album.name">
                                {{ album.name }}
                            </h3>
                            <p
                                class="text-sm text-muted-foreground line-clamp-1"
                                :title="album.artist">
                                {{ album.artist }}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import subsonicApi from '@/api/subsonic'
import { usePlayerStore } from '@/stores/player'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '@/components/ui/carousel'
import {
    RefreshCcw,
    Play,
    Users,
    ChevronLeft,
    ChevronRight,
    Disc3
} from 'lucide-vue-next'
import Autoplay from 'embla-carousel-autoplay'

// 播放器状态管理
const playerStore = usePlayerStore()

// 轮播控制引用
const carouselNextBtn = ref<HTMLElement | null>(null)
const carouselPrevBtn = ref<HTMLElement | null>(null)

// 加载完成后设置引用
onMounted(() => {
    setTimeout(() => {
        carouselNextBtn.value = document.querySelector('.carousel-next')
        carouselPrevBtn.value = document.querySelector('.carousel-prev')
    }, 500)
})

// 切换到上一组推荐歌曲
const prevRecommendedSection = () => {
    if (carouselPrevBtn.value) {
        carouselPrevBtn.value.click()
    }
}

// 切换到下一组推荐歌曲
const nextRecommendedSection = () => {
    if (carouselNextBtn.value) {
        carouselNextBtn.value.click()
    }
}

// 歌曲总数
const total = ref(0)

// 歌曲列表
const songList = ref<any[]>([])

// 根据当前时间显示不同的问候语
const greeting = computed(() => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 9) {
        return '早上好'
    } else if (hour >= 9 && hour < 12) {
        return '上午好'
    } else if (hour >= 12 && hour < 14) {
        return '中午好'
    } else if (hour >= 14 && hour < 18) {
        return '下午好'
    } else if (hour >= 18 && hour < 22) {
        return '晚上好'
    } else {
        return '夜深了'
    }
})

// 推荐歌曲（随机选择一些歌曲作为推荐）
const recommendedSongs = computed(() => {
    if (songList.value.length === 0) return []
    // 随机选择20首歌曲
    const shuffled = [...songList.value].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 20)
})

// 从歌曲中提取艺术家并去重
const recommendedArtists = computed(() => {
    if (songList.value.length === 0) return []

    // 创建一个艺术家映射，用于去重和累计歌曲数
    const artistMap = new Map()

    songList.value.forEach((song) => {
        const artistName = song.artist || '未知艺术家'

        if (artistMap.has(artistName)) {
            // 更新现有艺术家的歌曲计数
            const existingArtist = artistMap.get(artistName)
            existingArtist.songCount++
        } else {
            // 添加新艺术家
            artistMap.set(artistName, {
                name: artistName,
                // 使用歌曲封面作为艺术家图片 (实际项目中可能需要专门的艺术家图片API)
                image: song.cover,
                songCount: 1
            })
        }
    })

    // 转换为数组并按歌曲数降序排列
    const artistArray = Array.from(artistMap.values())
    artistArray.sort((a, b) => b.songCount - a.songCount)

    // 随机选择12位艺术家展示
    return artistArray.slice(0, 12).sort(() => 0.5 - Math.random())
})

// 从歌曲中提取专辑并去重
const recommendedAlbums = computed(() => {
    if (songList.value.length === 0) return []

    // 创建一个专辑映射，用于去重和收集歌曲
    const albumMap = new Map()

    songList.value.forEach((song) => {
        if (!song.album) return

        const albumName = song.album

        if (albumMap.has(albumName)) {
            // 更新现有专辑的歌曲列表
            const existingAlbum = albumMap.get(albumName)
            existingAlbum.songCount++
            existingAlbum.songs.push(song)
        } else {
            // 添加新专辑
            albumMap.set(albumName, {
                name: albumName,
                artist: song.artist || '未知艺术家',
                cover: song.cover,
                year: song.year || null,
                songCount: 1,
                songs: [song]
            })
        }
    })

    // 转换为数组并按随机顺序排列
    const albumArray = Array.from(albumMap.values())

    // 过滤出包含多首歌曲的专辑，然后随机选择10张专辑展示
    return albumArray
        .filter((album) => album.songCount > 1)
        .sort(() => 0.5 - Math.random())
        .slice(0, 10)
})

// 没有过滤和排序的需要了

/**
 * 获取歌曲列表
 */
const getSongList = async () => {
    let current = 0
    const size = 100
    let hasMoreSongs = true
    try {
        songList.value = [] // 清空现有歌曲列表
        while (hasMoreSongs) {
            const res: any = await subsonicApi.search({
                query: '',
                songCount: size,
                songOffset: current * size
            })
            if (res.searchResult2?.song && res.searchResult2.song.length > 0) {
                const songs = res.searchResult2.song
                await Promise.all(
                    songs.map(async (item: any) => {
                        item.cover = await subsonicApi.getCoverById({
                            id: item.id
                        })
                        return item
                    })
                )
                songList.value.push(...songs)
                if (res.searchResult2.song.length < size) {
                    hasMoreSongs = false
                }
            } else {
                hasMoreSongs = false
            }
            current++
        }
        total.value = songList.value.length
    } catch (error) {
        console.error('获取歌曲列表失败:', error)
    }
}

/**
 * 刷新歌曲列表
 */
const refreshSongList = () => {
    getSongList()
}

/**
 * 播放歌曲
 */
async function handlePlay(item: any) {
    await playerStore.loadSong(item)
    playerStore.setPlayQueue(songList.value)
    playerStore.play()
}

/**
 * 前往艺术家页面
 */
function goToArtistPage(artist: any) {
    console.log('前往艺术家页面:', artist.name)
    // 在实际应用中，这里可以添加导航到艺术家详情页面的逻辑
    // 例如：router.push({ name: 'artist', params: { id: artist.id }})
}

/**
 * 前往专辑页面
 */
function goToAlbumPage(album: any) {
    console.log('前往专辑页面:', album.name)
    // 在实际应用中，这里可以添加导航到专辑详情页面的逻辑
    // 例如：router.push({ name: 'album', params: { id: album.id }})
}

/**
 * 播放整张专辑
 */
function playAlbum(album: any) {
    console.log('播放整张专辑:', album.name)
    if (album.songs && album.songs.length > 0) {
        // 设置播放队列为专辑中的所有歌曲
        playerStore.setPlayQueue(album.songs)
        // 播放第一首歌
        playerStore.loadSong(album.songs[0])
        playerStore.play()
    }
}

onMounted(() => {
    getSongList()
})
</script>
