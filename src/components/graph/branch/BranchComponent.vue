<template>
    <div
        v-if="name.length"
        :style="{
            top: `${props.top}px`,
            left: `${props.left}%`,
        }"
        class="branch"
    >
        <p
            v-for="name in props.name"
            :key="name"
        >
            {{ name }}{{ (name === currentBranch) && currentNode ? '*' : '' }}
        </p>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    name: {
        type: Array,
        default: () => [],
    },
    currentBranch: {
        type: String,
        default: 'main',
    },
    currentNode: {
        type: Boolean,
        default: false,
    },
    branch: {
        type: Array,
        default: () => [],
    },
    top: {
        type: Number,
        default: 10,
    },
    left: {
        type: Number,
        default: 55,
    },
});
</script>

<style lang="scss" scoped>
.branch {
    position: absolute;
    z-index: 25;
    min-width: 75px;
    background: #a6366a;
    border: 3px solid white;
    border-radius: 4px;
    text-align: center;
    font-size: 12px;
    padding: 2px;
    p {
        background: #a6366a;
    }
}
</style>
