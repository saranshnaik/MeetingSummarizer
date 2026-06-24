// Prompt editor

"use client"

import { Textarea } from "@/components/ui/textarea"


interface PromptEditorProps {
	
	disabled: boolean
	
	loading?: boolean
	
	selectedPrompt: string | null
	
	value: string
	
	onChange: (
		value: string
	) => void
}


export default function PromptEditor({
	disabled,
	loading,	
	selectedPrompt,
	value,
	onChange
}: PromptEditorProps) {

	const isPrompt = selectedPrompt !== null

	return (
		<div className="space-y-2">

			<label className="text-sm font-medium">

				Edit Prompt:

			</label>

			<Textarea
				value={value}
				onChange={(e) =>
					onChange(e.target.value)
				}
				placeholder="Enter prompt..."
				className="min-h-[300px] rounded-xl font-mono text-sm"
				disabled={disabled || loading || !isPrompt}
				spellCheck={false}
			/>
			
		</div>
	)
}
