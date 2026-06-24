// auth service

import api from "@/lib/axios"

import { AuthResponse, LoginPayload, RegisterPayload, AuthUser } from "@/types/auth"


export async function login(
	payload: LoginPayload
): Promise<AuthResponse> {
	
	const response = await api.post(
		"/auth/login",
		payload
	)

	return response.data
}


export async function register(
	payload: RegisterPayload
): Promise<AuthResponse> {
	
	const response = await api.post(
		"/auth/register",
		payload
	)

	return response.data
}


export async function getCurrentUser(): Promise<AuthUser> {

	const response = await api.get(
		"/auth/me"
	)	

	return response.data
}
