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
