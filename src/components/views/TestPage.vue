<template>
    <canvas ref="canvasRef" width="1000" height="1000"></canvas>\
</template>

<script lang="ts" setup>
import { onMounted, Ref, ref } from 'vue';
import drawArrow from '@/functions/Arrow';

const canvasRef: Ref<HTMLCanvasElement | null> = ref(null);

onMounted(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.value;
    if (canvas) {
        const context = canvas.getContext('2d');
        drawArrow(context, 350, 10, 350, 100);
    }
});
</script>

<style lang="scss" scoped>
cavnas {
    display: block;
}
</style>
