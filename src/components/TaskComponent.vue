<template>
    <div v-if="isLoadedComponent" class="container">
        <div class="task">
            <div class="task-header">
                <span>{{ title }}</span>
            </div>
            <div v-if="tasks" class="task-description">
                <p
                    v-for="definition in tasks[0].info_set[0].infodetail_set"
                    :key="definition.content"
                    v-html="definition.content"
                >
                </p>
            </div>
            <div class="task-footer">
                <button @click="goToPlayground">Приступить к решению</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
// eslint-disable-next-line import/no-extraneous-dependencies
import { useRoute, useRouter } from 'vue-router';
import { onMounted, Ref, ref } from 'vue';
import { Tasks } from '@/services/types';
import Api from '@/services/api';

const route = useRoute();
const router = useRouter();
const title: Ref<string | string[]> = ref('');
const taskId: Ref<string> = ref('');
const tasks: Ref<Tasks | null> = ref(null);
const isLoadedComponent: Ref<boolean> = ref(false);

const goToPlayground = () => {
    router.push(`/playground/${taskId.value}/${title.value}`);
};

onMounted(async () => {
    title.value = route.params.title;
    taskId.value = String(route.params.id);
    await Api.getTask(Number(taskId.value))
        .then((response: Tasks) => {
            tasks.value = response;
        });
    isLoadedComponent.value = true;
});
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}
.task {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin: auto;
    width: 60%;
    height: 80%;
    &-header {
        width: 100%;
        padding: 10px;
        text-align: center;
        font-size: 34px;
        line-height: 50px;
        font-weight: 500;
    }
    &-description {
        line-height: 30px;
    }
    &-footer {
        display: inline-flex;
        justify-content: space-around;
        width: 100%;
        & button {
            padding: 15px;
            border: 1px solid white;
            cursor: pointer;
            border-radius: 4px;
            transition: 0.3s;
            &:hover {
                background: white;
                color: $background;
            }
        }
    }
}
</style>
