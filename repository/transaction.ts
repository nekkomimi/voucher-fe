import {http} from "#/utils/http";
import useSWR from "swr";

const url = {
	getTransaction() {
		return `/transaction`
	},
	findTransactionWithRange() {
		return `/transaction/with-range`
	},
	findTransaction(page: number, pageSize: number, status: string) {
		return `/transaction?page=${page}&page_size=${pageSize}&status=${status}`
	},
	approveTransaction(id: string) {
		return `/transaction/${id}/approve`
	},
	rejectTransaction(id: string) {
		return `/transaction/${id}/reject`
	},
	findOneTransaction(id: string) {
		return `/transaction/${id}`
	},
	findOneByRefId(id: string){
		return `/transaction/success/${id}`
	}
}

const hooks = {
	useTransaction(page: number, pageSize: number, status: string) {
        return useSWR(url.findTransaction(page, pageSize, status), http.get)
    },
	useFindOneTransaction(id: string) {
		return useSWR(url.findOneTransaction(id), http.get)
	},
	useFindTransactionWithRange() {
		return useSWR(url.findTransactionWithRange(), http.get)
	}
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
	},
	findOneByRefId(id: string) {
		return http.get(url.findOneByRefId(id))
	},
	findOneTransaction(id: string) {
		return http.get(url.findOneTransaction(id))
	}
}

export const transactionRepository = {
	url, hooks, api
}
