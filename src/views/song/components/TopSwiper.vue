<template>
  <Swiper
    :modules="[Autoplay]"
    :slides-per-view="6"
    :space-between="50"
    :autoplay="true"
    :loop="list.length > 6 ? true : false"
  >
    <SwiperSlide v-for="(item, index) in list" :key="index" class="py-3">
      <img
        class="size-full rounded-box aspect-square object-cover shadow select-none"
        :src="item.coverImg"
        alt="封面"
      />
    </SwiperSlide>
  </Swiper>
</template>
<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// 接收的属性
defineProps({
  list: {
    type: Array,
    default: () => [],
  },
});
</script>
