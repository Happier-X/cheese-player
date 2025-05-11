<template>
  <Swiper :slides-per-view="5">
    <SwiperSlide v-for="(item, index) in list" :key="index">
      <img class="size-full rounded-box" :src="item.coverImg" alt="封面" />
    </SwiperSlide>
  </Swiper>
</template>
<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

// 接收的属性
defineProps({
  list: {
    type: Array,
    default: () => [],
  },
});
</script>
