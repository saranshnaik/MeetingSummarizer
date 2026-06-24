// Auth provider

"use client"

import React, { useEffect } from "react"

import { useAuthStore } from "@/store/authStore"

import { getToken, isTokenExpired } from "@/lib/jwt"

import { getCurrentUser } from "@/services/authService"


export default function AuthProvider({
	children
}: { children: React.ReactNode }) {

	const hydrateAuth = useAuthStore(
		(state) => state.hydrateAuth
	)

	const logout = useAuthStore(
		(state) => state.logout
	)
	
	const setHydrated = useAuthStore(
		(state) => state.setHydrated
	)

	useEffect(() => {

		async function hydrate() {

			try {

				const token = getToken()

				if (!token) {
					logout()
					return
				}

				if (isTokenExpired(token)) {
					logout()
					return
				}

				const freshUser = await getCurrentUser()

				hydrateAuth(
					token,
					freshUser
				)

			} catch (error) {
				
				console.error("Auth hydration failed:", error)
				logout()

			} finally {

				setHydrated()

			}
		}

		hydrate()

	}, [
		hydrateAuth,
		logout,
		setHydrated
	])

	return <>{children}</>
}
