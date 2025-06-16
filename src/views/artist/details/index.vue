<template>
    <div class="w-full h-full p-4 overflow-y-auto overflow-x-hidden">
        <!-- 加载状态 -->
        <div
            v-if="isLoading"
            class="flex flex-col items-center justify-center h-full">
            <div class="space-y-4 text-center">
                <Loader2 class="h-8 w-8 animate-spin mx-auto" />
                <p class="text-muted-foreground">正在加载艺术家信息...</p>
            </div>
        </div>

        <!-- 错误状态 -->
        <div
            v-else-if="error"
            class="flex flex-col items-center justify-center h-full">
            <div class="space-y-4 text-center">
                <AlertCircle class="h-8 w-8 text-destructive mx-auto" />
                <p class="text-muted-foreground">加载失败: {{ error }}</p>
                <Button @click="fetchArtistDetails">重试</Button>
                <Button variant="outline" @click="goBack">返回</Button>
            </div>
        </div>

        <!-- 内容区域 -->
        <div v-else class="w-full max-w-full flex flex-col gap-6">
            <!-- 返回按钮 -->
            <div>
                <Button variant="ghost" size="sm" class="gap-1" @click="goBack">
                    <ChevronLeft class="h-4 w-4" />
                    返回艺术家列表
                </Button>
            </div>

            <!-- 艺术家头部信息 -->
            <section
                class="flex flex-col md:flex-row gap-8 items-center md:items-start">
                <!-- 艺术家图像 -->
                <div
                    class="w-48 h-48 rounded-full overflow-hidden shadow-lg flex-shrink-0">
                    <img
                        :src="artistDetails.image || '/placeholder-artist.jpg'"
                        :alt="artistDetails.name"
                        class="w-full h-full object-cover" />
                </div>

                <!-- 艺术家信息 -->
                <div
                    class="flex flex-col items-center md:items-start md:justify-end gap-4 flex-grow">
                    <div class="text-center md:text-left">
                        <h1 class="text-4xl font-bold mb-2">
                            {{ artistDetails.name }}
                        </h1>
                        <div
                            class="flex flex-wrap gap-2 items-center justify-center md:justify-start text-muted-foreground">
                            <span class="flex items-center">
                                <Music class="h-4 w-4 mr-1" />
                                {{ artistDetails.songCount }} 首歌曲
                            </span>
                            <span class="flex items-center">
                                <Disc class="h-4 w-4 mr-1" />
                                {{ artistDetails.albumCount }} 张专辑
                            </span>
                            <span
                                v-if="artistDetails.genre"
                                class="flex items-center">
                                <Tag class="h-4 w-4 mr-1" />
                                {{ artistDetails.genre }}
                            </span>
                        </div>
                    </div>

                    <!-- 控制按钮 -->
                    <div class="flex gap-2">
                        <Button class="gap-2" @click="playAllSongs">
                            <Play class="h-4 w-4" />
                            播放全部
                        </Button>
                        <Button
                            variant="outline"
                            class="gap-2"
                            @click="shufflePlay">
                            <Shuffle class="h-4 w-4" />
                            随机播放
                        </Button>
                        <Button variant="outline" size="icon">
                            <Heart
                                class="h-4 w-4"
                                :class="{
                                    'fill-red-500 text-red-500': isFavorite
                                }" />
                        </Button>
                        <Button variant="outline" size="icon">
                            <MoreHorizontal class="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </section>

            <!-- 分类标签 -->
            <section class="flex border-b">
                <Button
                    variant="ghost"
                    :class="{
                        'border-b-2 border-primary': activeTab === 'songs'
                    }"
                    @click="activeTab = 'songs'">
                    歌曲
                </Button>
                <Button
                    variant="ghost"
                    :class="{
                        'border-b-2 border-primary': activeTab === 'albums'
                    }"
                    @click="activeTab = 'albums'">
                    专辑
                </Button>
                <Button
                    variant="ghost"
                    :class="{
                        'border-b-2 border-primary': activeTab === 'similar'
                    }"
                    @click="activeTab = 'similar'">
                    相似艺术家
                </Button>
                <Button
                    variant="ghost"
                    :class="{
                        'border-b-2 border-primary': activeTab === 'about'
                    }"
                    @click="activeTab = 'about'">
                    关于
                </Button>
            </section>

            <!-- 歌曲列表 -->
            <section v-if="activeTab === 'songs'">
                <div class="flex flex-wrap gap-4 mb-4">
                    <div class="flex items-center space-x-2">
                        <Search class="h-4 w-4 text-muted-foreground" />
                        <Input
                            v-model="songSearchQuery"
                            placeholder="搜索歌曲..."
                            class="w-[200px] md:w-[300px]" />
                    </div>

                    <Select v-model="songSortBy">
                        <SelectTrigger class="w-[150px]">
                            <SelectValue placeholder="排序方式" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="popular">按热度</SelectItem>
                            <SelectItem value="az">按名称</SelectItem>
                            <SelectItem value="newest">最新添加</SelectItem>
                            <SelectItem value="album">按专辑</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <!-- 歌曲表格 -->
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead class="w-[60px]">#</TableHead>
                            <TableHead>标题</TableHead>
                            <TableHead>专辑</TableHead>
                            <TableHead class="w-[100px]">时长</TableHead>
                            <TableHead class="w-[100px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow
                            v-for="(song, index) in filteredSongs"
                            :key="song.id"
                            class="hover:bg-muted/80 cursor-pointer"
                            @click="playSong(song)">
                            <TableCell>{{ index + 1 }}</TableCell>
                            <TableCell>
                                <div class="flex items-center gap-3">
                                    <img
                                        :src="
                                            song.cover ||
                                            artistDetails.image ||
                                            '/placeholder-album.jpg'
                                        "
                                        :alt="song.title"
                                        class="h-10 w-10 rounded-md object-cover" />
                                    <div class="flex flex-col">
                                        <span class="font-medium">
                                            {{ song.title }}
                                        </span>
                                        <span
                                            v-if="song.featuring"
                                            class="text-xs text-muted-foreground">
                                            feat. {{ song.featuring }}
                                        </span>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>{{ song.album }}</TableCell>
                            <TableCell>
                                {{ formatDuration(song.duration) }}
                            </TableCell>
                            <TableCell>
                                <div
                                    class="flex items-center justify-end gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        class="h-8 w-8"
                                        @click.stop="playSong(song)">
                                        <Play class="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        class="h-8 w-8"
                                        @click.stop="toggleFavoriteSong(song)">
                                        <Heart
                                            class="h-4 w-4"
                                            :class="{
                                                'fill-red-500 text-red-500':
                                                    song.isFavorite
                                            }" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        class="h-8 w-8"
                                        @click.stop="showSongMenu(song)">
                                        <MoreHorizontal class="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <!-- 无歌曲时显示 -->
                <div
                    v-if="
                        artistDetails.songs && artistDetails.songs.length === 0
                    "
                    class="flex flex-col items-center justify-center py-12">
                    <Music3 class="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 class="text-lg font-medium mb-1">没有找到歌曲</h3>
                    <p class="text-muted-foreground text-center max-w-md">
                        该艺术家暂无可播放的歌曲
                    </p>
                </div>
            </section>

            <!-- 专辑列表 -->
            <section v-else-if="activeTab === 'albums'">
                <div
                    class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                    <div
                        v-for="album in artistDetails.albums"
                        :key="album.id"
                        class="flex flex-col gap-2 group cursor-pointer"
                        @click="navigateToAlbumDetails(album.id)">
                        <div
                            class="relative aspect-square overflow-hidden rounded-lg">
                            <img
                                :src="album.cover || '/placeholder-album.jpg'"
                                :alt="album.name"
                                class="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-300" />
                            <div
                                class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    class="rounded-full bg-primary/90 text-primary-foreground h-10 w-10"
                                    @click.stop="playAlbum(album)">
                                    <Play class="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                        <div class="space-y-1 px-1">
                            <p
                                class="font-medium truncate group-hover:text-primary transition-colors duration-200">
                                {{ album.name }}
                            </p>
                            <div
                                class="flex items-center text-xs text-muted-foreground">
                                <span>{{ album.year || '未知年份' }}</span>
                                <span class="mx-1.5">•</span>
                                <span>{{ album.songCount }}首</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 无专辑时显示 -->
                <div
                    v-if="
                        artistDetails.albums &&
                        artistDetails.albums.length === 0
                    "
                    class="flex flex-col items-center justify-center py-12">
                    <Disc class="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 class="text-lg font-medium mb-1">没有找到专辑</h3>
                    <p class="text-muted-foreground text-center max-w-md">
                        该艺术家暂无可浏览的专辑
                    </p>
                </div>
            </section>

            <!-- 相似艺术家 -->
            <section v-else-if="activeTab === 'similar'">
                <div
                    class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    <div
                        v-for="similar in artistDetails.similarArtists"
                        :key="similar.id"
                        class="flex flex-col gap-3 group cursor-pointer"
                        @click="navigateToArtistDetails(similar.id)">
                        <div
                            class="relative aspect-square overflow-hidden rounded-full">
                            <img
                                :src="
                                    similar.image || '/placeholder-artist.jpg'
                                "
                                :alt="similar.name"
                                class="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-300" />
                        </div>
                        <div class="space-y-1 text-center">
                            <h3 class="font-medium line-clamp-1">
                                {{ similar.name }}
                            </h3>
                        </div>
                    </div>
                </div>

                <!-- 无相似艺术家时显示 -->
                <div
                    v-if="
                        artistDetails.similarArtists &&
                        artistDetails.similarArtists.length === 0
                    "
                    class="flex flex-col items-center justify-center py-12">
                    <Users class="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 class="text-lg font-medium mb-1">没有相似艺术家</h3>
                    <p class="text-muted-foreground text-center max-w-md">
                        暂无可推荐的相似艺术家
                    </p>
                </div>
            </section>

            <!-- 关于艺术家 -->
            <section v-else-if="activeTab === 'about'">
                <div class="prose max-w-none dark:prose-invert">
                    <p
                        v-if="artistDetails.biography"
                        class="whitespace-pre-line">
                        {{ artistDetails.biography }}
                    </p>
                    <div
                        v-else
                        class="flex flex-col items-center justify-center py-12 text-center">
                        <FileText
                            class="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 class="text-lg font-medium mb-1">暂无艺术家信息</h3>
                        <p class="text-muted-foreground max-w-md">
                            没有找到关于该艺术家的详细介绍
                        </p>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePlayerStore } from '@/stores/player'
