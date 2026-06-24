// Register page

"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock, Mail, User } from "lucide-react"

import { useAuth } from "@/hooks/useAuth"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


export default function RegisterPage() {

	const { registerUser } = useAuth()

	const [fullName, setFullName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const [loading, setLoading] = useState(false)

	const [error, setError] = useState("")

	const router = useRouter()

	const [fieldErrors, setFieldErrors] = useState({
		fullName: "",
		email: "",
		password: ""
	})

	async function handleRegister() {

		const errors = {
			fullName: "",
			email: "",
			password: ""
		}

		if (!fullName.trim()) {
			errors.fullName = "Name cannot be blank"
		}

		if (!email.trim()) {
			errors.email = "Email cannot be blank"
		}

		if (!password.trim()) {
			errors.password = "Password cannot be blank"
		}

		setFieldErrors(errors)

		if (errors.fullName || errors.email || errors.password) {
			return
		}

		
		try {
			
			setLoading(true)

			setError("")

			await registerUser(
				fullName,
				email,
				password
			)

			router.replace("dashboard")

		} catch (err) {

			console.error(err)
			
			setError("Failed to register user")
		
		} finally {

			setLoading(false)

		}
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

							Create Account

						</CardTitle>

						<CardDescription>

							Register to access meeting processing and action execution.

						</CardDescription>
						
					</div>

				</CardHeader>

				<CardContent className="space-y-6 flex-col justify-center">

					<div className="grid grid-cols-[0.25fr_0.75fr] items-center gap-2">

						<label className="text-sm font-medium text-right">

							Full Name:

						</label>

						<div className="relative">

							<div className="relative">

								<User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

								<Input
									type="text"
									placeholder="Enter your full name"
									value={fullName}
									onChange={(e) => { 
										setFullName(e.target.value)

										if (fieldErrors.fullName) {
											setFieldErrors(prev => ({
												...prev,
												fullName: ""
											}))
										}
									}}
									className="pl-10 h-fill rounded-lg w-[250px]"
								/>

							</div>

							{fieldErrors.fullName && (
								<p className="pl-2 text-xs text-red-600">
									{fieldErrors.fullName}
								</p>
							)}
						
						</div>

					</div>

					<div className="grid grid-cols-[0.25fr_0.75fr] items-center gap-2">

						<label className="text-sm font-medium text-right">

							Email:

						</label>

						<div className="relative">

							<div className="relative">

								<Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

								<Input
									type="email"
									placeholder="Enter your email"
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
								placeholder="Enter your password"
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
						onClick={handleRegister}
						disabled={loading}
					>

						{loading	
							? "Creating user..."
							: "Register"
						}

					</Button>

					<div className="text-center text-sm text-muted-foreground">

						Already have an account?{" "}

						<Link
							href="/login"
							className="text-primary hover:underline"
						>

							Login

						</Link>

					</div>

				</CardContent>

			</Card>
			
		</div>
	)
}
