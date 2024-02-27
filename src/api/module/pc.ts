import request from '@/utils/request'

export const pcApi = {
    list: () => {
        return request.get('/pc.list');
    },
    detail: (id: number) => {
        return request.get('/pc.detail?id=' + id);
    },
    batch: (param: any) => {
        return request.post('/pc.batch', param);
    },
    import: (param: any) => {
        return request.post('/pc.import', param);
    },
    create: (param: any) => {
        return request.post('/pc.modify', param);
    },
    modify: (param: any) => {
        return request.post('/pc.modify', param);
    },
    delete: (params: any) => {
        return request.get('/pc.delete', { params });
    }
}

