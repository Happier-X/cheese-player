<template>
    <div class="w-full h-full p-4 overflow-y-auto overflow-x-hidden">
        <!-- 加载状态 -->
        <div
            v-if="isLoading"
            class="flex flex-col items-center justify-center h-full">
            <div class="space-y-4 text-center">
                <Loader2 class="h-8 w-8 animate-spin mx-auto" />
                <p class="text-muted-foreground">正在加载专辑信息...</p>
            </div>
        </div>

        <!-- 错误状态 -->
        <div
            v-else-if="error"
            class="flex flex-col items-center justify-center h-full">
            <div class="space-y-4 text-center">
                <AlertCircle class="h-8 w-8 text-destructive mx-auto" />
                <p class="text-muted-foreground">加载失败: {{ error }}</p>
                <div class="flex gap-2">
                    <Button @click="fetchAlbumData">重试</Button>
                    <Button variant="outline" @click="goBackToList">
                        返回列表
                    </Button>
                </div>
            </div>
        </div>

        <!-- 内容区域 -->
        <div v-else-if="album" class="w-full max-w-full flex flex-col gap-8">
            <!-- 顶部导航 -->
            <div class="flex items-center mb-4">
                <Button
                    variant="ghost"
                    size="sm"
                    @click="goBackToList"
                    class="gap-1">
                    <ChevronLeft class="h-4 w-4" />
                    返回专辑列表
                </Button>
            </div>

            <!-- 专辑头部信息 -->
            <section class="w-full">
                <div class="flex flex-col sm:flex-row gap-6">
                    <!-- 专辑封面 -->
                    <div class="relative w-full sm:w-48 aspect-square">
                        <img
                            :src="album.cover"
                            :alt="album.name"
                            class="w-full h-full object-cover rounded-xl shadow-lg" />
                        <div
                            class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                            <Button
                                variant="secondary"
                                size="icon"
                                class="rounded-full shadow-lg bg-primary/90 text-primary-foreground h-12 w-12"
                                @click="playAlbum">
                                <Play class="h-6 w-6" />
                            </Button>
                        </div>
                    </div>

                    <!-- 专辑信息 -->
                    <div class="flex flex-col justify-end gap-2">
                        <div
                            class="inline-block mb-2 border border-primary/20 text-xs text-primary px-2 py-1 rounded-md">
                            {{ album.genre || '专辑' }}
                        </div>
                        <h1
                            class="text-3xl sm:text-4xl font-bold tracking-tight">
                            {{ album.name }}
                        </h1>
                        <div
                            class="flex flex-wrap items-center gap-1 text-muted-foreground">
                            <RouterLink
                                :to="{
                                    path: '/artist',
                                    query: { id: album.artistId }
                                }"
                                class="hover:text-primary transition-colors duration-200">
                                {{ album.artist }}
                            </RouterLink>
                            <span>•</span>
                            <span>{{ album.year || '未知年份' }}</span>
                            <span>•</span>
                            <span>{{ album.songs?.length || 0 }} 首歌曲</span>
                            <span>•</span>
                            <span>{{ formatDuration(album.duration) }}</span>
                        </div>

                        <!-- 专辑描述 -->
                        <p
                            v-if="album.description"
                            class="text-sm text-muted-foreground mt-2">
                            {{ album.description }}
                        </p>

                        <!-- 操作按钮 -->
                        <div class="flex flex-wrap gap-2 mt-4">
                            <Button @click="playAlbum" class="gap-2">
                                <Play class="h-4 w-4" />
                                播放
                            </Button>
                            <Button
                                variant="outline"
                                @click="shufflePlay"
                                class="gap-2">
                                <Shuffle class="h-4 w-4" />
                                随机播放
                            </Button>
                            <Button
                                variant="outline"
                                @click="addToQueue"
                                class="gap-2">
                                <ListPlus class="h-4 w-4" />
                                添加到队列
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                @click="toggleFavoriteAlbum"
                                class="relative">
                                <Heart
                                    class="h-4 w-4"
                                    :class="{
                                        'fill-red-500 text-red-500':
                                            album.isFavorite
                                    }" />
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <MoreHorizontal class="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem @click="shareAlbum">
                                        <Share class="h-4 w-4 mr-2" />
                                        分享专辑
                                    </DropdownMenuItem>
                                    <DropdownMenuItem @click="downloadAlbum">
                                        <Download class="h-4 w-4 mr-2" />
                                        下载专辑
                                    </DropdownMenuItem>
                                    <DropdownMenuItem @click="editAlbumInfo">
                                        <Pencil class="h-4 w-4 mr-2" />
                                        编辑信息
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 歌曲列表 -->
            <section>
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-semibold tracking-tight">
                        曲目列表
                    </h2>
                    <div class="flex items-center gap-2">
                        <Select v-model="sortOrder">
                            <SelectTrigger class="w-[180px]">
                                <SelectValue placeholder="排序方式" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="track">曲目顺序</SelectItem>
                                <SelectItem value="name">歌曲名称</SelectItem>
                                <SelectItem value="duration">时长</SelectItem>
                                <SelectItem value="popularity">
                                    热门程度
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <!-- 表格 -->
                <div class="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead class="w-[50px]">#</TableHead>
                                <TableHead>标题</TableHead>
                                <TableHead class="hidden md:table-cell">
                                    艺术家
                                </TableHead>
                                <TableHead
                                    class="hidden md:table-cell w-[100px]">
                                    时长
                                </TableHead>
                                <TableHead class="w-[120px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow
                                v-for="(song, index) in sortedSongs"
                                :key="song.id"
                                :class="{
                                    'bg-muted/40': isCurrentPlaying(song.id)
                                }"
                                class="hover:bg-muted/80 group cursor-pointer"
                                @mouseenter="handleMouseEnter(index)"
                                @mouseleave="handleMouseLeave"
                                @dblclick="playSong(song)">
                                <TableCell class="font-medium">
                                    <div
                                        class="flex items-center justify-center w-6 h-6 relative">
                                        <span
                                            v-show="
                                                !isHovering(index) &&
                                                !isCurrentPlaying(song.id)
                                            ">
                                            {{ song.track || index + 1 }}
                                        </span>
                                        <Button
                                            v-show="
                                                isHovering(index) &&
                                                !isCurrentPlaying(song.id)
                                            "
                                            variant="ghost"
                                            size="icon"
                                            class="h-6 w-6 p-0"
                                            @click.stop="playSong(song)">
                                            <Play class="h-3.5 w-3.5" />
                                        </Button>
                                        <Music4
                                            v-if="isCurrentPlaying(song.id)"
                                            class="h-4 w-4 text-primary animate-pulse" />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div class="flex flex-col">
                                        <span
                                            class="truncate max-w-[300px]"
                                            :class="{
                                                'text-primary':
                                                    isCurrentPlaying(song.id)
                                            }">
                                            {{ song.title }}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell class="hidden md:table-cell">
                                    {{ song.artist }}
                                </TableCell>
                                <TableCell
                                    class="hidden md:table-cell text-muted-foreground">
                                    {{ formatDuration(song.duration) }}
                                </TableCell>
                                <TableCell>
                                    <div
                                        class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        class="h-7 w-7"
                                                        @click.stop="
                                                            addSongToQueue(song)
                                                        ">
                                                        <ListPlus
                                                            class="h-3.5 w-3.5" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>添加到播放队列</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        class="h-7 w-7"
                                                        @click.stop="
                                                            toggleFavoriteSong(
                                                                song
                                                            )
                                                        ">
                                                        <Heart
                                                            class="h-3.5 w-3.5"
                                                            :class="{
                                                                'fill-red-500 text-red-500':
                                                                    song.isFavorite
                                                            }" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>
                                                        {{
                                                            song.isFavorite
                                                                ? '取消收藏'
                                                                : '收藏'
                                                        }}
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    class="h-7 w-7">
                                                    <MoreHorizontal
                                                        class="h-3.5 w-3.5" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem
                                                    @click="downloadSong(song)">
                                                    <Download
                                                        class="h-4 w-4 mr-2" />
                                                    下载
                                                </DropdownMenuItem>
                                                <RouterLink
                                                    :to="{
                                                        path: '/artist',
                                                        query: {
                                                            id: song.artistId
                                                        }
                                                    }">
                                                    <DropdownMenuItem>
                                                        <User
                                                            class="h-4 w-4 mr-2" />
                                                        查看艺术家
                                                    </DropdownMenuItem>
                                                </RouterLink>
                                                <DropdownMenuItem
                                                    @click="
                                                        addToPlaylist(song)
                                                    ">
                                                    <ListMusic
                                                        class="h-4 w-4 mr-2" />
                                                    添加到播放列表
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    @click="shareSong(song)">
                                                    <Share
                                                        class="h-4 w-4 mr-2" />
                                                    分享
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    @click="showSongInfo(song)">
                                                    <Info
                                                        class="h-4 w-4 mr-2" />
                                                    歌曲信息
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePlayerStore } from '@/stores/player'
import { shuffle as shuffleArray } from '@/utils/shuffle'

