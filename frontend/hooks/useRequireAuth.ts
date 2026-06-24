// Protected route hook

"use client"

import { useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"

import { AuthUser } from "@/types/auth"

import { useAuthStore } from "@/store/authStore"


interface RequireAuthOptions {
	
	adminOnly?: boolean,
	
	redirectTo?: string
}


export function useRequireAuth(
	options: RequireAuthOptions = {}
) {

	const {
		adminOnly = false
	} = options

	const router = useRouter()

	const {
		isAuthenticated,
		user,
		hasHydrated
	} = useAuthStore()


	function checkAuthorization(
		isAuthenticated: boolean,
		user: AuthUser | null,
		adminOnly: boolean
	) {

		if (!isAuthenticated || !user) {
			return {
				authorized: false,
				redirect: "/login"
			}
		}

		if (adminOnly && user.role !== "admin") {
			return {
				authorized: false,
				redirect: "/dashboard"
			}
		}

		return {
				authorized: true,
				redirect: null
			}
	}

	const authResult = useMemo(
		() => checkAuthorization(
			isAuthenticated, 
			user, 
			adminOnly
		), 
		[isAuthenticated, user, adminOnly]
	)

	useEffect(() => {
		if (!hasHydrated) return

		if (!authResult.authorized) {
			router.replace(authResult.redirect!)
		}
	}, [authResult, hasHydrated, router])


	return {
		isAuthenticated,
		isAuthorized: authResult.authorized,
		hasHydrated,
		user
	}
}
