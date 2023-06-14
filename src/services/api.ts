import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Levels, Tasks } from '@/services/types';
import { Node } from '@/models/types';

class Api {
    private api: AxiosInstance = axios;

    async getLevels(): Promise<Levels> {
        const response: AxiosResponse = await this.api.get('/api/v1/levels');
        return response.data.levels;
    }

    async getTasks(id: number): Promise<Tasks> {
        const response: AxiosResponse = await this.api.get(`/api/v1/tasks/${id}/`);
        return response.data.tasks;
    }

    async getTask(id: number): Promise<Tasks> {
        const response: AxiosResponse = await this.api.get(`/api/v1/task_info/${id}`);
        return response.data.tasks;
    }

    async getGraph(id: number): Promise<any> {
        const response: AxiosResponse = await this.api.get(`/api/v1/grapth/${id}`);
        return response.data;
    }

    async graphWork(node: Node, command: string, taskId: number): Promise<any> {
        const response: AxiosResponse = await this.api.post('/api/v1/graph_work', {
            data: node,
            command,
            taskId,
        });
        return response.data;
    }
}

export default new Api();
