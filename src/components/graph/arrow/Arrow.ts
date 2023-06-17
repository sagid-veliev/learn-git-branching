import { Component, createApp } from 'vue';

class GitArrow {
    componentArrow: Component | null;

    x1: number;

    x2: number;

    y1: number;

    y2: number;

    // top: number;

    // left: number;

    instance: Component | null;

    // classNumber: number;

    solve?: boolean;

    constructor(x1: number, y1: number, x2: number, y2: number, solve?: boolean) {
        this.componentArrow = null;
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
        // this.top = top;
        // this.left = left;
        this.instance = null;
        // this.classNumber = classNumber;
        this.solve = solve;
    }

    createArrow() {
        debugger;
        const parentElement = document.querySelector('#app');
        const wrapperDiv = document.createElement('div');
        wrapperDiv.className = `arrow-${Math.round(this.x1)}-${Math.round(this.y1)}`;
        parentElement?.appendChild(wrapperDiv);
        // let parentElement;
        // if (!this.solve) {
        //     document.body.appendChild(wrapperDiv);
        // } else {
        //     parentElement = document.querySelector('#solve');
        //     if (parentElement) {
        //         parentElement.appendChild(wrapperDiv);
        //     }
        // }
        if (this.componentArrow) {
            this.instance = createApp(this.componentArrow, {
                x1: this.x1,
                x2: this.x2,
                y1: this.y1,
                y2: this.y2,
            });
            this.instance.mount(`.arrow-${Math.round(this.x1)}-${Math.round(this.y1)}`);
        }
    }
}

export default GitArrow;
