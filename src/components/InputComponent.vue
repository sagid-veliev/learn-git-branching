<template>
    <div class="modal">
        <div class="modal-header">
            {{ title }}
        </div>
        <div class="modal-content">
            <p
                class="modal-content_command"
                v-for="(command, index) in commands"
                :key="index"
            >
                <span style="color: grey">$</span> {{ command }}
            </p>
        </div>
        <div class="modal-input">
            <label for="input">
                <input
                    :placeholder="notValid ? 'Некорректная команда' : '$'"
                    :class="{ 'modal-input_valid': notValid }"
                    class="modal-input_el"
                    id="input"
                    type="text"
                    v-model="command"
                    @keyup.enter="sendCommand"
                />
            </label>
        </div>
    </div>
</template>

<script lang="ts" setup>
// eslint-disable-next-line import/no-extraneous-dependencies
import { useRoute } from 'vue-router';
import {
    onBeforeMount, onMounted, Ref, ref,
} from 'vue';
import gitNodes, { createNodes } from '@/utils/utils';
import { Node } from '@/models/types';
import validate from '@/utils/validateInput';
// eslint-disable-next-line import/extensions,import/no-unresolved

const route = useRoute();
const title: Ref<string> = ref('');
const command: Ref<string> = ref('');
const commands: Ref<string[]> = ref([]);
const nodes: Ref<Node[]> = ref([
    {
        id: 1,
        name: 'C1',
        parent: [],
        children: [],
        branch: ['*master'],
        currentBranch: 'master',
        currentNode: true,
        type: 0,
    },
]);
const taskId: Ref<string> = ref('');
const notValid: Ref<boolean> = ref(false);

const sendCommand = async () => {
    if (!command.value || validate(command.value)) {
        notValid.value = true;
        command.value = '';
        return;
    }
    notValid.value = false;
    commands.value.push(command.value);
    const response = await gitNodes(nodes.value, command.value);
    command.value = '';
    if (response) {
        nodes.value = response;
    }
};

onBeforeMount(() => {
    taskId.value = String(route.params.id);
    title.value = String(route.params.title);
});

onMounted(() => {
    createNodes(nodes.value);
});
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.modal {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 300px;
    height: 97%;
    position: fixed;
    top: 1%;
    left: 1%;
    background: $background;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 5px;
    &-header {
        width: 100%;
        text-align: center;
        padding: 10px;
        background: #353740;
        color: $font;
        border-radius: 5px 5px 0 0;
        cursor: pointer;
    }
    &-content {
        height: 100%;
        font-size: 12px;
        padding: 5px;
        overflow-y: auto;
        &_command {
            display: flex;
            gap: 10px;
            line-height: 20px;
        }
    }
    &-input {
        padding: 5px;
        &_el {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
            color: #333;
            background: white;
            width: 100%;
            font-size: 12px;
            background: rgb(64,65,79);
            color: white;
            &::placeholder {
                color: #999;
            }
            &:focus {
                outline: none;
                border-color: #666;
                //box-shadow: 0 0 5px rgba(102, 102, 102, 0.5);
            }
        }
        &_valid {
            border: 1px solid red;
            &:focus {
                border: 1px solid red;
            }
        }
    }
}
</style>
