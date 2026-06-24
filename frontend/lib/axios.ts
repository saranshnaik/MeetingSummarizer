// axios lib

import axios from "axios"

import { API_BASE_URL } from "./api"

import { getToken } from "./jwt"

import { useAuthStore } from "@/store/authStore"


const api = axios.create({
	baseURL: API_BASE_URL
})


api.interceptors.request.use((config) => {

	const token = getToken()

	if (token) {

		config.headers.Authorization = `Bearer ${token}`
	}

	return config
})


api.interceptors.response.use(
	(response) => response,

	(error) => {

		const requestUrl = error.config?.url || ""

		const isAuthRoute = 
			requestUrl.includes("auth/login") ||
			requestUrl.includes("auth/register")
		
		if (error.response?.status === 401 && !isAuthRoute) {

			useAuthStore
				.getState()
				.logout()

			if (window.location.pathname !== "/login") {
				window.location.href = "/login"
			}
		}

		return Promise.reject(error)
	}
)


export default api
