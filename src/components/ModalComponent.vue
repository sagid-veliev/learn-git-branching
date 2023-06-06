<template>
    <div class="container">
        <div
            class="modal"
        >
            <svg xmlns="http://www.w3.org/2000/svg"
                 width="80px"
                 fill-rule="evenodd"
                 stroke-linejoin="round"
                 stroke-miterlimit="2"
                 clip-rule="evenodd"
                 viewBox="0 0 24 24"
                 id="github">
                <g transform="translate(-40 -40)">
                    <rect width="24" height="24" x="40" y="40" fill="none"></rect>
                    <path fill="white" d="M15.806,1.428C17.35,0.382 18.247,-0.292 18.815,-0.454C19.223,-0.57 19.566,-0.541 19.868,-0.421C20.222,-0.28 20.574,0.02 20.835,0.628C21.368,1.872 21.464,3.254 21.117,4.551C22.009,5.676 22.501,7.074 22.501,8.52C22.501,10.984 21.869,12.668 20.927,13.838C19.839,15.19 18.309,15.88 16.692,16.237C16.938,16.84 17.047,17.497 17.001,18.159L17.001,22C17.001,22.535 16.553,22.97 16,22.97C15.447,22.97 14.999,22.535 14.999,22L14.999,18.13C14.999,18.105 15,18.081 15.002,18.056C15.056,17.365 14.813,16.682 14.33,16.184C14.071,15.917 13.99,15.531 14.12,15.186C14.25,14.842 14.569,14.598 14.946,14.556C16.57,14.375 18.268,13.987 19.348,12.646C20.075,11.742 20.499,10.424 20.499,8.52C20.498,7.369 20.057,6.261 19.264,5.428C19.01,5.161 18.931,4.781 19.058,4.44C19.404,3.515 19.405,2.498 19.066,1.576C18.978,1.625 18.883,1.681 18.799,1.737C18.264,2.09 17.55,2.621 16.57,3.278C16.325,3.442 16.017,3.492 15.73,3.414C13.615,2.841 11.385,2.841 9.27,3.414C8.983,3.492 8.675,3.442 8.43,3.278C7.198,2.452 6.305,2.138 5.799,2.018C5.604,2.817 5.651,3.661 5.942,4.44C6.069,4.781 5.99,5.161 5.736,5.428C4.937,6.267 4.495,7.386 4.501,8.55C4.501,10.437 4.925,11.745 5.651,12.646C6.734,13.987 8.438,14.385 10.067,14.588C10.44,14.634 10.755,14.879 10.882,15.222C11.01,15.565 10.928,15.948 10.671,16.213C10.194,16.706 9.951,17.38 9.999,18.064C10.001,18.086 10.001,18.108 10.001,18.13L10.001,18.993L10.002,19.001L10.001,19.009L10.001,22C10.001,22.535 9.553,22.97 9,22.97C8.447,22.97 7.999,22.535 7.999,22L7.999,20.224C6.867,20.397 5.997,20.275 5.298,20.012C4.329,19.647 3.663,18.992 3.103,18.306C2.816,17.955 2.562,17.599 2.283,17.309C2.124,17.143 1.965,16.993 1.75,16.939C1.215,16.805 0.892,16.276 1.03,15.758C1.169,15.239 1.715,14.927 2.25,15.061C3.057,15.262 3.664,15.836 4.241,16.558C4.73,17.171 5.194,17.943 6.135,18.242C6.62,18.397 7.221,18.414 7.999,18.253L7.999,18.155C7.959,17.499 8.07,16.85 8.315,16.254C6.696,15.884 5.162,15.189 4.074,13.841C3.131,12.673 2.499,10.999 2.499,8.555C2.491,7.097 2.984,5.685 3.883,4.551C3.536,3.254 3.632,1.872 4.165,0.628C4.28,0.361 4.511,0.157 4.797,0.072C4.797,0.072 6.166,-0.474 9.183,1.431C11.361,0.916 13.629,0.915 15.806,1.428Z" transform="matrix(.89878 0 0 .9278 41.202 41.588)"></path>
                </g>
            </svg>
            <div class="modal-header">
                <span>Добро пожаловать<br> в Learn Git Branching!</span>
            </div>
            <div class="modal-content">
                <p>
                    <slot name="content" />
                    Это приложение создано, чтобы помочь новичкам постичь мощные возможности ветвления и работы с git.
                    Мы надеемся, что вам понравится эта игра и может вы что-то усвоите!
                </p>
            </div>
            <div class="modal-tasks">
                <div
                    v-for="level in levels"
                    :key="level.id"
                    class="modal-tasks__level"
                    @click="goToTasks(level.id, level.title_level)"
                    @keyup.enter="goToTasks(level.id, level.title_level)"
                >
                    <div class="modal-tasks__level-card">
                        <div>
                            <el-icon
                                v-for="id in level.id"
                                :key="id"
                                size="32px"
                            >
                                <Star />
                            </el-icon>
                        </div>
                        <span style="text-align: center">{{ level.title_level }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Api from '@/services/api';
import { onMounted, Ref, ref } from 'vue';
import { Levels } from '@/services/types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Router, useRouter } from 'vue-router';

const router: Router = useRouter();
const levels: Ref<Levels | null> = ref(null);

const goToTasks = (id: number, title: string) => {
    router.push(`/tasks/${id}/${title}`);
};

onMounted(async () => {
    Api.getLevels()
        .then((response: Levels) => {
            levels.value = response;
        });
});
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
#github {
    margin-bottom: -10px;
}
.container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}
.modal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    width: 60%;
    height: fit-content;
    border-radius: 8px;
    box-sizing: border-box;
    //box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    &-header {
        width: 100%;
        padding: 10px;
        text-align: center;
        font-size: 34px;
        line-height: 50px;
        font-weight: 500;
    }
    &-content {
        font-weight: 300;
        width: 100%;
        padding: 10px;
        font-size: 15px;
        line-height: 25px;
        text-align: center;
    }
    &-footer {
        display: flex;
        justify-content: space-around;
        width: 100%;
        padding: 10px;
    }
    &-tasks {
        display: inline-flex;
        flex-wrap: wrap;
        padding: 10px;
        gap: 50px;
        width: 100%;
        justify-content: space-between;
        &__level {
            flex: 1;
            border-radius: 4px;
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
            height: 150px;
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
                transform: scale(1.15);
            }
        }
    }
}
</style>
