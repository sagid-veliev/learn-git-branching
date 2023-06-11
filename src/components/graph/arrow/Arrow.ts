import { Component, createApp } from 'vue';

class GitArrow {
    componentArrow: Component | null;

    top: number;

    instance: Component | null;

    classNumber: number;

    solve?: boolean;

    constructor(top: number, classNumber: number, solve?: boolean) {
        this.componentArrow = null;
        this.top = top;
        this.instance = null;
        this.classNumber = classNumber;
        this.solve = solve;
    }

    createArrow() {
        const wrapperDiv = document.createElement('div');
        wrapperDiv.className = `arrow-${this.classNumber}`;
        let parentElement;
        if (!this.solve) {
            document.body.appendChild(wrapperDiv);
        } else {
            parentElement = document.querySelector('#solve');
            if (parentElement) {
                parentElement.appendChild(wrapperDiv);
            }
        }
        if (this.componentArrow) {
            this.instance = createApp(this.componentArrow, {
                top: this.top,
            });
            this.instance.mount(`.arrow-${this.classNumber}`);
        }
    }
}

export default GitArrow;
