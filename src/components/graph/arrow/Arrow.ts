import { Component, ComponentOptions, createApp } from 'vue';

interface Coordinates {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

class GitArrow {
    componentArrow: Component | null;

    arrow: Coordinates[]

    instance: ComponentOptions | null;

    solve?: boolean;

    constructor(arrow: Coordinates[], solve?: boolean) {
        this.componentArrow = null;
        this.arrow = arrow;
        this.instance = null;
        this.solve = solve;
    }

    createArrow() {
        const parentElement = document.querySelector('#app');
        const wrapperDiv = document.createElement('div');
        const id = Math.floor(Math.random() * 1000);
        wrapperDiv.className = `arrow-${id}`;
        parentElement?.appendChild(wrapperDiv);
        if (this.componentArrow) {
            this.instance = createApp(this.componentArrow, {
                arrows: this.arrow,
            });
            this.instance.mount(`.arrow-${id}`);
        }
    }

    updateArrow(newArrow: Coordinates[]) {
        this.arrow = newArrow;
        if (this.instance) {
            this.instance.props.arrows = this.arrow;
        }
    }
}

export default GitArrow;
