<template>
    <div class="w-full h-full overflow-y-auto p-4">
        <Card class="flex-row">
            <CardHeader class="flex-1 flex! flex-col! justify-center!">
                <CardTitle>服务地址</CardTitle>
                <CardDescription>音乐服务器地址</CardDescription>
            </CardHeader>
            <CardContent>
                <Button>测试</Button>
            </CardContent>
        </Card>
    </div>
</template>
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
</script>
