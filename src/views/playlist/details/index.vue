<template>
    <div class="w-full h-full p-4 overflow-y-auto overflow-x-hidden">
        <!-- 加载状态 -->
        <div
            v-if="isLoading"
            class="flex flex-col items-center justify-center h-full">
            <div class="space-y-4 text-center">
                <Loader2 class="h-8 w-8 animate-spin mx-auto" />
                <p class="text-muted-foreground">正在加载歌单详情...</p>
            </div>
        </div>

        <!-- 错误状态 -->
        <div
            v-else-if="error"
            class="flex flex-col items-center justify-center h-full">
            <div class="space-y-4 text-center">
                <AlertCircle class="h-8 w-8 text-destructive mx-auto" />
                <p class="text-muted-foreground">加载失败: {{ error }}</p>
                <Button @click="fetchPlaylistDetails">重试</Button>
            </div>
        </div>

        <!-- 内容区域 -->
        <div v-else class="w-full max-w-full">
            <!-- 歌单头部信息 -->
            <section class="flex flex-col md:flex-row gap-6 items-start mb-8">
                <div
                    class="relative rounded-md overflow-hidden w-[150px] h-[150px] md:w-[200px] md:h-[200px] flex-shrink-0 bg-muted">
                    <img
                        v-if="playlist.coverUrl"
                        :src="playlist.coverUrl"
                        :alt="playlist.name"
                        class="h-full w-full object-cover" />
                    <div
                        v-else
                        class="flex items-center justify-center h-full w-full">
                        <Music3 class="h-16 w-16 text-muted-foreground" />
                    </div>
                </div>

                <div class="flex-grow flex flex-col gap-4">
                    <div>
                        <h1 class="text-3xl font-bold mb-2">
                            {{ playlist.name }}
                        </h1>
                        <p
                            v-if="playlist.description"
                            class="text-muted-foreground">
                            {{ playlist.description }}
                        </p>
                        <div
                            class="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                            <span>
                                {{ formatDate(playlist.createdAt) }} 创建
                            </span>
                            <Separator orientation="vertical" class="h-4" />
                            <span>
                                {{ playlist.songs?.length || 0 }} 首歌曲
                            </span>
                            <Separator
                                orientation="vertical"
                                class="h-4"
                                v-if="playlist.isPublic" />
                            <span
                                v-if="playlist.isPublic"
                                class="flex items-center gap-1">
                                <Globe2 class="h-3 w-3" />
                                公开歌单
                            </span>
                        </div>
                    </div>

                    <div class="flex items-center gap-3">
                        <Button
                            variant="default"
                            class="gap-1"
                            @click="playAll">
                            <Play class="h-4 w-4" />
                            全部播放
                        </Button>
                        <Button
                            variant="outline"
                            class="gap-1"
                            @click="shufflePlay">
                            <Shuffle class="h-4 w-4" />
                            随机播放
                        </Button>
                        <Button
                            variant="outline"
                            class="gap-1"
                            @click="openEditDialog">
                            <Pencil class="h-4 w-4" />
                            编辑歌单
                        </Button>
                        <Button
                            variant="outline"
                            class="gap-1 text-destructive hover:text-destructive"
                            @click="confirmDelete">
                            <Trash class="h-4 w-4" />
                            删除歌单
                        </Button>
                    </div>
                </div>
            </section>

            <!-- 歌曲列表 -->
            <section>
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-3">
                        <h2 class="text-xl font-semibold">歌曲列表</h2>
                        <p class="text-sm text-muted-foreground">
                            共 {{ playlist.songs?.length || 0 }} 首
                        </p>
                    </div>

                    <div class="flex items-center gap-2">
                        <Input
                            v-model="searchSongQuery"
                            placeholder="搜索歌单内歌曲..."
                            class="w-[200px]" />
                        <Button
                            variant="outline"
                            size="icon"
                            @click="openAddSongsDialog">
                            <PlusCircle class="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div
                    v-if="!playlist.songs || playlist.songs.length === 0"
                    class="flex flex-col items-center justify-center py-12">
                    <Music3 class="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 class="text-lg font-medium">暂无歌曲</h3>
                    <p class="text-sm text-muted-foreground">
                        点击"+"按钮添加歌曲到歌单
                    </p>
                </div>

                <div v-else>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead class="w-[50px]">#</TableHead>
                                <TableHead>歌曲</TableHead>
                                <TableHead>艺术家</TableHead>
                                <TableHead>专辑</TableHead>
                                <TableHead>时长</TableHead>
                                <TableHead class="w-[80px]">操作</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow
                                v-for="(song, index) in filteredSongs"
                                :key="song.id"
                                @click="playSong(song, index)"
                                class="cursor-pointer hover:bg-muted/50"
                                :class="{ 'bg-muted': isSongPlaying(song) }">
                                <TableCell>
                                    <div
                                        class="relative flex items-center justify-center">
                                        <span
                                            v-if="
                                                !isSongPlaying(song) ||
                                                (isSongPlaying(song) &&
                                                    !playerStore.isPlaying)
                                            ">
                                            {{ index + 1 }}
                                        </span>
                                        <Pause
                                            v-else-if="
                                                isSongPlaying(song) &&
                                                playerStore.isPlaying
                                            "
                                            class="h-4 w-4 text-primary" />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div class="flex items-center gap-3">
                                        <div
                                            class="relative h-8 w-8 overflow-hidden rounded-sm bg-muted">
                                            <img
                                                v-if="song.coverUrl"
                                                :src="song.coverUrl"
                                                :alt="song.title"
                                                class="h-full w-full object-cover" />
                                            <div
                                                v-else
                                                class="flex items-center justify-center h-full w-full">
                                                <Music3
                                                    class="h-4 w-4 text-muted-foreground" />
                                            </div>
                                        </div>
                                        <p
                                            class="font-medium line-clamp-1"
                                            :class="{
                                                'text-primary':
                                                    isSongPlaying(song)
                                            }">
                                            {{ song.title }}
                                        </p>
                                    </div>
                                </TableCell>
                                <TableCell>{{ song.artist }}</TableCell>
                                <TableCell class="max-w-[200px]">
                                    <p class="line-clamp-1">{{ song.album }}</p>
                                </TableCell>
                                <TableCell>
                                    {{ formatDuration(song.duration) }}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        @click.stop="
                                            removeSongFromPlaylist(song)
                                        ">
                                        <X class="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </section>
        </div>
    </div>

    <!-- 编辑歌单对话框 -->
    <Dialog v-model:open="editDialogOpen">
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>编辑歌单</DialogTitle>
                <DialogDescription>
                    修改歌单信息。更改名称、描述或更新封面图片。
                </DialogDescription>
            </DialogHeader>
            <form @submit.prevent="updatePlaylist">
                <div class="grid gap-4 py-4">
                    <div class="flex flex-col items-center gap-4 mb-3">
                        <div
                            class="relative h-32 w-32 rounded-md overflow-hidden bg-muted flex items-center justify-center cursor-pointer group"
                            @click="triggerImageUpload">
                            <input
                                type="file"
                                ref="editCoverImageInput"
                                accept="image/*"
                                class="hidden"
                                @change="handleImageUpload" />
                            <img
                                v-if="editPlaylistData.coverPreview"
                                :src="editPlaylistData.coverPreview"
                                class="h-full w-full object-cover"
                                alt="歌单封面" />
                            <div
                                v-else
                                class="flex flex-col items-center justify-center text-muted-foreground">
                                <ImagePlus class="h-8 w-8 mb-2" />
                                <p class="text-xs">点击上传封面</p>
                            </div>
                            <div
                                class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Button
                                    v-if="editPlaylistData.coverPreview"
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    class="rounded-full"
                                    @click.stop="removeCoverImage">
                                    <X class="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div class="grid gap-2">
                        <Label for="edit-playlist-name">
                            名称
                            <span class="text-destructive">*</span>
                        </Label>
                        <Input
                            id="edit-playlist-name"
                            v-model="editPlaylistData.name"
                            required />
                    </div>
                    <div class="grid gap-2">
                        <Label for="edit-playlist-desc">描述</Label>
                        <Input
                            id="edit-playlist-desc"
                            v-model="editPlaylistData.description" />
                    </div>
                    <div class="grid gap-2">
                        <div class="flex items-center space-x-2">
                            <Checkbox
                                id="edit-playlist-public"
                                v-model="editPlaylistData.isPublic" />
                            <Label for="edit-playlist-public">公开歌单</Label>
                        </div>
                        <p class="text-sm text-muted-foreground">
                            公开歌单将可以被其他用户查看和收藏
                        </p>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        @click="editDialogOpen = false">
                        取消
                    </Button>
                    <Button type="submit" :disabled="!editPlaylistData.name">
                        保存
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>

    <!-- 添加歌曲对话框 -->
    <Dialog v-model:open="addSongsDialogOpen">
        <DialogContent class="sm:max-w-[680px]">
            <DialogHeader>
                <DialogTitle>添加歌曲到歌单</DialogTitle>
                <DialogDescription>
                    搜索并添加歌曲到"{{ playlist.name }}"歌单
                </DialogDescription>
            </DialogHeader>
            <div class="py-4">
                <div class="mb-4">
                    <div class="flex items-center gap-2 mb-4">
                        <Input
                            v-model="addSongsQuery"
                            placeholder="搜索歌曲、艺术家或专辑..."
                            class="flex-grow" />
                        <Button @click="searchSongs">搜索</Button>
                    </div>
                </div>

                <div
                    v-if="isSearching"
                    class="flex items-center justify-center py-8">
                    <Loader2 class="h-6 w-6 animate-spin" />
                </div>
                <div
                    v-else-if="
                        searchResults.length === 0 && addSongsQuery.trim()
                    "
                    class="flex flex-col items-center justify-center py-8">
                    <p class="text-muted-foreground">没有找到匹配的歌曲</p>
                </div>
                <div
                    v-else-if="searchResults.length > 0"
                    class="max-h-[400px] overflow-y-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead class="w-[40px]"></TableHead>
                                <TableHead>歌曲</TableHead>
                                <TableHead>艺术家</TableHead>
                                <TableHead>专辑</TableHead>
                                <TableHead>时长</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow
                                v-for="song in searchResults"
                                :key="song.id"
                                class="cursor-pointer hover:bg-muted/50">
                                <TableCell>
                                    <Checkbox
                                        :checked="isSelectedForAdd(song)"
                                        @click="toggleSongSelection(song)" />
                                </TableCell>
                                <TableCell>
                                    <div class="flex items-center gap-3">
                                        <div
                                            class="relative h-8 w-8 overflow-hidden rounded-sm bg-muted">
                                            <img
                                                v-if="song.coverUrl"
                                                :src="song.coverUrl"
                                                :alt="song.title"
                                                class="h-full w-full object-cover" />
                                            <div
                                                v-else
                                                class="flex items-center justify-center h-full w-full">
                                                <Music3
                                                    class="h-4 w-4 text-muted-foreground" />
                                            </div>
                                        </div>
                                        <p class="font-medium line-clamp-1">
                                            {{ song.title }}
                                        </p>
                                    </div>
                                </TableCell>
                                <TableCell>{{ song.artist }}</TableCell>
                                <TableCell>{{ song.album }}</TableCell>
                                <TableCell>
                                    {{ formatDuration(song.duration) }}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
            <DialogFooter>
                <Button
                    type="button"
                    variant="outline"
                    @click="addSongsDialogOpen = false">
                    取消
                </Button>
                <Button
                    type="button"
                    :disabled="selectedSongs.length === 0"
                    @click="addSelectedSongs">
                    添加选中的歌曲 ({{ selectedSongs.length }})
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>

    <!-- 删除确认对话框 -->
    <AlertDialog v-model:open="deleteDialogOpen">
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>确认删除</AlertDialogTitle>
                <AlertDialogDescription>
                    您确定要删除歌单 "{{ playlist.name }}"
                    吗？此操作不可撤销，歌单将被永久删除。
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel @click="deleteDialogOpen = false">
                    取消
                </AlertDialogCancel>
                <AlertDialogAction @click="deletePlaylist">
                    删除
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Store } from '@tauri-apps/plugin-store'
import { usePlayerStore } from '@/stores/player'
import {
    AlertCircle,
    Loader2,
    Play,
    Pause,
    Shuffle,
    Music3,
    Pencil,
    Trash,
    ImagePlus,
    X,
    PlusCircle,
    Globe2
} from 'lucide-vue-next'

