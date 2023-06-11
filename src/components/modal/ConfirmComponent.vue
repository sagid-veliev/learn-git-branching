<template>
    <div class="confirm">
        <div class="confirm-text">
            Поздравляю! Вы нашли оптимальное решение!
        </div>
        <button @click="$router.push('/')" class="confirm-button">Перейти к задачам</button>
    </div>
    <div class="overlay"></div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.overlay {
    position: fixed;
    z-index: 100;
    width: 100%;
    height: 100%;
    background: rgb(0,0,0, 0.5);
}
.confirm {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
    position: absolute;
    z-index: 1000;
    top: 30px;
    left: calc(35%);
    width: 30%;
    padding: 20px;
    background: $background;
    color: white;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 6px;
    animation: slide;
    &-text {
        color: white;
        font-size: 14px;
    }
    &-button {
        padding: 10px;
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
</style>