import {
    Play,
    Shuffle,
    ListPlus,
    Heart,
    MoreHorizontal,
    Music4,
    Loader2,
    AlertCircle,
    ChevronLeft,
    Download,
    User,
    ListMusic,
    Share,
    Info,
    Pencil
} from 'lucide-vue-next'

interface Song {
    id: string
    title: string
    artist: string
    artistId: string
    track?: number
    duration: number
    cover: string
    isFavorite?: boolean
    popularity?: number
}

interface Album {
    id: string
    name: string
    artist: string
    artistId: string
    cover: string
    year?: number
    duration: number
    genre?: string
    description?: string
    songs?: Song[]
    isFavorite?: boolean
}

const playerStore = usePlayerStore()
const route = useRoute()
const router = useRouter()

// 状态
const album = ref<Album | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)
const sortOrder = ref('track')
const hoveringIndex = ref(-1)

// 获取专辑数据
const fetchAlbumData = async () => {
    isLoading.value = true
    error.value = null

    try {
        // 获取URL中的专辑ID参数
        const albumId = route.query.id
        if (!albumId) {
            throw new Error('未提供专辑ID')
        }

        // 这里应该调用API获取专辑详情
        // 在实际实现中替换为真实API调用

        // 生成假数据
        // 专辑类型和风格
        const genres = ['流行', '摇滚', '爵士', '独立', '电子', '古典', '民谣']

        // 随机选择专辑风格
        const randomGenre = genres[Math.floor(Math.random() * genres.length)]

        // 随机生成专辑名
        const albumNames = [
            '午后时光',
            '星空之下',
            '城市霓虹',
            '远方旅途',
            '心灵独白',
            '冬日温暖',
            '夏日微风',
            '秋叶私语',
            '春天的故事',
            '午夜梦境'
        ]
        const randomAlbumName =
            albumNames[Math.floor(Math.random() * albumNames.length)]

        // 随机生成艺术家名
        const artistNames = [
            '陌路人',
            '星辰乐队',
            '流行幻象',
            '独立艺人',
            '电子先锋',
            '古典乐团',
            '民谣诗人',
            '爵士四重奏',
            '摇滚先锋',
            '说唱歌手'
        ]
        const randomArtist =
            artistNames[Math.floor(Math.random() * artistNames.length)]

        // 生成歌曲列表
        const generateSongs = (count: number): Song[] => {
            const songTitles = [
                '遥远的旅途',
                '城市之光',
                '星空夜曲',
                '心灵独奏',
                '午后时光',
                '雨后彩虹',
                '春天的故事',
                '冬日温暖',
                '夏日微风',
                '秋叶私语',
                '山间小路',
                '海边漫步',
                '花开花落',
                '云端漫步',
                '河流之声',
                '森林之梦',
                '草原之歌',
                '湖泊之光',
                '沙漠之舞',
                '雪地足迹'
            ]

            const songs: Song[] = []
            for (let i = 0; i < count; i++) {
                const randomTitle =
                    songTitles[Math.floor(Math.random() * songTitles.length)]
                const songName = `${randomTitle} - ${i + 1}`
                songs.push({
                    id: `song-${albumId}-${i}`,
                    title: songName,
                    artist: randomArtist,
                    artistId: `artist-${albumId}`,
                    track: i + 1,
                    duration: Math.floor(Math.random() * 180) + 120, // 2-5分钟
                    cover: `https://picsum.photos/seed/${albumId}-${i}/500/500`,
                    isFavorite: Math.random() > 0.8,
                    popularity: Math.floor(Math.random() * 100)
                })
            }
            return songs
        }

        // 构建专辑数据
        album.value = {
            id: albumId as string,
            name: randomAlbumName,
            artist: randomArtist,
            artistId: `artist-${albumId}`,
            cover: `https://picsum.photos/seed/${albumId}/500/500`,
            year: Math.floor(Math.random() * 10) + 2015, // 2015-2025年
            duration: 0, // 会在下面计算
            genre: randomGenre,
            description: `这是一张充满${randomGenre}风格的专辑，由${randomArtist}精心创作，于${Math.floor(Math.random() * 10) + 2015}年发行。专辑收录了${Math.floor(Math.random() * 8) + 8}首动人心弦的歌曲，每一首都讲述着不同的故事。整张专辑的创作灵感来源于艺术家的真实生活体验和深刻感悟，无论是旋律编排还是歌词创作都展现了艺术家独特的音乐才华和审美风格。在这张专辑中，艺术家尝试融合了多种元素，打造出既有${randomGenre}特色又不失个人风格的音乐作品，带给听众沉浸式的音乐体验。`,
            isFavorite: Math.random() > 0.5,
            songs: generateSongs(Math.floor(Math.random() * 8) + 8) // 8-15首歌
        }

        // 计算专辑总时长
        if (album.value.songs) {
            album.value.duration = album.value.songs.reduce(
                (total, song) => total + song.duration,
                0
            )
        }
    } catch (err: any) {
        console.error('获取专辑数据失败:', err)
        error.value = err.message || '加载失败'
    } finally {
        isLoading.value = false
    }
}