// 初始化状态
const route = useRoute()
const router = useRouter()
const playerStore = usePlayerStore()
const isLoading = ref(true)
const error = ref<string | null>(null)
const playlist = ref<any>({})
const searchSongQuery = ref('')

// 文件存储，用于持久化歌单数据
let store: Store | null = null

// 编辑歌单对话框
const editDialogOpen = ref(false)
const editCoverImageInput = ref<HTMLInputElement | null>(null)
const editPlaylistData = ref({
    name: '',
    description: '',
    isPublic: false,
    coverImage: null as File | null,
    coverPreview: '' as string,
    coverUrl: ''
})

// 添加歌曲对话框
const addSongsDialogOpen = ref(false)
const addSongsQuery = ref('')
const searchResults = ref<any[]>([])
const selectedSongs = ref<any[]>([])
const isSearching = ref(false)

// 删除确认对话框
const deleteDialogOpen = ref(false)

// 过滤歌曲
const filteredSongs = computed(() => {
    if (!playlist.value.songs) return []

    if (!searchSongQuery.value.trim()) return playlist.value.songs

    const query = searchSongQuery.value.toLowerCase()
    return playlist.value.songs.filter(
        (song: any) =>
            song.title?.toLowerCase().includes(query) ||
            song.artist?.toLowerCase().includes(query) ||
            song.album?.toLowerCase().includes(query)
    )
})

