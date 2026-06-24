// Admin stats

"use client"

import { Activity, BarChart3, Brain } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"


export default function AdminStats() {

	const stats = [
		{
			title: "Total Meetings",
			value:"--",
			icon: BarChart3
		},
		{
			title: "Actions Executed",
			value:"--",
			icon: Activity
		},
		{
			title: "Prompt Versions",
			value:"--",
			icon: Brain
		}
	]

	return (
		<div className="grid gap-4 md:grid-cols-3">

			{stats.map((stat) => {

				const Icon = stat.icon

				return (

					<Card 
						key={stat.title}
						className="rounded-2xl"
					>

						<CardContent className="flex items-center justify-between p-6">

							<div className="space-y-1">

								<p className="text-sm text-muted-foreground">

									{stat.title}
								
								</p>

								<p className="text-3xl font-bold">

									{stat.value}

								</p>

							</div>

							<Icon className="h-8 w-8 text-muted-foreground" />

						</CardContent>

					</Card>
				)
			})}

		</div>
	)
}