// 排序后的歌曲
const sortedSongs = computed(() => {
    if (!album.value || !album.value.songs) return []

    const songs = [...album.value.songs]
    if (sortOrder.value === 'name') {
        return songs.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortOrder.value === 'duration') {
        return songs.sort((a, b) => a.duration - b.duration)
    } else if (sortOrder.value === 'popularity') {
        return songs.sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
    } else {
        return songs.sort((a, b) => (a.track || 0) - (b.track || 0))
    }
})

// 格式化时间
const formatDuration = (seconds: number): string => {
    if (!seconds) return '00:00'

    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)

    if (hours > 0) {
        return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    } else {
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }
}

// 格式化评论日期

// 返回专辑列表
const goBackToList = () => {
    router.push({ path: '/album' })
}

// 播放整个专辑
const playAlbum = () => {
    if (!album.value || !album.value.songs || album.value.songs.length === 0)
        return

    // 设置播放队列
    playerStore.setPlayQueue(album.value.songs)
    playerStore.loadSong(album.value.songs[0])
    playerStore.play()
}

// 随机播放
const shufflePlay = () => {
    if (!album.value || !album.value.songs || album.value.songs.length === 0)
        return

    const shuffledSongs = shuffleArray([...album.value.songs])
    playerStore.setPlayQueue(shuffledSongs)
    playerStore.loadSong(shuffledSongs[0])
    playerStore.play()
}

