<template>
    <div class="w-full h-full p-4 overflow-y-auto overflow-x-hidden">
        <!-- 加载状态 -->
        <div
            v-if="isLoading"
            class="flex flex-col items-center justify-center h-full">
            <div class="space-y-4 text-center">
                <Loader2 class="h-8 w-8 animate-spin mx-auto" />
                <p class="text-muted-foreground">正在加载专辑列表...</p>
            </div>
        </div>

        <!-- 错误状态 -->
        <div
            v-else-if="error"
            class="flex flex-col items-center justify-center h-full">
            <div class="space-y-4 text-center">
                <AlertCircle class="h-8 w-8 text-destructive mx-auto" />
                <p class="text-muted-foreground">加载失败: {{ error }}</p>
                <Button @click="fetchAlbums">重试</Button>
            </div>
        </div>

        <!-- 内容区域 -->
        <div v-else class="w-full max-w-full flex flex-col gap-8">
            <!-- 页面标题区域 -->
            <section>
                <div class="flex items-center justify-between mb-2">
                    <h1 class="text-3xl font-bold tracking-tight">
                        我的专辑收藏
                    </h1>
                    <Button
                        variant="outline"
                        size="sm"
                        class="gap-1"
                        @click="fetchAlbums">
                        <RefreshCcw class="h-4 w-4" />
                        刷新
                    </Button>
                </div>
                <p class="text-muted-foreground">浏览和发现您收藏的所有专辑</p>
            </section>

            <!-- 筛选和排序区域 -->
            <section class="flex flex-wrap gap-4">
                <div class="flex items-center space-x-2">
                    <Search class="h-4 w-4 text-muted-foreground" />
                    <Input
                        v-model="searchQuery"
                        placeholder="搜索专辑或艺术家..."
                        class="w-[200px] md:w-[300px]" />
                </div>

                <Select v-model="filterGenre">
                    <SelectTrigger class="w-[150px]">
                        <SelectValue placeholder="选择风格" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">全部风格</SelectItem>
                        <SelectItem value="pop">流行</SelectItem>
                        <SelectItem value="rock">摇滚</SelectItem>
                        <SelectItem value="jazz">爵士</SelectItem>
                        <SelectItem value="indie">独立</SelectItem>
                        <SelectItem value="electronic">电子</SelectItem>
                        <SelectItem value="classical">古典</SelectItem>
                        <SelectItem value="folk">民谣</SelectItem>
                    </SelectContent>
                </Select>

                <Select v-model="sortBy">
                    <SelectTrigger class="w-[150px]">
                        <SelectValue placeholder="排序方式" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="newest">最新添加</SelectItem>
                        <SelectItem value="oldest">最早添加</SelectItem>
                        <SelectItem value="name">名称</SelectItem>
                        <SelectItem value="artist">艺术家</SelectItem>
                        <SelectItem value="year">发行年份</SelectItem>
                    </SelectContent>
                </Select>

                <div class="ml-auto flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        :class="{ 'text-primary': viewMode === 'grid' }"
                        @click="viewMode = 'grid'">
                        <Grid class="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        :class="{ 'text-primary': viewMode === 'list' }"
                        @click="viewMode = 'list'">
                        <List class="h-4 w-4" />
                    </Button>
                </div>
            </section>

            <!-- 专辑分类展示 -->
            <section v-if="displayedAlbums.length > 0">
                <!-- 网格视图 -->
                <div
                    v-if="viewMode === 'grid'"
                    class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                    <div
                        v-for="album in displayedAlbums"
                        :key="album.id"
                        class="flex flex-col gap-2 group cursor-pointer"
                        @click="navigateToAlbumDetails(album.id)">
                        <div
                            class="relative aspect-square overflow-hidden rounded-lg">
                            <img
                                :src="album.cover"
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
                            <p class="text-sm text-muted-foreground truncate">
                                {{ album.artist }}
                            </p>
                            <div
                                class="flex items-center text-xs text-muted-foreground">
                                <span>{{ album.year || '未知年份' }}</span>
                                <span class="mx-1.5">•</span>
                                <span>{{ album.genre }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 列表视图 -->
                <div v-else-if="viewMode === 'list'" class="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead class="w-[300px]">专辑</TableHead>
                                <TableHead>艺术家</TableHead>
                                <TableHead>发行年份</TableHead>
                                <TableHead>风格</TableHead>
                                <TableHead>歌曲数</TableHead>
                                <TableHead>时长</TableHead>
                                <TableHead class="w-[100px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow
                                v-for="album in displayedAlbums"
                                :key="album.id"
                                class="hover:bg-muted/80 cursor-pointer"
                                @click="navigateToAlbumDetails(album.id)">
                                <TableCell>
                                    <div class="flex items-center gap-3">
                                        <img
                                            :src="album.cover"
                                            :alt="album.name"
                                            class="h-10 w-10 rounded-md object-cover" />
                                        <span class="font-medium">
                                            {{ album.name }}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>{{ album.artist }}</TableCell>
                                <TableCell>
                                    {{ album.year || '未知' }}
                                </TableCell>
                                <TableCell>{{ album.genre }}</TableCell>
                                <TableCell>
                                    {{ album.songCount || '未知' }}
                                </TableCell>
                                <TableCell>
                                    {{ formatDuration(album.duration) }}
                                </TableCell>
                                <TableCell>
                                    <div
                                        class="flex items-center justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            class="h-8 w-8"
                                            @click.stop="playAlbum(album)">
                                            <Play class="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            class="h-8 w-8"
                                            @click.stop="toggleFavorite(album)">
                                            <Heart
                                                class="h-4 w-4"
                                                :class="{
                                                    'fill-red-500 text-red-500':
                                                        album.isFavorite
                                                }" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            class="h-8 w-8">
                                            <MoreHorizontal class="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </section>

            <!-- 无结果提示 -->
            <section
                v-else
                class="flex flex-col items-center justify-center py-16 text-center">
                <Music3
                    class="h-12 w-12 text-muted-foreground opacity-50 mb-4" />
                <h3 class="text-lg font-medium mb-1">未找到专辑</h3>
                <p class="text-muted-foreground max-w-md">
                    没有找到符合您筛选条件的专辑。请尝试调整搜索条件或者重置筛选器。
                </p>
                <Button variant="outline" class="mt-4" @click="resetFilters">
                    重置筛选器
                </Button>
            </section>

            <!-- 分页 -->
            <section v-if="totalPages > 1" class="flex justify-center">
                <div class="flex items-center gap-1">
                    <Button
                        variant="outline"
                        size="icon"
                        :disabled="currentPage === 1"
                        @click="currentPage = Math.max(1, currentPage - 1)">
                        <ChevronLeft class="h-4 w-4" />
                    </Button>
                    <Button
                        v-for="page in paginationArray"
                        :key="page"
                        variant="outline"
                        :class="{
                            'bg-primary text-primary-foreground':
                                page === currentPage
                        }"
                        size="icon"
                        @click="currentPage = page">
                        {{ page }}
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        :disabled="currentPage === totalPages"
                        @click="
                            currentPage = Math.min(totalPages, currentPage + 1)
                        ">
                        <ChevronRight class="h-4 w-4" />
                    </Button>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { usePlayerStore } from '@/stores/player'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Play,
    Heart,
    MoreHorizontal,
    Loader2,
    AlertCircle,
    RefreshCcw,
    Search,
    Grid,
    List,
    Music3,
    ChevronLeft,
    ChevronRight
} from 'lucide-vue-next'

