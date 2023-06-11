import { createStore } from 'vuex';

interface State {
    isSolved: boolean;
    branches: string[];
    currentBranch: string;
}

export default createStore({
    state: {
        isSolved: false,
        branches: ['main'],
        currentBranch: 'main',
    },
    getters: {
    },
    mutations: {
        isSolved(state: State, payload: boolean) {
            state.isSolved = payload;
        },
        addToBranches(state: State, payload: string) {
            state.branches.push(payload);
        },
        addCurrentBranch(state: State, payload: string) {
            state.currentBranch = payload;
        },
    },
    actions: {
    },
    modules: {
    },
});
