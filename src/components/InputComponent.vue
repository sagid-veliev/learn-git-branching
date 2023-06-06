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
                    placeholder="$"
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
    onBeforeMount, Ref, ref,
} from 'vue';
import gitNodes from '@/utils/utils';
import { Node } from '@/models/types';

const route = useRoute();
const title: Ref<string> = ref('');
const command: Ref<string> = ref('');
const commands: Ref<string[]> = ref([]);
const nodes: Ref<Node[]> = ref([
    {
        id: 1,
        name: 'C1',
        parent: [],
        type: 1,
        children: [],
    },
]);

const sendCommand = () => {
    commands.value.push(command.value);
    nodes.value = gitNodes(command.value, nodes.value, commands.value.length + 1);
    command.value = '';
};

onBeforeMount(() => {
    title.value = String(route.params.title);
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
    }
}
</style>
