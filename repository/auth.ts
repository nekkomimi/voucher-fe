import {http} from "#/utils/http";
import useSWR from "swr";

const url = {
	login() {
		return `/auth/login`
	},
}

const hooks = {
	
}

const api = {
    login(data: any) {
        return http.post(url.login()).send(data)
    }
}

export const authRepository = {
	url, hooks, api
}
