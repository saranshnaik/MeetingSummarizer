// Prompt selector

"use client"

import { Select, SelectContent, SelectItem,	SelectTrigger } from "@/components/ui/select"
import { usePrompts } from "@/hooks/usePrompts"


export default function PromptSelector() {

	const { 	
		selectedPrompt,
		setSelectedPrompt,
		promptNames 
	} = usePrompts()

	const formatPromptName = 
		(prompt: string) => prompt
			.replace(/_/g, " ")
			.replace(/\b\w/g, (char) => char.toUpperCase())


	return (
		<div className="space-y-2 flex items-center gap-3">

			<label className="text-sm font-medium pt-1 pr-1">

				Prompt Name:

			</label>

			<Select 
				value={selectedPrompt}
				onValueChange={(value)=> {
					if (value){
						setSelectedPrompt(value)
					}
				}}
			>

				<SelectTrigger className="rounded-xl w-[280px]">

					{selectedPrompt ?  (
						<span>{formatPromptName(selectedPrompt)}</span>
					) : (
						<span className="text-muted-foreground">Select Prompt</span>
					)}
					{/* <SelectValue placeholder="Select prompt" /> */}

				</SelectTrigger>

				<SelectContent className="rounded-xl w-full p-1 h-fill">

					{Object.values(promptNames).map((prompt) => (

						<SelectItem
							key={prompt}
							value={prompt}
							className="rounded-xl"
						>

							{formatPromptName(prompt)}
						
						</SelectItem>
					))}
				
				</SelectContent>

			</Select>
			
		</div>
	)
}
