
import { defineStore } from "pinia"


export interface cacheState {
    category1: any[]
    category2: any[]
    category3: any[]
    [key: string]: any
}
export const useCacheStore = defineStore('cache-store', {
    state: (): cacheState => ({
        category1: [],
        category2: [],
        category3: [],
    }),
    actions: {
        async categorys(sort: number): Promise<any[]> {
            let list: any[] = []
            list = this["category" + sort]
            if (list.length == 0) {
                const res = await categoryApi.list(sort)
                if (res?.code == 200) {
                    this["category" + sort] = res.data
                    list = res.data
                }
            }
            return list
        }
    }
}) 