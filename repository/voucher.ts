import {http} from "#/utils/http";
import useSWR from "swr";

const url = {
    findVoucher(page: number, page_size: number, type:string, status: string) {
        return `/vouchers?page=${page}&page_size=${page_size}&type=${type}&status=${status}`
    },
    findOneVoucher(id: string) {
        return `/vouchers/${id}`
    }
}

const hooks = {
    useFindVoucher(page: number, page_size: number, type:string, status: string) {
        return useSWR(url.findVoucher(page, page_size, type, status), http.get)
    }
}

const api = {
    findOneVoucher(id: string){
        return http.get(url.findOneVoucher(id))
    }
}

export const voucherRepository = {
    url, hooks, api
}