// 获取歌单详情
const fetchPlaylistDetails = async () => {
    isLoading.value = true
    error.value = null

    try {
        const playlistId = route.params.id as string

        // 从持久化存储中读取数据
        store = await Store.load('.playlists.dat')
        const storedPlaylists = (await store?.get('playlists')) || []

        const foundPlaylist = Array.isArray(storedPlaylists)
            ? storedPlaylists.find((p: any) => p.id === playlistId)
            : null

        if (!foundPlaylist) {
            error.value = '找不到指定的歌单'
            return
        }

        playlist.value = foundPlaylist
    } catch (err: any) {
        console.error('获取歌单详情失败:', err)
        error.value = err.message || '获取歌单详情失败'
    } finally {
        isLoading.value = false
    }
}

// 格式化日期
const formatDate = (dateString: string) => {
    if (!dateString) return '未知'
    try {
        const date = new Date(dateString)
        return (
            date.toLocaleDateString() +
            ' ' +
            date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        )
    } catch {
        return '无效日期'
    }
}

// 格式化时长
const formatDuration = (seconds: number) => {
    if (!seconds) return '00:00'

    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

// 检查歌曲是否正在播放
const isSongPlaying = (song: any) => {
    return (
        playerStore.currentSongInfo &&
        playerStore.currentSongInfo.id === song.id
    )
}

// 播放全部
const playAll = () => {
    if (!playlist.value.songs || playlist.value.songs.length === 0) {
        return
    }

    playerStore.setPlayQueue([...playlist.value.songs])
    playerStore.loadSong(playlist.value.songs[0])
    playerStore.play()
}

// 随机播放
const shufflePlay = () => {
    if (!playlist.value.songs || playlist.value.songs.length === 0) {
        return
    }

    // 设置播放模式为随机播放
    playerStore.playMode = 1
    playerStore.setPlayQueue([...playlist.value.songs])
    playerStore.loadSong(playlist.value.songs[0])
    playerStore.play()
}

// 播放指定歌曲
const playSong = (song: any, index: number) => {
    playerStore.setPlayQueue([...playlist.value.songs])
    playerStore.loadSong(song)
    playerStore.play()
}

// 从歌单中移除歌曲
const removeSongFromPlaylist = async (songToRemove: any) => {
    // 从歌单中过滤掉要删除的歌曲
    playlist.value.songs = playlist.value.songs.filter(
        (song: any) => song.id !== songToRemove.id
    )
    playlist.value.songCount = playlist.value.songs.length

    // 更新存储
    await updatePlaylistInStore()
}

// 更新歌单在存储中的数据
const updatePlaylistInStore = async () => {
    try {
        // 从持久化存储中读取所有歌单数据
        store = await Store.load('.playlists.dat')
        const storedPlaylists = (await store?.get('playlists')) || []

        // 找到并更新当前歌单
        const index = Array.isArray(storedPlaylists)
            ? storedPlaylists.findIndex((p: any) => p.id === playlist.value.id)
            : -1

        if (index !== -1) {
            storedPlaylists[index] = {
                ...playlist.value,
                updatedAt: new Date().toISOString()
            }

            // 保存到持久化存储
            await store?.set('playlists', storedPlaylists)
            await store?.save()
        }
    } catch (err) {
        console.error('更新歌单失败:', err)
    }
}

// 打开编辑歌单对话框
const openEditDialog = () => {
    editPlaylistData.value = {
        name: playlist.value.name,
        description: playlist.value.description || '',
        isPublic: playlist.value.isPublic || false,
        coverImage: null,
        coverPreview: playlist.value.coverUrl || '',
        coverUrl: playlist.value.coverUrl || ''
    }
    editDialogOpen.value = true
}

// 触发图片上传
const triggerImageUpload = () => {
    editCoverImageInput.value?.click()
}

// 处理图片上传
const handleImageUpload = (event: Event) => {
    const input = event.target as HTMLInputElement
    if (input.files && input.files[0]) {
        const file = input.files[0]
        editPlaylistData.value.coverImage = file
        editPlaylistData.value.coverPreview = URL.createObjectURL(file)
    }
}

// 移除封面图片
const removeCoverImage = (event: Event) => {
    event.stopPropagation()
    editPlaylistData.value.coverImage = null
    editPlaylistData.value.coverPreview = ''
    if (editCoverImageInput.value) {
        editCoverImageInput.value.value = ''
    }
}

// 更新歌单
const updatePlaylist = async () => {
    if (!editPlaylistData.value.name.trim()) {
        return
    }

    try {
        // 将图片转换为Base64存储（如果有新上传的图片）
        let coverBase64 = editPlaylistData.value.coverUrl
        if (editPlaylistData.value.coverImage) {
            coverBase64 = await fileToBase64(editPlaylistData.value.coverImage)
        }

        // 更新歌单信息
        playlist.value = {
            ...playlist.value,
            name: editPlaylistData.value.name.trim(),
            description: editPlaylistData.value.description.trim(),
            isPublic: editPlaylistData.value.isPublic,
            coverUrl: coverBase64,
            updatedAt: new Date().toISOString()
        }

        // 更新存储
        await updatePlaylistInStore()

        // 关闭对话框
        editDialogOpen.value = false
    } catch (err) {
        console.error('更新歌单失败:', err)
    }
}

// 打开添加歌曲对话框
const openAddSongsDialog = () => {
    addSongsQuery.value = ''
    searchResults.value = []
    selectedSongs.value = []
    addSongsDialogOpen.value = true
}

// 搜索歌曲
const searchSongs = async () => {
    if (!addSongsQuery.value.trim()) return

    isSearching.value = true
    try {
        // 模拟搜索API调用，实际项目中应替换为真实API
        // 这里使用延时来模拟网络请求
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // 模拟返回结果
        const mockResults = [
            {
                id: 'song1',
                title: 'Shape of You',
                artist: 'Ed Sheeran',
                album: '÷ (Divide)',
                duration: 235,
                coverUrl: 'https://via.placeholder.com/60'
            },
            {
                id: 'song2',
                title: 'Blinding Lights',
                artist: 'The Weeknd',
                album: 'After Hours',
                duration: 203,
                coverUrl: 'https://via.placeholder.com/60'
            },
            {
                id: 'song3',
                title: 'Dynamite',
                artist: 'BTS',
                album: 'BE',
                duration: 199,
                coverUrl: 'https://via.placeholder.com/60'
            },
            {
                id: 'song4',
                title: 'Levitating',
                artist: 'Dua Lipa',
                album: 'Future Nostalgia',
                duration: 203,
                coverUrl: 'https://via.placeholder.com/60'
            }
        ]

        // 过滤掉已经在歌单中的歌曲
        const existingIds = (playlist.value.songs || []).map(
            (song: any) => song.id
        )
        searchResults.value = mockResults.filter(
            (song) => !existingIds.includes(song.id)
        )
    } catch (err) {
        console.error('搜索歌曲失败:', err)
    } finally {
        isSearching.value = false
    }
}

// 检查歌曲是否被选中
const isSelectedForAdd = (song: any) => {
    return selectedSongs.value.some((selected) => selected.id === song.id)
}

// 切换歌曲选择状态
const toggleSongSelection = (song: any) => {
    const index = selectedSongs.value.findIndex(
        (selected) => selected.id === song.id
    )
    if (index === -1) {
        selectedSongs.value.push(song)
    } else {
        selectedSongs.value.splice(index, 1)
    }
}

// 添加选中的歌曲到歌单
const addSelectedSongs = async () => {
    if (selectedSongs.value.length === 0) return

    // 确保songs属性是数组
    if (!playlist.value.songs) {
        playlist.value.songs = []
    }

    // 添加选中的歌曲到歌单
    playlist.value.songs = [...playlist.value.songs, ...selectedSongs.value]
    playlist.value.songCount = playlist.value.songs.length

    // 更新存储
    await updatePlaylistInStore()

    // 关闭对话框并清除选择
    addSongsDialogOpen.value = false
    selectedSongs.value = []
    searchResults.value = []
    addSongsQuery.value = ''
}

// 确认删除歌单
const confirmDelete = () => {
    deleteDialogOpen.value = true
}

// 删除歌单
const deletePlaylist = async () => {
    try {
        // 从持久化存储中读取所有歌单数据
        store = await Store.load('.playlists.dat')
        const storedPlaylists = (await store?.get('playlists')) || []

        // 过滤掉要删除的歌单
        const updatedPlaylists = Array.isArray(storedPlaylists)
            ? storedPlaylists.filter((p: any) => p.id !== playlist.value.id)
            : []

        // 保存到持久化存储
        await store?.set('playlists', updatedPlaylists)
        await store?.save()

        // 关闭对话框
        deleteDialogOpen.value = false

        // 返回歌单列表页
        router.push('/playlist')
    } catch (err) {
        console.error('删除歌单失败:', err)
    }
}

// 工具函数：将文件转换为Base64
const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = (error) => reject(error)
    })
}

// 页面加载时获取歌单详情
onMounted(() => {
    fetchPlaylistDetails()
})

// 监听路由参数变化
watch(
    () => route.params.id,
    (newId) => {
        if (newId) {
            fetchPlaylistDetails()
        }
    }
)
</script>
