<template>
    <div class="flex flex-wrap">
        <div v-for="(item, index) in list" :key="index" class="basis-1/6">
            <div class="flex flex-col items-center gap-3">
                <img
                    class="aspect-square w-full rounded-full shadow-sm object-cover"
                    :src="item.cover"
                    alt="" />
                <div class="font-medium line-clamp-1 text-center">
                    {{ item?.artist ?? '未知艺术家' }}
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
defineProps({
    list: {
        type: Array as () => {
            cover: string
            title?: string
            artist?: string
        }[],
        required: true
    }
})
</script>
<style scoped></style>
