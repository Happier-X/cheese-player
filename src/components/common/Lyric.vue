<template>
    <div class="w-full h-full py-[10%] overflow-hidden">
        <div
            class="w-full h-full overflow-y-scroll scrollbar-hide"
            ref="lyricRef">
            <div class="w-full" ref="topSpaceRef"></div>
            <div
                class="w-full p-3 rounded-box"
                v-for="(line, index) in playerStore.lyricLines"
                :key="index"
                :ref="(el) => setRef(el as HTMLElement, index)">
                <div
                    class="w-full text-center text-2xl"
                    :class="{
                        'text-black opacity-100':
                            index === playerStore.currentLyricLine,
                        'text-gray-500 opacity-30':
                            index !== playerStore.currentLyricLine
                    }">
                    {{ line.text }}
                </div>
            </div>
            <div class="w-full" ref="bottomSpaceRef"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref, useTemplateRef, watch } from 'vue'
import { usePlayerStore } from '@/stores/player'
const playerStore = usePlayerStore()
const lyricLineRefs = ref(new Map())
const setRef = (el: HTMLElement | null, index: number) => {
    if (el) {
        lyricLineRefs.value.set(index, el)
    } else {
        lyricLineRefs.value.delete(index)
    }
}
const topSpaceRef = useTemplateRef('topSpaceRef')
const bottomSpaceRef = useTemplateRef('bottomSpaceRef')
const lyricRef = useTemplateRef('lyricRef')
onMounted(() => {
    const firstLine = lyricLineRefs.value.get(0)
    const lastLine = lyricLineRefs.value.get(playerStore.lyricLines.length - 1)
    if (
        !topSpaceRef.value ||
        !bottomSpaceRef.value ||
        !lyricRef.value ||
        !firstLine ||
        !lastLine
    )
        return
    topSpaceRef.value.style.height = `${lyricRef.value.clientHeight / 2 - firstLine.clientHeight / 2}px`
    bottomSpaceRef.value.style.height = `${lyricRef.value.clientHeight / 2 - lastLine.clientHeight / 2}px`
})
watch(
    () => playerStore.currentLyricLine,
    (newLine) => {
        let currentLine = lyricLineRefs.value.get(newLine)
        currentLine.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        })
    }
)
</script>