import subsonicApi from '@/api/subsonic'
import {
    Loader2,
    AlertCircle,
    ChevronLeft,
    Play,
    Shuffle,
    Heart,
    MoreHorizontal,
    Music,
    Disc,
    Tag,
    Search,
    Music3,
    Users,
    FileText
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'

interface Song {
    id: string
    title: string
    artist: string
    album: string
    albumId: string
    duration: number
    cover?: string
    featuring?: string
    isFavorite?: boolean
    year?: number
}

interface Album {
    id: string
    name: string
    cover?: string
    year?: number
    songCount: number
    duration?: number
}

interface SimilarArtist {
    id: string
    name: string
    image?: string
}

interface ArtistDetails {
    id: string
    name: string
    image?: string
    albumCount: number
    songCount: number
    genre?: string
    biography?: string
    songs: Song[]
    albums: Album[]
    similarArtists: SimilarArtist[]
}

const route = useRoute()
const router = useRouter()
const playerStore = usePlayerStore()
const artistId = computed(() => route.params.id as string)

// 状态管理
const isLoading = ref(true)
const error = ref<string | null>(null)
const artistDetails = ref<ArtistDetails>({
    id: '',
    name: '',
    albumCount: 0,
    songCount: 0,
    songs: [],
    albums: [],
    similarArtists: []
})
const activeTab = ref('songs')
const songSearchQuery = ref('')
const songSortBy = ref('popular')
const isFavorite = ref(false)

// 获取艺术家详情
const fetchArtistDetails = async () => {
    isLoading.value = true
    error.value = null

    try {
        // 实际开发中应使用真实API获取艺术家详情
        // 这里使用模拟数据
        if (!artistId.value) {
            throw new Error('未提供艺术家ID')
        }

        // 模拟API请求延迟
        await new Promise((resolve) => setTimeout(resolve, 500))

        // 生成模拟数据
        artistDetails.value = generateMockArtistDetails(artistId.value)
    } catch (err: any) {
        error.value = err.message || '未知错误'
        console.error('获取艺术家详情失败:', err)
    } finally {
        isLoading.value = false
    }
}

// 生成模拟艺术家详情数据
const generateMockArtistDetails = (id: string): ArtistDetails => {
    const artistNumber = parseInt(id.split('-')[1])
    const genres = ['流行', '摇滚', '爵士', '独立', '电子', '古典', '民谣']
    const genreIndex = artistNumber % genres.length
    const albumCount = Math.floor(Math.random() * 6) + 2
    const albums: Album[] = []
    const songs: Song[] = []
    const similarArtists: SimilarArtist[] = []

    // 生成专辑
    for (let i = 1; i <= albumCount; i++) {
        const albumId = `album-${id}-${i}`
        const songCount = Math.floor(Math.random() * 8) + 6
        const year = 2010 + Math.floor(Math.random() * 13)

        albums.push({
            id: albumId,
            name: `${genres[genreIndex]}专辑 ${i}`,
            cover: `https://picsum.photos/seed/${albumId}/300/300`,
            year: year,
            songCount: songCount
        })

        // 为每张专辑生成歌曲
        for (let j = 1; j <= songCount; j++) {
            songs.push({
                id: `song-${albumId}-${j}`,
                title: `歌曲 ${j}`,
                artist: `艺术家 ${artistNumber}`,
                album: `${genres[genreIndex]}专辑 ${i}`,
                albumId: albumId,
                duration: Math.floor(Math.random() * 180) + 120,
                cover: `https://picsum.photos/seed/${albumId}/300/300`,
                year: year,
                isFavorite: Math.random() > 0.8
            })
        }
    }

    // 生成相似艺术家
    const similarCount = Math.floor(Math.random() * 6) + 3
    for (let i = 1; i <= similarCount; i++) {
        const similarId = `artist-${((artistNumber + i) % 40) + 1}`
        similarArtists.push({
            id: similarId,
            name: `相似艺术家 ${((artistNumber + i) % 40) + 1}`,
            image: `https://picsum.photos/seed/${similarId}/300/300`
        })
    }

    // 随机添加一些歌曲的特性以增加多样性
    songs.forEach((song, index) => {
        if (index % 5 === 0) {
            song.featuring = `特邀艺术家 ${Math.floor(Math.random() * 20) + 1}`
        }
    })

    return {
        id: id,
        name: `艺术家 ${artistNumber}`,
        image: `https://picsum.photos/seed/${id}/300/300`,
        albumCount: albumCount,
        songCount: songs.length,
        genre: genres[genreIndex],
        biography:
            artistNumber % 3 === 0
                ? generateMockBiography(artistNumber, genres[genreIndex])
                : undefined,
        songs: songs,
        albums: albums,
        similarArtists: similarArtists
    }
}

// 生成模拟艺术家介绍
const generateMockBiography = (artistNumber: number, genre: string): string => {
    return `艺术家${artistNumber}是一位知名的${genre}音乐人，出生于20世纪80年代末。他/她从小受到音乐的熏陶，在十几岁时开始创作自己的音乐作品。

2010年，艺术家${artistNumber}发行了首张专辑，获得了业内广泛的认可和赞誉。随后的几年里，他/她不断探索新的音乐风格和创作方式，成功发行了多张风格各异的专辑。

作为${genre}领域的代表人物之一，艺术家${artistNumber}以其独特的声音和富有感染力的表演而闻名。他/她的音乐融合了多种元素，创造出独特而令人难忘的音乐体验。

艺术家${artistNumber}曾获得多项音乐大奖，并在世界各地举办过无数场演唱会，拥有庞大而忠实的粉丝群体。`
}

// 歌曲排序和筛选
const filteredSongs = computed(() => {
    let result = [...artistDetails.value.songs]

    // 搜索过滤
    if (songSearchQuery.value) {
        const query = songSearchQuery.value.toLowerCase()
        result = result.filter(
            (song) =>
                song.title.toLowerCase().includes(query) ||
                song.album.toLowerCase().includes(query) ||
                (song.featuring && song.featuring.toLowerCase().includes(query))
        )
    }

    // 排序
    result.sort((a, b) => {
        switch (songSortBy.value) {
            case 'az':
                return a.title.localeCompare(b.title)
            case 'newest':
                return (b.year || 0) - (a.year || 0)
            case 'album':
                return a.album.localeCompare(b.album)
            case 'popular':
            default:
                // 这里默认按流行度排序，实际应该有播放次数等指标
                return 0
        }
    })

    return result
})

// 格式化时长
const formatDuration = (seconds: number): string => {
    if (!seconds) return '00:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
}

// 播放歌曲
const playSong = (song: Song) => {
    console.log(`播放歌曲: ${song.title}`)
    // 实际开发中调用playerStore的播放方法
    // playerStore.playSong(song.id)
}

// 播放全部歌曲
const playAllSongs = () => {
    console.log('播放全部歌曲')
    // 实际开发中调用playerStore的播放方法
    // playerStore.playTracks(artistDetails.value.songs.map(song => song.id))
}

// 随机播放
const shufflePlay = () => {
    console.log('随机播放歌曲')
    // 实际开发中调用playerStore的随机播放方法
    // playerStore.shufflePlayTracks(artistDetails.value.songs.map(song => song.id))
}

// 收藏/取消收藏歌曲
const toggleFavoriteSong = (song: Song) => {
    song.isFavorite = !song.isFavorite
    console.log(`${song.isFavorite ? '收藏' : '取消收藏'}歌曲: ${song.title}`)
}

// 显示歌曲菜单
const showSongMenu = (song: Song) => {
    console.log(`显示歌曲菜单: ${song.title}`)
}

// 播放专辑
const playAlbum = (album: Album) => {
    console.log(`播放专辑: ${album.name}`)
    // 实际开发中调用playerStore的播放方法
    // playerStore.playAlbum(album.id)
}

// 导航到专辑详情
const navigateToAlbumDetails = (albumId: string) => {
    router.push(`/album/details?id=${albumId}`)
}

// 导航到艺术家详情
const navigateToArtistDetails = (id: string) => {
    router.push(`/artist/${id}`)
}

// 返回上一页
const goBack = () => {
    router.back()
}

// 监听路由参数变化，重新获取艺术家详情
watch(
    () => route.params.id,
    (newId) => {
        if (newId) {
            fetchArtistDetails()
        }
    }
)

// 页面加载时获取艺术家详情
onMounted(() => {
    fetchArtistDetails()
})
</script>
