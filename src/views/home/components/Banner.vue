<template>
    <div class="w-full h-full rounded-lg flex" :style="{ background: bg }">
        <img :src="img" class="h-full rounded-l-lg" alt="" />
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
    img: {
        type: String,
        required: true
    }
})
import autohue from 'autohue.js'
const bg = ref('')
autohue(props.img, {
    threshold: {
        primary: 10,
        right: 10
    },
    maxSize: 100
})
    .then((result) => {
        // console.log(`%c${result.primaryColor}`, 'color: #fff; background: ' + result.primaryColor, 'main')
        // console.log(`%c${result.secondaryColor}`, 'color: #fff; background: ' + result.secondaryColor, 'sub')
        // console.log(`%c${result.backgroundColor.left}`, 'color: #fff; background: ' + result.backgroundColor.left, 'bg-left')
        console.log(
            `%c${result.backgroundColor.right}`,
            'color: #fff; background: ' + result.backgroundColor.right,
            'bg-right'
        )
        // console.log(`%clinear-gradient to right`, 'color: #fff; background: linear-gradient(to right, ' + result.backgroundColor.left + ', ' + result.backgroundColor.right + ')', 'bg')
        bg.value = ` ${result.backgroundColor.right}`
    })
    .catch((err) => console.error(err))
</script>
