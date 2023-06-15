import { Node } from '@/models/types';

export interface Levels {
    levels: {
        id: number;
        'title_level': string;
        image: string | null;
        description: string;
    }[]
}

export interface Tasks {
    tasks: {
        id: number;
        level: number;
        solve: boolean;
        'info_set': {
            title: string,
            'infodetail_set': {
                id: number;
                content: string;
            }[]
        }
    }
}

export interface NodeResponse {
    data: string,
    command: string,
    'remote_data': Node[] | null,
    code: number,
}
