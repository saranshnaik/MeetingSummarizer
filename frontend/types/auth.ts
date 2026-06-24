// Auth types


export interface LoginPayload {
	
	email: string

	password: string
}


export interface RegisterPayload{

	full_name: string

	email: string

	password: string
}


export interface AuthUser {

	id: number
	
		is_active: boolean

	email: string

	full_name: string

	role: string
}


export interface AuthResponse {

	access_token: string

	token_type: string

	user: AuthUser
}


export interface DecodedToken {
	
	email: string
	
	exp: number
	
	role: string

	sub: string
}


// export interface UserResponse {

// 	email: string

// 	role: string
	
// }


// export interface LoginResponse {

// 	access_token: string

// 	token_type: string

// 	user: UserResponse

// }
