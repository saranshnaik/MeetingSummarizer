// Universal navigation bar

"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"

import {  useAuth } from "@/hooks/useAuth"
import { useRequireAuth } from "@/hooks/useRequireAuth"


export default function Navbar() {

	const { isAuthenticated, user} = useRequireAuth()

	const{ logoutUser } = useAuth()
	
	
	return (
		<header className="border-b bg-background/80 backdrop-blur sticky top-0 z-50">

			<div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

				<div className="grid grid-cols-[auto_auto]">

					<div>

						<h1 className="text-2xl font-bold tracking-tight">
							Meeting Summarizer
						</h1>

						<p className="text-sm text-muted-foreground">
							AI Meeting Intelligence
						</p>
						
					</div>

					<div className="px-3 py-2">

						{isAuthenticated && (
							<Link href="/dashboard">

								<Button variant="outline">
									Home
								</Button>

							</Link>
						)}

						{isAuthenticated && user?.role === "admin" && (
							
							<Link href="/admin">

								<Button variant="outline" className="mx-3">
									Admin Dashboard									
								</Button>

							</Link>
						)}

					</div>
				
				</div>


				<div className="flex items-center gap-3">

					{isAuthenticated && (

						<Button 
							variant="destructive"
							onClick={logoutUser}
						>
							
							Logout

						</Button>

					)}
				</div>

			</div>

		</header>
	)
}
