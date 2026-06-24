// Prompts manager

"use client"

import { useEffect, useMemo, useState } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { usePrompts } from "@/hooks/usePrompts"

import PromptSelector from "./PromptSelector"
import PromptEditor from "./PromptEditor"
import PromptFooter from "./PromptFooter"
import PromptTabs from "./PromptTabs"


export default function PromptManager() {

	const {
		selectedPrompt,

		selectedPromptType,
		versions,

		loading,

	} = usePrompts()

	const [editedContent, setEditedContent] = useState("")

	const [selectedVersionIndex, setSelectedVersionIndex] = useState(0)

	const displayedPrompt = versions[selectedVersionIndex]

	const isActiveVersion = displayedPrompt?.is_active ?? false

	const canEdit = isActiveVersion


	useEffect(() => {

		if (!versions.length) return

		const activeIndex = versions.findIndex(
			(v) => v.is_active
		)

		setSelectedVersionIndex(
			activeIndex >= 0 ? activeIndex : 0
		)
	}, [versions])


	useEffect(() => {		
		if (!displayedPrompt) return
		setEditedContent(displayedPrompt.content)
	}, [displayedPrompt])


	useEffect(() => {
		setSelectedVersionIndex(0)
	}, [selectedPromptType])


	useEffect(() => {
		setEditedContent("")
	}, [selectedPromptType])


	const hasChanges = useMemo(() => {
		if (!displayedPrompt) return false
		return (
			editedContent.trim() !== displayedPrompt.content.trim()
		)
	}, [editedContent, displayedPrompt])


	return (
		<Card className="rounder-2xl">

			<CardHeader>

				<CardTitle className="text-xl">

					{selectedPromptType === "system"
						? "System Prompts"
						: "User Prompts"
					}

				</CardTitle>

				<CardDescription>

					Configure and version AI prompts used across agents

				</CardDescription>

			</CardHeader>

			<CardContent className="space-y-6">

				<PromptTabs />			
				
				<PromptSelector />
			
				<PromptEditor
					selectedPrompt={selectedPrompt}
					value={editedContent}
					onChange={setEditedContent}
					loading={loading}
					disabled={!canEdit}
				/>

				{displayedPrompt && (

					<PromptFooter
						selectedVersionIndex={selectedVersionIndex}
						setSelectedVersionIndex={setSelectedVersionIndex}
						editedContent={editedContent}
						setEditedContent={setEditedContent}
						hasChanges={hasChanges}
					/>

				)}

			</CardContent>

		</Card>
	)
}
