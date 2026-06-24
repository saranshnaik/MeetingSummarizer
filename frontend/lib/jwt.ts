// jwt helper

import { jwtDecode } from "jwt-decode"

import { AuthUser, DecodedToken } from "@/types/auth"


const TOKEN_KEY = "token"

const USER_KEY = "user"


export function saveAuth(
	token: string,
	user: AuthUser
) {

	localStorage.setItem(TOKEN_KEY, token)

	localStorage.setItem(
		USER_KEY, 
		JSON.stringify(user)
	)
}


export function clearAuth() {

	localStorage.removeItem(TOKEN_KEY)

	localStorage.removeItem(USER_KEY)
}


export function getToken() {

	if (typeof window === "undefined") {
		return null
	}

	return localStorage.getItem(TOKEN_KEY)
}


export function getStoredUser() {

	if (typeof window === "undefined") {
		return null
	}

	const user = localStorage.getItem(USER_KEY)

	if (!user) {
		return null
	}

	return JSON.parse(user)
}


export function decodeToken(
	token: string
) {

	return jwtDecode<DecodedToken>(token)
}


export function isTokenExpired(
	token: string | null
) {

	try {

		if (!token) {
			return true
		}

		const decoded = decodeToken(token)

		return decoded.exp * 1000 < Date.now()

	} catch {
		return true
	}
}
