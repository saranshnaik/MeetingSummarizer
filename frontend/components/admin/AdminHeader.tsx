// Admin header

"use client"

import { Shield } from "lucide-react"

import { Badge } from "@/components/ui/badge"


export default function AdminHeader() {

	return (

		<div className="grid grid-cols-[1fr_auto_auto] gap-4 ">

			<div className="space-y-1">

				<div className="flex items-center gap-2">

					<Shield className="h-6 w-6 text-primary" />

					<h1 className="text-3xl font-bold tracking-tight">

						Admin Panel

					</h1>
					
				</div>

				<p className="text-muted-foreground">

					Manage prompts, logs, evaluations, and system configuration

				</p>

			</div>

			<Badge
				variant="secondary"
				className="w-fit rounded-xl px-3 py-1 h-7"
			>

				Admin Access

			</Badge>
			
		</div>
	)
}
