import { Component, ComponentOptions, createApp } from 'vue';

class GitNode {
    componentNode: Component | null;

    instance: ComponentOptions | null;

    name: string;

    top: number;

    left: number;

    solve?: boolean;

    constructor(name: string, top: number, left: number, solve?: boolean) {
        this.componentNode = null;
        this.instance = null;
        this.name = name;
        this.top = top;
        this.left = left;
        this.solve = solve;
    }

    createNode() {
        const wrapperDiv = document.createElement('div');
        wrapperDiv.className = `node-${this.top}-${Math.round(this.left)}`;
        let parentElement;
        if (!this.solve) {
            parentElement = document.querySelector('#app');
            parentElement?.appendChild(wrapperDiv);
        } else {
            parentElement = document.querySelector('#solve');
            parentElement?.appendChild(wrapperDiv);
        }
        if (this.componentNode) {
            this.instance = createApp(this.componentNode, {
                name: this.name,
                top: this.top,
                left: this.left,
            });
            this.instance.mount(`.node-${this.top}-${Math.round(this.left)}`);
        }
        console.log(this.instance);
    }

    destroyNode() {
        if (this.instance) {
            this.instance.unmount();
        }
    }
}

export default GitNode;
