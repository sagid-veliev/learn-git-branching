<template>
    <div class="dialog">
        <div @click="isVisible = !isVisible" @keyup.enter="isVisible = !isVisible" class="dialog-header">
            Оптимальное решение
            <el-icon v-if="isVisible" class="dialog-header_icon" size="16px">
                <ArrowDown class="dialog-header_icon-background"/>
            </el-icon>
            <el-icon v-else class="dialog-header_icon" size="16px">
                <ArrowUp class="dialog-header_icon-background" />
            </el-icon>
        </div>
        <div v-show="isVisible" class="dialog-content">
            <div id="solve"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Node } from '@/models/types';
import { onMounted, ref, Ref } from 'vue';
import Api from '@/services/api';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useRoute } from 'vue-router';
import solveGraph from '@/utils/solveGraph';

const route = useRoute();
const isVisible: Ref<boolean> = ref(true);
const taskId: Ref<string> = ref('');
const solveNodes: Ref<Node[] | null> = ref(null);

onMounted(() => {
    taskId.value = String(route.params.id);
    Api.getGraph(Number(taskId.value))
        .then((response: any) => {
            solveNodes.value = response.solve_graph;
            if (solveNodes.value?.length) {
                solveGraph(solveNodes.value);
            }
        });
});
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.dialog {
    position: fixed;
    z-index: 20;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 400px;
    top: 1%;
    right: 1%;
    background: $background;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 5px;
    &-header {
        display: inline-flex;
        justify-content: space-between;
        width: 100%;
        text-align: center;
        padding: 10px;
        background: #353740;
        color: $font;
        border-radius: 5px 5px 0 0;
        &_icon-background {
            background: #353740;
        }
    }
    &-content {
        height: 90vh;
        font-size: 12px;
        padding: 5px;
    }
}
</style>
