import {http} from "#/utils/http";
import useSWR from "swr";

const url = {
	getTransaction() {
		return `/transaction`
	},
}

const hooks = {
	
}

const api = {
    useTransaction() {
        return useSWR(url.getTransaction, http.get)
    }
}

export const transactionRepository = {
	url, hooks, api
}
