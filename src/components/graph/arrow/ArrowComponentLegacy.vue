<template>
    <div
        :style="{
            top: `${props.top}px`,
            left: `${props.left}%`,
        }"
        class="arrow"
    >
        <div
            class="arrow-head"
        ></div>
        <div
            class="arrow-foot"
        ></div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    top: {
        type: Number,
        default: 10,
    },
    left: {
        type: Number,
        default: 45,
    },
});
</script>

<style lang="scss" scoped>
.arrow {
    position: absolute;
    display: flex;
    width: 40px;
    flex-direction: column;
    align-items: center;
    top: 5%;
    left: 45%;
    transition: 1s;
    &-head {
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid black;
    }
    &-foot {
        width: 3px;
        height: 50px;
        background: #202123;
    }
}
</style>
