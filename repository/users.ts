import {http} from "#/utils/http";
import useSWR from "swr";

const url = {
    findUsers(page: number, page_size: number) {
        return `/users?page=${page}&page_size=${page_size}`
    },
    findOneUsers(id: string) {
        return `/users/${id}`
    }
}

const hooks = {
    useFindUsers(page: number, page_size: number) {
        return useSWR(url.findUsers(page, page_size), http.get)
    }
}

const api = {
    findOneUsers(id: string){
        return http.get(url.findOneUsers(id))
    }
}

export const usersRepository = {
    url, hooks, api
}
