<template>
    <div class="flex flex-col gap-4">
        <div
            class="text-lg font-bold border-l-[var(--foreground)] border-l-3 pl-3">
            媒体库设置
        </div>
        <Card class="flex-row">
            <CardHeader class="flex-1 flex! flex-col! justify-center!">
                <Label for="server-config">
                    <CardTitle as-child>服务配置</CardTitle>
                </Label>
            </CardHeader>
            <Dialog>
                <CardContent>
                    <DialogTrigger as-child>
                        <Button id="server-config" size="icon" variant="ghost">
                            <EditIcon />
                        </Button>
                    </DialogTrigger>
                </CardContent>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>服务配置</DialogTitle>
                    </DialogHeader>
                    <div class="grid gap-4 py-4">
                        <div class="grid grid-cols-4 items-center gap-4">
                            <Label for="name" class="text-right">
                                服务地址
                            </Label>
                            <Input id="name" class="col-span-3" />
                        </div>
                        <div class="grid grid-cols-4 items-center gap-4">
                            <Label for="username" class="text-right">
                                用户名
                            </Label>
                            <Input id="username" class="col-span-3" />
                        </div>
                        <div class="grid grid-cols-4 items-center gap-4">
                            <Label for="password" class="text-right">
                                密码
                            </Label>
                            <Input id="password" class="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">保存更改</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    </div>
</template>
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SquarePen as EditIcon } from 'lucide-vue-next'

const handleEditServerConfig = () => {
    alert('编辑服务配置功能尚未实现')
}
</script>