interface Song {
    id: string
    title: string
    artist: string
    artistId: string
    track?: number
    duration: number
    cover: string
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
    songCount?: number
    description?: string
    isFavorite?: boolean
    songs?: Song[]
}

const playerStore = usePlayerStore()
const router = useRouter()

// 状态
const albums = ref<Album[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)
const searchQuery = ref('')
const filterGenre = ref('all')
const sortBy = ref('newest')
const viewMode = ref<'grid' | 'list'>('grid')
const currentPage = ref(1)
const itemsPerPage = ref(24) // 每页显示的专辑数量

// 生成所有专辑数据
const fetchAlbums = async () => {
    isLoading.value = true
    error.value = null

    try {
        // 这里应该调用API获取专辑列表
        // 在实际项目中替换为真实API调用

        // 生成更多模拟专辑数据
        const generateAlbums = () => {
            // 专辑类型和风格
            const genres = [
                { key: 'pop', name: '流行' },
                { key: 'rock', name: '摇滚' },
                { key: 'jazz', name: '爵士' },
                { key: 'indie', name: '独立' },
                { key: 'electronic', name: '电子' },
                { key: 'classical', name: '古典' },
                { key: 'folk', name: '民谣' }
            ]

            // 艺术家名称
            const artists = [
                { id: 'artist-1', name: '流行之声' },
                { id: 'artist-2', name: '摇滚乐队' },
                { id: 'artist-3', name: '爵士四重奏' },
                { id: 'artist-4', name: '独立音乐人' },
                { id: 'artist-5', name: '电子先锋' },
                { id: 'artist-6', name: '古典乐团' },
                { id: 'artist-7', name: '民谣歌手' }
            ]

            // 生成专辑名称模板
            const albumNameTemplates = [
                '{{genre}}时光',
                '最佳{{genre}}选集',
                '{{genre}}之夜',
                '{{genre}}精选',
                '我的{{genre}}',
                '{{genre}}现场',
                '{{genre}}故事',
                '{{genre}}回忆录',
                '{{genre}}经典',
                '{{genre}}旅程',
                '{{genre}}时刻',
                '{{genre}}之声'
            ]

            // 生成一系列专辑
            const generatedAlbums: Album[] = []

            // 为每种风格生成多个专辑
            genres.forEach((genre) => {
                // 每种风格生成4-8张专辑
                const numAlbums = Math.floor(Math.random() * 5) + 4

                for (let i = 0; i < numAlbums; i++) {
                    // 随机选择一个艺术家
                    const artist =
                        artists[Math.floor(Math.random() * artists.length)]

                    // 随机选择一个专辑名称模板并替换{{genre}}
                    const nameTemplate =
                        albumNameTemplates[
                            Math.floor(
                                Math.random() * albumNameTemplates.length
                            )
                        ]
                    const albumName = nameTemplate.replace(
                        '{{genre}}',
                        genre.name
                    )

                    // 随机生成年份(2015-2025)
                    const year = Math.floor(Math.random() * 11) + 2015

                    // 随机生成歌曲数量(8-15)
                    const songCount = Math.floor(Math.random() * 8) + 8

                    // 随机生成专辑时长(每首歌3-5分钟)
                    const totalDuration =
                        songCount * (Math.floor(Math.random() * 120) + 180)

                    // 随机决定是否收藏
                    const isFavorite = Math.random() > 0.7

                    // 创建专辑对象
                    generatedAlbums.push({
                        id: `album-${genre.key}-${i}`,
                        name: albumName,
                        artist: artist.name,
                        artistId: artist.id,
                        cover: `https://picsum.photos/seed/${genre.key}${i}/500/500`,
                        year: year,
                        genre: genre.name,
                        songCount: songCount,
                        duration: totalDuration,
                        isFavorite: isFavorite
                    })
                }
            })

            return generatedAlbums
        }

        // 生成30-50张专辑
        albums.value = generateAlbums()
    } catch (err: any) {
        console.error('获取专辑列表失败:', err)
        error.value = err.message || '加载失败'
    } finally {
        isLoading.value = false
    }
}

