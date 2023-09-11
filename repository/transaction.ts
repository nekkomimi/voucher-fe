import {http} from "#/utils/http";
import useSWR from "swr";

const url = {
	getTransaction() {
		return `/transaction`
	},
	approveTransaction(id: string) {
		return `/transaction/${id}/approve`
	},
	rejectTransaction(id: string) {
		return `/transaction/${id}/reject`
	}
}

const hooks = {
	useTransaction() {
        return useSWR(url.getTransaction, http.get)
    },
}

const api = {
	createTransaction(data: any) {
		return http.post(url.getTransaction()).send(data)
	},
	approveTransaction(id: string) {
		return http.post(url.approveTransaction(id))
	},
	rejectTransaction(id: string, data: any) {
		return http.post(url.rejectTransaction(id)).send(data)
	}
}

export const transactionRepository = {
	url, hooks, api
}
