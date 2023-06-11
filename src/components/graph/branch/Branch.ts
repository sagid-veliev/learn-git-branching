import { Component, ComponentOptions, createApp } from 'vue';

class GitBranch {
    componentBranch: Component | null;

    instance: ComponentOptions | null;

    name: string[];

    currentBranch: string;

    top: number;

    solve?: boolean;

    left?: number;

    constructor(name: string[], currentBranch: string, top: number, left?: number, solve?: boolean) {
        this.name = name;
        this.currentBranch = currentBranch;
        this.top = top;
        this.left = left;
        this.solve = solve;
        this.componentBranch = null;
        this.instance = null;
    }

    createBranch() {
        const wrapperDiv = document.createElement('div');
        wrapperDiv.className = `branch-${this.top}`;
        let parentElement;
        if (!this.solve) {
            parentElement = document.querySelector('#app');
            parentElement?.appendChild(wrapperDiv);
        } else {
            parentElement = document.querySelector('#solve');
            parentElement?.appendChild(wrapperDiv);
        }
        if (this.componentBranch) {
            this.instance = createApp(this.componentBranch, {
                name: this.name,
                currentBranch: this.currentBranch,
                top: this.top,
                left: this.left,
            });
            this.instance.mount(`.branch-${this.top}`);
        }
    }

    destroyBranch() {
        if (this.instance) {
            this.instance.unmount();
        }
    }
}

export default GitBranch;
