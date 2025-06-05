<template>
    <div class="flex flex-col gap-4">
        <div
            class="text-lg font-bold border-l-[var(--foreground)] border-l-3 pl-3">
            媒体库设置
        </div>
        <Dialog>
            <Card class="flex-row">
                <CardHeader class="flex-1">
                    <CardTitle as-child>媒体服务</CardTitle>
                    <CardDescription class="flex items-center gap-1">
                        <component
                            :is="isLinked ? LinkIcon : UnlinkIcon"
                            :size="14" />
                        {{ isLinked ? '已连接' : '未连接' }}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DialogTrigger as-child>
                        <Button
                            size="icon"
                            variant="ghost"
                            @click="handleOpenMediaServerDialog">
                            <EditIcon />
                        </Button>
                    </DialogTrigger>
                </CardContent>
            </Card>
            <DialogContent
                description="配置媒体服务器的连接信息，包括服务器地址、用户名和密码">
                <DialogHeader>
                    <DialogTitle>媒体服务</DialogTitle>
                    <DialogDescription>
                        请填写您的媒体服务器连接信息
                    </DialogDescription>
                </DialogHeader>
                <form
                    id="mediaServerForm"
                    autocomplete="off"
                    @submit="handleMediaServerFormSubmit"
                    class="flex flex-col gap-4">
                    <FormField v-slot="{ componentField }" name="url">
                        <FormItem>
                            <FormLabel>服务地址</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="请输入服务地址"
                                    v-bind="componentField" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField }" name="username">
                        <FormItem>
                            <FormLabel>用户名</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="请输入用户名"
                                    v-bind="componentField" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField }" name="password">
                        <FormItem>
                            <FormLabel>密码</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="请输入密码"
                                    v-bind="componentField" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                </form>
                <DialogFooter>
                    <DialogClose as-child>
                        <Button variant="outline">取消</Button>
                    </DialogClose>
                    <DialogClose as-child>
                        <Button type="submit" form="mediaServerForm">
                            保存
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>
<script setup lang="ts">
import subsonicApi from '@/api/subsonic'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Store } from '@tauri-apps/plugin-store'
import { toTypedSchema } from '@vee-validate/zod'
import {
    SquarePen as EditIcon,
    CircleCheck as LinkIcon,
    CircleX as UnlinkIcon
} from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { onMounted, ref } from 'vue'
import * as z from 'zod'

const mediaServer = ref({
    url: '',
    username: '',
    password: ''
})
let settingsStore = null as Store | null
onMounted(async () => {
    handlePing()
})
const isLinked = ref(false)
const handlePing = async () => {
    try {
        const res: any = await subsonicApi.ping()
        if (res.status === 'ok') {
            isLinked.value = true
        } else {
            isLinked.value = false
        }
    } catch (error) {
        isLinked.value = false
    }
}
const handleOpenMediaServerDialog = async () => {
    settingsStore = await Store.load('store.settings')
    mediaServer.value = (await settingsStore?.get('mediaServer')) || {
        url: '',
        username: '',
        password: ''
    }
    mediaServerForm.setValues(mediaServer.value)
}
const mediaServerFormSchema = toTypedSchema(
    z.object({
        url: z.string().min(1, '服务地址不能为空').url('请输入合法的URL'),
        username: z.string().optional(),
        password: z.string().optional()
    })
)
const mediaServerForm = useForm({
    validationSchema: mediaServerFormSchema,
    initialValues: mediaServer.value
})
const handleMediaServerFormSubmit = mediaServerForm.handleSubmit(
    async (values) => {
        await settingsStore?.set('mediaServer', values)
        handlePing()
    }
)
</script>
