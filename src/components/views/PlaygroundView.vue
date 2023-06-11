<template>
    <InputComponent />
    <div class="wrapper"></div>
    <DialogComponent />
    <ConfirmComponent v-if="isSolved" />
</template>

<script lang="ts" setup>
import InputComponent from '@/components/InputComponent.vue';
import DialogComponent from '@/components/modal/DialogComponent.vue';
import ConfirmComponent from '@/components/modal/ConfirmComponent.vue';
import { computed } from 'vue';
import store from '@/store';

const isSolved = computed(() => store.state.isSolved);
</script>

<style lang="scss" scoped>

</style>
