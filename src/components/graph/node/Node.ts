import { Component, createApp } from 'vue';

class GitNode {
    componentNode: Component | null;

    id: number;

    instance: Component | null;

    name: string;

    top: number;

    left: number;

    constructor(name: string, top: number, left: number) {
        this.componentNode = null;
        this.id = Math.floor(Math.random() * 1000);
        this.instance = null;
        this.name = name;
        this.top = top;
        this.left = left;
    }

    createNode() {
        const wrapperDiv = document.createElement('div');
        wrapperDiv.className = `node-${this.top}`;
        const parentElement = document.querySelector('#app');
        if (parentElement) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
            document.body.appendChild(wrapperDiv);
        }
        if (this.componentNode) {
            this.instance = createApp(this.componentNode, {
                name: this.name,
                top: this.top,
                left: this.left,
            });
            this.instance.mount(`.node-${this.top}`);
        }
    }
}

export default GitNode;
