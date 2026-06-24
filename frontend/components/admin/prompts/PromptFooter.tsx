// Prompt footer

"use client"

import React, { useEffect } from "react"

import { ChevronLeft, ChevronRight } from "lucide-react"

import { usePrompts } from "@/hooks/usePrompts"

import { useAuthStore } from "@/store/authStore"


import { Button } from "@/components/ui/button"


interface PromptFooterProps {

	selectedVersionIndex: number

	setSelectedVersionIndex: React.Dispatch<React.SetStateAction<number>>

	editedContent: string

	setEditedContent: React.Dispatch<React.SetStateAction<string>>

	hasChanges: boolean
}


export default function PromptFooter({
	selectedVersionIndex,
	setSelectedVersionIndex,

	editedContent,
	setEditedContent,

	hasChanges

}: PromptFooterProps) {

	const { user } = useAuthStore()

	const {
		selectedPrompt,

		currentPrompt,
		versions,

		loading,
		error,

		savePrompt,

		rollback

	} = usePrompts()

	const displayedPrompt = versions[selectedVersionIndex]

	const showRollbackButton = 
		displayedPrompt && 
		!displayedPrompt.is_active

	const showSaveButton =
		displayedPrompt && 
		displayedPrompt.is_active


	useEffect(() => {
		
		if (!displayedPrompt) return

		setEditedContent(displayedPrompt.content)
		
	}, [displayedPrompt])


	async function handleSave() {

		if (!editedContent.trim()) return

		await savePrompt(
			editedContent,
			user?.email || "admin"
		)
	}


	function handleReset() {

		if (!currentPrompt) return

		setEditedContent(currentPrompt.content)

		const activeIndex = versions.findIndex(
			(v) => v.is_active
		)

		if (activeIndex >= 0) {
			setSelectedVersionIndex(activeIndex)
		}
	}
	

	async function handleRollback() {

		if (!displayedPrompt) return

		await rollback(
			displayedPrompt.prompt_name,
			displayedPrompt.version
		)
		
	}


	return (
		<div>
			<div className="rounded-xl border bg-muted/30 px-4 py-3">

				<div className="flex items-center justify-between">

					<Button
						size="icon"
						variant="outline"
						className="rounded-lg"
						disabled={selectedVersionIndex >= versions.length - 1}
						onClick={() => 
							setSelectedVersionIndex(
								(prev) => prev + 1
							)
						}
					>

						<ChevronLeft className="h-4 w-4" />

					</Button>


					<div className="text-center">

						<p className="font-medium text-sm">

							Version {displayedPrompt.version}

							{displayedPrompt.is_active && (
								<span className="ml-2 text-green-600">
									(Active)
								</span>
							)}

						</p>

						<p className="text-xs text-muted-foreground">

							{versions.length - selectedVersionIndex}
							{" / "}
							{versions.length}

						</p>

					</div>

					<Button
						size="icon"
						variant="outline"
						className="rounded-lg"
						disabled={selectedVersionIndex === 0}
						onClick={() => 
							setSelectedVersionIndex(
								(prev) => prev - 1
							)
						}
					>

						<ChevronRight className="h-4 w-4" />

					</Button>

				</div>

				<div className="mt-4 grid grid-cols-3 gap-4 text-sm">

					<div>

						<p className="font-medium">

							Created By

						</p>

						<p className="text-muted-foreground">

							{displayedPrompt.created_by}

						</p>

					</div>


					<div className="text-center">

						<p className="font-medium">

							Created At

						</p>

						<p className="text-muted-foreground">

							{new Date(displayedPrompt.created_at)
								.toLocaleString("en-GB")
							}

						</p>

					</div>

					<div className="text-right">

						<p className="font-medium">

							Status

						</p>

						<p className={
							displayedPrompt.is_active
							? "text-green-600"
							: "text-muted-foreground"
						}
						>

							{displayedPrompt.is_active
								? "Active"
								: "Inactive"
							}

						</p>

					</div>
				</div>

			</div>

			{selectedPrompt && error && (

				<div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">

					<p className="text-sm text-red-600">

						{error}

					</p>

				</div>

			)}
		
			<div className="flex justify-end gap-3 pt-3">

				<Button
					variant="outline"
					className="rounded-xl"
					onClick={handleReset}
					disabled={!hasChanges || loading}
				>

					Reset

				</Button>

				{showRollbackButton && (

					<Button
						variant="secondary"
						className="rounded-xl"
						onClick={handleRollback}
						disabled={loading}
					>

						{loading
							? "Rolling Back..."
							: "Rollback"
						}

					</Button>

				)}

				{showSaveButton && (

					<Button
						variant="default"
						className="rounded-xl"
						onClick={handleSave}
						disabled={!hasChanges || loading}
					>

						{loading && hasChanges
							? "Saving..."
							: "Save Prompt"
						}

					</Button>
				)}

			</div>
		</div>
	)
}
