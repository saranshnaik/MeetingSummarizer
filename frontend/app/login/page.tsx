// Login page

"use client"

import { Lock, Mail } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

import { useAuth } from "@/hooks/useAuth"
import { useRequireAuth } from "@/hooks/useRequireAuth"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


export default function LoginPage() {

	const { isAuthenticated, user } = useRequireAuth()

	const { loginUser } = useAuth()

	const { hasHydrated } = useRequireAuth()

	const [email, setEmail] = useState("")

	const [password, setPassword] = useState("")

	const [loading, setLoading] = useState(false)

	const [error, setError] = useState("")

	const router = useRouter()

	const [fieldErrors, setFieldErrors] = useState({
		email: "",
		password: ""
	})

	useEffect(() => {

		if (!isAuthenticated || !user) return

		if (user.role === "admin") {
			router.replace("/admin")
		} else {
			router.replace("/dashboard")
		}
	}, [isAuthenticated, user, router])

	
	async function handleLogin() {
		
		const errors = {
			email: "",
			password: ""
		}

		if (!email.trim()) {
			errors.email = "Email cannot be blank"
		}

		if (!password.trim()) {
			errors.password = "Password cannot be blank"
		}

		setFieldErrors(errors)

		if (errors.email || errors.password) {
			return
		}

		try {
			
			setLoading(true)

			setError("")

			await loginUser(
				email,
				password
			)

		} catch (err) {

			console.error(err)
			
			setError("Invalid email or password")
		
		} finally {

			setLoading(false)

		}
	}

	if (!hasHydrated) {
		return null
	}

	if (isAuthenticated && user) {
		return null
	}

	return(

		<div  className="min-h-[80vh] flex items-center justify-center px-6">

			<Card className="w-full max-w-md border shadow-xl rounded-3xl">

				<CardHeader className="space-y-3 text-center">

					<div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
					
						<Lock className="h-7 w-7 text-primary" />

					</div>

					<div className="space-y-1">

						<CardTitle className="text-2xl font-bold tracking-tight">

							Login

						</CardTitle>

						<CardDescription>

							Sign in to manage prompts, evaluations, and system settings.

						</CardDescription>
						
					</div>

				</CardHeader>

				<CardContent className="space-y-6 flex-col justify-center">

					<div className="grid grid-cols-[0.25fr_0.75fr] items-center gap-2">

						<label className="text-sm font-medium text-right">

							Email:

						</label>

						<div className="relative">

							<div className="relative">

								<Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

								<Input
									type="email"
									placeholder="Enter admin email"
									value={email}
									onChange={(e) => {
										setEmail(e.target.value)

										if (fieldErrors.email) {
											setFieldErrors(prev => ({
												...prev,
												email: ""
											}))
										}
									}}
									className="pl-10 h-fill rounded-lg w-[250px]"
									/>
							
							</div>

							{fieldErrors.email && (
								<p className="pl-2 text-xs text-red-600">
									{fieldErrors.email}
								</p>
							)}
						
						</div>

					</div>

					<div className="grid grid-cols-[0.25fr_0.75fr] items-center gap-2">

						<label className="text-sm font-medium text-right">

							Password:

						</label>

						<div className="relative">
							
							<Input
								type="password"
								placeholder="Enter admin password"
								value={password}
								onChange={(e) => {
									setPassword(e.target.value)

									if (fieldErrors.password) {
										setFieldErrors(prev => ({
											...prev,
											password: ""
										}))
									}
								}}
								className="h-fill rounded-lg  w-[250px]"
							/>

							{fieldErrors.password && (
								<p className="pl-2 text-xs text-red-600">
									{fieldErrors.password}
								</p>
							)}

						</div>

					</div>

					{error && (

						<div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">

							<p className="text-sm text-red-600">

								{error}

							</p>

						</div>

					)}

					<Button
						variant="default"
						className="w-full h-11 rounded-xl text-base font-medium"
						onClick={handleLogin}
						disabled={loading}
					>

						{loading	
							? "Logging in..."
							: "Login"
						}

					</Button>

					<div className="text-center text-sm text-muted-foreground">

						Don&apos;t have an account?{" "}

						<Link
							href="/register"
							className="text-primary hover:underline"
						>

							Register

						</Link>

					</div>

				</CardContent>

			</Card>
			
		</div>
	)
}
