import {http} from "#/utils/http";
import useSWR from "swr";

const url = {
    findCMS() {
        return `/cms`
    },
    findOneCMS(id: string) {
        return `/cms/${id}`
    }
}

const hooks = {
    useFindCMS() {
        return useSWR(url.findCMS(), http.get)
    }
}

const api = {
    findOneCMS(id: string){
        return http.get(url.findOneCMS(id))
    }
}

export const cmsRepository = {
    url, hooks, api
}
