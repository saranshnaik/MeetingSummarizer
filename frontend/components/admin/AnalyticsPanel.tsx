// Analytics panel

"use client"

import { BarChart3 } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


export default function AnalyticsPanel() {

	return (
		<Card className="rounded-2xl">

			<CardHeader>

				<CardTitle className="text-xl">

					Analytics Dashboard

				</CardTitle>

				<CardDescription>

					Monitor system performance and execution metrics

				</CardDescription>

			</CardHeader>

			<CardContent>

				<div className="flex items-center justify-center rounded-xl border border-dashed min-h-[400px]">
				
					<div className="text-center space-y-2">

						<BarChart3 className="mx-auto h-10 w-10 text-muted-foreground" />

						<p className="font-medium">

							Analytics coming soon

						</p>

						<p className="text-sm text-muted-foreground">

							Execution metrics, evaluations, and usage stats
						
						</p>

					</div>

				</div>

			</CardContent>

		</Card>
	)
}
