<template>
    <div class="container">
        <div class="tasklist">
            <div class="tasklist-header">
                <span>{{ title }}</span>
            </div>
            <div class="tasklist-tasks">
                <div
                    v-for="task in tasks"
                    :key="task.id"
                    class="tasklist-tasks__level"
                    @click="goToTask(task.id, task.info_set[0].title)"
                    @keyup="goToTask(task.id, task.info_set[0].title)"
                >
                    <div class="tasklist-tasks__level-card">
                        <div>
                            <el-icon size="40px">
                                <CircleCheck v-if="!task.solve" />
                                <SuccessFilled v-else />
                            </el-icon>
                        </div>
                        <span style="text-align: center">{{ task.info_set[0].title }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
// eslint-disable-next-line import/no-extraneous-dependencies
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref, Ref } from 'vue';
import Api from '@/services/api';
import { Tasks } from '@/services/types';
// import { CircleCheck } from '@element-plus/icons-vue';

const route = useRoute();
const router = useRouter();
const title: Ref<string | string[]> = ref('');
const tasks: Ref<Tasks | null> = ref(null);

const goToTask = (taskId: number, taskTitle: string) => {
    router.push(`/task/${taskId}/${taskTitle}`);
};

onMounted(async () => {
    const tasksId: string | string[] = route.params.id;
    title.value = route.params.title;
    Api.getTasks(Number(tasksId))
        .then((response: Tasks) => {
            tasks.value = response;
        });
});
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}
.tasklist {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
    &-tasks {
        display: inline-flex;
        flex-wrap: wrap;
        padding: 20px;
        gap: 30px;
        width: 100%;
        justify-content: space-between;
        &__level {
            flex: 1;
            border-radius: 4px;
            min-width: 32%;
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
            height: 220px;
            transition: 0.5s;
            cursor: pointer;
            &-card {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-around;
                height: 100%;
                font-weight: 300;
            }
            &:hover {
                transform: scale(1.05);
            }
        }
    }
}
</style>
