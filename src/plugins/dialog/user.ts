import { render, createVNode } from "vue";
import DlgUser from './user.vue'

const defaultOptions: any = {
    onSuccess: (data: any) => { },
    onCancel: () => { }
}

export default (options?: Partial<any>) => {
    const {
        onSuccess,
        onCancel,
        ...otherOptions
    } = Object.assign({
        ...defaultOptions
    }, options || {});

    const container = document.createDocumentFragment();

    const dialog = createVNode(DlgUser, {
        ...otherOptions,
        onSuccess: (data: any) => {
            onSuccess && onSuccess(data);
            render(null, container as any);
        },
        onCancel: () => {
            onCancel && onCancel();
            render(null, container as any);
        }
    })
    render(dialog, container as any)
}