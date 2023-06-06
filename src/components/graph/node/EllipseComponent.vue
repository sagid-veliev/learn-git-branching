<template>
    <div
        :style="{
            'top': `${props.top}px`,
            'left': `${props.left}%`,
        }"
        class="collapse"
    >
        <div class="collapse-name">{{ props.name }}</div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    name: {
        type: String,
        default: 'C0',
    },
    top: {
        type: Number,
        default: 5,
    },
    left: {
        type: Number,
        default: 50,
    },
});
</script>

<style lang="scss" scoped>
.collapse {
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 3px solid white;
    display: flex;
    background: deeppink;
    justify-content: center;
    align-items: center;
    &-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        background: deeppink;
        font-size: 17px !important;
    }
}
</style>
