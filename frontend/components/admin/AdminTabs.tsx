// Admin tabs

"use client"

import { motion } from "framer-motion"
import { BarChart3, Brain, Terminal } from "lucide-react"
import { useState } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import AnalyticsPanel from "./AnalyticsPanel"
import LogsPanel from "./LogsPanel"
import PromptManager from "./prompts/PromptManager"


export default function AdminTabs() {

	const [tab, setTab] = useState("prompts")

	return (
		<Tabs	
			value={tab}
			onValueChange={setTab}
			className="space-y-6"
		>

			<TabsList className="grid w-full grid-cols-3 rounded-xl p-0.75">

				{[
					{ value: "prompts", label: "Prompts", icon: Brain },
					{ value: "logs", label: "Logs", icon: Terminal },
					{ value: "analytics", label: "Analytics", icon: BarChart3 },
				].map(({ value, label, icon: Icon }) => (
					
					<TabsTrigger
						key={value}
						value={value}
						className="relative rounded-xl bg-transparent data-active:bg-transparent data-active:text-foreground"
					>

						{tab === value && (
							<motion.div	
								layoutId="active-tab"
								className="absolute inset-0 z-0 rounded-xl bg-background shadow-sm"
								transition={{
									type: "spring",
									stiffness: 400,
									damping: 30,
								}}
							/>
						)}

						<span className="relative z-10 flex items-center gap-2">

							<Icon className="h-4 w-4" />

							{label}

						</span>

					</TabsTrigger>
				))}

			</TabsList>

			<TabsContent value="prompts">

				<PromptManager />	

			</TabsContent>

			<TabsContent value="logs">

				<LogsPanel />

			</TabsContent>

			<TabsContent value="analytics">

				<AnalyticsPanel />		

			</TabsContent>

		</Tabs>
	)
}
