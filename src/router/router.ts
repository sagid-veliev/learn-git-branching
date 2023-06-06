import ModalComponent from '@/components/ModalComponent.vue';
import TaskListComponent from '@/components/TaskListComponent.vue';
import TaskComponent from '@/components/TaskComponent.vue';
import PlaygroundView from '@/components/views/PlaygroundView.vue';
import PageNotFound from '@/components/PageNotFound.vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Main',
        component: ModalComponent,
    },
    {
        path: '/tasks/:id/:title',
        name: 'Tasks',
        component: TaskListComponent,
    },
    {
        path: '/task/:id/:title',
        name: 'Task',
        component: TaskComponent,
    },
    {
        path: '/playground/:id/:title',
        name: 'Playground',
        component: PlaygroundView,
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: PageNotFound,
    },
];

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
});

export default router;