// 添加到队列
const addToQueue = () => {
    if (!album.value || !album.value.songs || album.value.songs.length === 0)
        return

    // 添加歌曲到播放队列
    playerStore.setPlayQueue([...playerStore.playQueue, ...album.value.songs])
}

// 播放单曲
const playSong = (song: Song) => {
    playerStore.setPlayQueue([song])
    playerStore.loadSong(song)
    playerStore.play()
}

// 添加单曲到队列
const addSongToQueue = (song: Song) => {
    playerStore.setPlayQueue([...playerStore.playQueue, song])
}

// 切换专辑收藏状态
const toggleFavoriteAlbum = () => {
    if (!album.value) return

    album.value.isFavorite = !album.value.isFavorite
    console.log(
        `${album.value.isFavorite ? '收藏' : '取消收藏'}专辑: ${album.value.name}`
    )
}

// 切换歌曲收藏状态
const toggleFavoriteSong = (song: Song) => {
    song.isFavorite = !song.isFavorite
    console.log(`${song.isFavorite ? '收藏' : '取消收藏'}歌曲: ${song.title}`)
}

// 下载歌曲
const downloadSong = (song: Song) => {
    console.log('下载歌曲:', song.title)
    // 实际项目中实现下载功能
}

// 下载专辑
const downloadAlbum = () => {
    if (!album.value) return
    console.log('下载专辑:', album.value.name)
    // 实际项目中实现下载功能
}

// 分享专辑
const shareAlbum = () => {
    if (!album.value) return
    console.log('分享专辑:', album.value.name)
    // 实际项目中实现分享功能
}

// 分享歌曲
const shareSong = (song: Song) => {
    console.log('分享歌曲:', song.title)
    // 实际项目中实现分享功能
}

// 编辑专辑信息
const editAlbumInfo = () => {
    if (!album.value) return
    console.log('编辑专辑信息:', album.value.name)
    // 实际项目中实现编辑功能
}

// 显示歌曲信息
const showSongInfo = (song: Song) => {
    console.log('显示歌曲信息:', song.title)
    // 实际项目中实现显示歌曲详情功能
}

// 添加到播放列表
const addToPlaylist = (song: Song) => {
    console.log('添加到播放列表:', song.title)
    // 实际项目中实现添加到播放列表功能
}

// 检查当前播放的歌曲
const isCurrentPlaying = (songId: string): boolean => {
    return (
        playerStore.currentSongInfo &&
        playerStore.currentSongInfo.id === songId &&
        playerStore.isPlaying
    )
}

// 处理鼠标悬停
const isHovering = (index: number): boolean => {
    return hoveringIndex.value === index
}

// 监听鼠标事件
const handleMouseEnter = (index: number) => {
    hoveringIndex.value = index
}

const handleMouseLeave = () => {
    hoveringIndex.value = -1
}

onMounted(() => {
    fetchAlbumData()
})
</script>

<style scoped>
/* 自定义样式 */
.group:hover .opacity-0 {
    opacity: 1;
}
</style>
