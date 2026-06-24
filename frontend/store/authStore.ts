// Auth store

import { create } from "zustand"

import { AuthUser } from "@/types/auth"

import { clearAuth, saveAuth } from "@/lib/jwt"


interface AuthState {

	hasHydrated: boolean
	
	isAuthenticated: boolean

	token: string | null

	user: AuthUser | null

	hydrateAuth: (
		token: string,
		user: AuthUser
	)=> void	

	logout: () => void
	
	setAuth: (
		token: string,
		user: AuthUser
	) => void

	setHydrated: () => void
}


export const useAuthStore = create<AuthState>((set) => ({

	hasHydrated: false,

	isAuthenticated: false,

	token: null,

	user: null,
	
	hydrateAuth:(
		token, 
		user
	) => 
		set({
			token,
			user,
			isAuthenticated: true
		}),

	logout: () => {
		
		clearAuth()

		set({
			token: null,
			user: null,
			isAuthenticated: false
		})
	},
		
	setAuth: (token, user) => {		
		saveAuth(token, user)

		set({
			token,
			user,
			isAuthenticated: true
		})
	},

	setHydrated: () =>
		set({
			hasHydrated: true
		})
}))
