// logs panel

"use client"

import { useEffect, useState } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import api from "@/lib/axios"


export default function LogsPanel() {

	// const [loading, setLoading] = useState(true)
	
	type LogEntry = {
		timestamp: string
		level: string
		source: string
		message: string
	}
	
	const [logs, setLogs] = useState<LogEntry[]>([])

	const getLevelClass = (level: string) => {
		switch (level) {
			case "ERROR":
				return "text-red-400"
			case "WARNING":
				return "text-yellow-400"
			case "INFO":
				return "text-blue-400"
			case "DEBUG":
				return "text-purple-400"
			default:
				return "text-slate-300"
		}
	}
	
	useEffect(() => {
		const fetchLogs = async () => {
			try {
				const res = await api.get(
					`/admin/logs/latest`
				)

				setLogs(res.data.logs ?? [])

			} catch (err) {
				console.error(err)
			} finally {
				// setLoading(false)
			}
		}

		fetchLogs()

		const interval = setInterval(fetchLogs, 5000)

		return () => clearInterval(interval)

	}, [])

	return (
		<Card className="rounded-2xl">

			<CardHeader>

				<CardTitle className="text-xl">

					System Logs

				</CardTitle>

				<CardDescription>

					View orchestration, execution, and reflection logs

				</CardDescription>

			</CardHeader>

			<CardContent>

				<div className="rounded-xl border bg-background h-[500px] overflow-auto">
				
					{/* {loading ? (
						
						<div className="p-4">Loading Logs...</div>

					) : logs.length === 0 ? (
						
						<div className="p-4">No logs available</div>

					) :  */}
					{/* ( */}
						<div className="font-mono text-xs">
							{logs.map((log, index) => (
								
								<div 
									key={index}
									className="grid grid-cols-[180px_80px_300px_1fr] gap-4 border-b px-4 py-2 hover:bg-muted/50"
								>
									
									<span className="text-muted-foreground">
										{log.timestamp}
									</span>

									<span className={getLevelClass(log.level)}>
										{log.level}
									</span>

									<span className="truncate text-muted-foreground">
										{log.source}
									</span>

									<span className="break-words">
										{log.message}
									</span>

								</div>
							))}

						</div>
					{/* ) */}

				</div>

			</CardContent>

		</Card>
	)
}
