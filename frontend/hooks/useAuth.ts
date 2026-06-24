// Auth hoook

"use client"

import { useRouter } from "next/navigation"

import { login, register } from "@/services/authService"

import { useAuthStore } from "@/store/authStore"
import { useActionStore } from "@/store/actionStore"
import { useMeetingStore } from "@/store/meetingStore"


export function useAuth() {

	const router = useRouter()

	const {
		setAuth,
		logout,
	} = useAuthStore()

	const { resetMeeting } = useMeetingStore()

	const { resetActions } = useActionStore()


	async function loginUser(
		email: string,
		password: string	
	) {
		
		const data = await login({
			email,
			password
		})

		setAuth(
			data.access_token,
			data.user
		)

		if (data.user.role === "admin") {
			
			router.push("/admin")
		} else {
			
			router.push("/dashboard")
		}
	}


	async function registerUser(
		full_name: string,
		email: string,
		password: string
	) {
		
		const data = await register({
			full_name,
			email,
			password
		}) 

		setAuth(
			data.access_token,
			data.user
		)

		router.push("/dashboard")
	}


	async function logoutUser() {

		resetMeeting()
		resetActions()
		logout()

		router.push("/login")
	}

	return {
		loginUser,
		registerUser,
		logoutUser
	}
}
