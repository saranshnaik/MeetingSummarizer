// Prompt tabs

"use client"

import { motion } from "framer-motion"

import { usePrompts } from "@/hooks/usePrompts"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function PromptTabs() {

	const {
		selectedPromptType,
		setSelectedPromptType,
	} = usePrompts()


	return (
		<Tabs
			value={selectedPromptType}
			onValueChange={setSelectedPromptType}
		>

			<TabsList className="grid w-fit grid-cols-2 rounded-xl p-0.75">

				{[
					{
						value: "system",
						label: "System Prompts"
					},
					{
						value: "user",
						label: "User Prompts"
					}
				].map(({ value, label }) => 

					<TabsTrigger 
						key={value}
						value={value}
						className="relative rounded-xl bg-transparent data-[state=active]:bg-transparent data=[state=active]:text-foreground"
					>

						{selectedPromptType === value && (

							<motion.div	
								layoutId="prompt-type-tab"
								className="absolute inset-0 z-0 rounded-xl bg-background shadow-sm"
								transition={{
									type: "spring",
									stiffness: 400,
									damping: 30
								}}

							/>
						)}

						<span className="relative z-10">

							{label}

						</span>

					</TabsTrigger>
				)}
					
			</TabsList>		

		</Tabs>	
	)
}
