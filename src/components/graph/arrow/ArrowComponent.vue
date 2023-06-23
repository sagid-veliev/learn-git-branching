<template>
    <canvas ref="canvasRef"></canvas>
</template>

<script lang="ts" setup>
import { onMounted, Ref, ref } from 'vue';
import drawArrow from '@/functions/Arrow';

const props = defineProps({
    // x1: Number,
    // x2: Number,
    // y1: Number,
    // y2: Number,
    arrows: {
        type: Array,
        default: () => [],
    },
});
const canvasRef: Ref<HTMLCanvasElement | null> = ref(null);

onMounted(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.value;
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const context = canvas.getContext('2d');
        props.arrows.forEach((arrow: any) => {
            drawArrow(context, arrow.x1, arrow.y1, arrow.x2, arrow.y2);
        });
        // drawArrow(context, Number(props.x1), Number(props.y1), Number(props.x2), Number(props.y2));
    }
});
</script>

<style lang="scss" scoped>
cavnas {
    display: block;
    width: 100vw;
    height: 1000px;
}
</style>
