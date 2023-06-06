import { Component, createApp } from 'vue';

class GitArrow {
    componentArrow: Component | null;

    top: number;

    instance: Component | null;

    classNumber: number;

    constructor(top: number, classNumber: number) {
        this.componentArrow = null;
        this.top = top;
        this.instance = null;
        this.classNumber = classNumber;
    }

    createArrow() {
        const wrapperDiv = document.createElement('div');
        wrapperDiv.className = `arrow-${this.classNumber}`;
        const parentElement = document.querySelector('#app');
        if (parentElement) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            document.body.appendChild(wrapperDiv);
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