// 格式化时间
const formatDuration = (seconds: number): string => {
    if (!seconds) return '00:00'

    // 对于专辑总时长，使用小时:分钟格式
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)

    if (hours > 0) {
        return `${hours}:${mins.toString().padStart(2, '0')}`
    } else {
        const secs = Math.floor(seconds % 60)
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }
}

// 筛选和排序后的专辑
const filteredAlbums = computed(() => {
    let result = [...albums.value]

    // 按搜索词筛选
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        result = result.filter(
            (album) =>
                album.name.toLowerCase().includes(query) ||
                album.artist.toLowerCase().includes(query)
        )
    }

    // 按风格筛选
    if (filterGenre.value !== 'all') {
        result = result.filter((album) =>
            album.genre?.toLowerCase().includes(filterGenre.value)
        )
    }

    // 排序
    switch (sortBy.value) {
        case 'name':
            result.sort((a, b) => a.name.localeCompare(b.name))
            break
        case 'artist':
            result.sort((a, b) => a.artist.localeCompare(b.artist))
            break
        case 'year':
            result.sort((a, b) => (b.year || 0) - (a.year || 0))
            break
        case 'oldest':
            // 假设ID越小的专辑添加时间越早
            result.sort((a, b) => a.id.localeCompare(b.id))
            break
        case 'newest':
        default:
            // 假设ID越大的专辑添加时间越新
            result.sort((a, b) => b.id.localeCompare(a.id))
            break
    }

    return result
})

// 分页相关
const totalPages = computed(() =>
    Math.ceil(filteredAlbums.value.length / itemsPerPage.value)
)

// 当前页的专辑
const displayedAlbums = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage.value
    const endIndex = startIndex + itemsPerPage.value
    return filteredAlbums.value.slice(startIndex, endIndex)
})

// 创建分页数组
const paginationArray = computed(() => {
    const maxVisiblePages = 5
    const pages = []
    let startPage = Math.max(
        1,
        currentPage.value - Math.floor(maxVisiblePages / 2)
    )
    const endPage = Math.min(totalPages.value, startPage + maxVisiblePages - 1)

    // 调整起始页以显示maxVisiblePages个页码
    startPage = Math.max(1, endPage - maxVisiblePages + 1)

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
    }

    return pages
})

// 重置筛选器
const resetFilters = () => {
    searchQuery.value = ''
    filterGenre.value = 'all'
    sortBy.value = 'newest'
    currentPage.value = 1
}

// 播放专辑
const playAlbum = (album: Album) => {
    // 实际项目中需要先获取专辑中的歌曲
    console.log(`播放专辑: ${album.name}`)
    // 模拟加载专辑并播放
    playerStore.setPlayQueue([
        {
            id: `${album.id}-song-1`,
            title: `${album.name} - 第一首歌`,
            artist: album.artist,
            artistId: album.artistId,
            duration: 240,
            cover: album.cover
        }
    ])
    playerStore.loadSong(playerStore.playQueue[0])
    playerStore.play()
}

// 切换专辑收藏状态
const toggleFavorite = (album: Album) => {
    // 实际项目中应实现收藏逻辑
    album.isFavorite = !album.isFavorite
    console.log(`${album.isFavorite ? '收藏' : '取消收藏'}专辑: ${album.name}`)
}

// 导航到专辑详情页
const navigateToAlbumDetails = (albumId: string) => {
    router.push({ path: '/album/details', query: { id: albumId } })
}

// 监听筛选条件变化，重置到第一页
watch([searchQuery, filterGenre, sortBy], () => {
    currentPage.value = 1
})

onMounted(() => {
    fetchAlbums()
})
</script>

<style scoped>
/* 自定义样式，如果需要 */
.group:hover .opacity-0 {
    opacity: 1;
}
</style>
