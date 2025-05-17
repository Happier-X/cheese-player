<template>
  <div class="w-full h-[15px] py-[6px] cursor-pointer" ref="progressBarRef" @click="handleClick" @mousedown="handleMouseDown" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <div class="w-full h-[3px] bg-gray-300 relative">
      <div class="w-0 h-full relative" ref="filledBarRef">
        <div class="h-full w-full bg-black"></div>
        <div
          class="w-[12px] h-[12px] rounded-box shadow bg-black absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2"
          :style="{ display: showDot ? 'block' : 'none' }"
        ></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useTemplateRef, ref, watch } from 'vue';
import { usePlayerStore } from '../../../../stores/player';

const playerStore = usePlayerStore();
const progressBarRef = useTemplateRef('progressBarRef');
const filledBarRef = useTemplateRef('filledBarRef');
const isDragging = ref(false);
const showDot = ref(false);
watch(
  () => playerStore.progress,
  (newValue) => {
    if(isDragging.value) return;
    moveFilledBar(newValue);
  }
);
// 移动进度条
const moveFilledBar = (percent:number) => {
  if(!filledBarRef.value) return;
  filledBarRef.value.style.width = `${percent}%`;
};
const handleClick = (event: MouseEvent) => {
  showDot.value = true;
  if(!progressBarRef.value) return;
  const progressBar = progressBarRef.value?.getBoundingClientRect();
  let clickX = event.clientX - progressBar.left;
  let percent = (clickX / progressBar.width) * 100;
  moveFilledBar(percent);
  playerStore.seek(percent);
};
const handleMouseDown = (event:MouseEvent) => {
  isDragging.value = true;
  showDot.value = true;
  event.preventDefault();
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
};
const handleMouseMove = (event:MouseEvent)=>{
  if(!progressBarRef.value) return;
  const progressBar = progressBarRef.value?.getBoundingClientRect();
  let newWidth = event.clientX - progressBar.left;
  let percent = (newWidth / progressBar.width) * 100;
  if(event.clientX < progressBar.left) {
    percent = 0;
  } else if(event.clientX > progressBar.right) {
    percent = 100;
  }
  moveFilledBar(percent);
}
const handleMouseUp = (event:MouseEvent) => {
  isDragging.value = false;
  showDot.value = false;
  if(!progressBarRef.value) return;
  const progressBar = progressBarRef.value?.getBoundingClientRect();
  let clickX = event.clientX - progressBar.left;
  let percent = (clickX / progressBar.width) * 100;
  if(percent < 0) {
    percent = 0;
  } else if(percent > 100) {
    percent = 100;
  }
  playerStore.seek(percent);
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup', handleMouseUp);
};
const handleMouseEnter = () => {
  if(isDragging.value) return;
  showDot.value = true;
};
const handleMouseLeave = () => {
  if(isDragging.value) return;
  showDot.value = false;
};
</script>