// Prompts hook

"use client"

import { useEffect, useState } from "react"

import { createPrompt, getLatestPrompt, getPromptNames, getPromptVersions, rollbackPrompt } from "@/services/promptService"

import { usePromptStore } from "@/store/promptStore"


export function usePrompts() {

	const {

		currentPrompt,
		setCurrentPrompt,
		
		loading,
		setLoading,

		error,
		setError,

		selectedPrompt,
		setSelectedPrompt,

		selectedPromptType,
		setSelectedPromptType,

		versions,
		setVersions

	} = usePromptStore()

	const [promptNames, setPromptNames] = useState<string[]>([])


	useEffect(() => {
		loadPromptNames(selectedPromptType)
	}, [selectedPromptType])


	useEffect(() => {
		if (selectedPrompt) {
			loadPrompt()
		}
	}, [selectedPrompt])


	async function loadPrompt() {
		try {

			setLoading(true)
			setError("")

			const latest = await getLatestPrompt(
				selectedPrompt
			)

			const versionHistory = await getPromptVersions(
				selectedPrompt
			)

			setCurrentPrompt(latest)
			setVersions(versionHistory)

		} catch (err) {

			console.error(err)
			setError("Failed to load prompt")

		} finally {
			
			setLoading(false)

		}
	}


	async function savePrompt(
		content: string,
		createdBy: string
	) {
		try {

			setLoading(true)
			setError("")

			await createPrompt({
				prompt_name: selectedPrompt,
				prompt_type: selectedPromptType,
				content,
				created_by: createdBy
			})

			await loadPrompt()

		} catch (err) {
			
			console.error(err)
			setError("Failed to save prompt")

		} finally {

			setLoading(false)

		}
	}


	async function rollback(
		prompt_name: string,
		version: number
	) {
		try {

			setLoading(true)
			setError("")

			await rollbackPrompt(
				prompt_name,
				version
			)

			await loadPrompt()

		} catch (err) {

			console.error(err)
			setError("Failed to rollback prompt")

		} finally {

			setLoading(false)

		}
	}

	
	async function loadPromptNames(
		promptType: string
	) {
		try {

			const names = await getPromptNames(
				promptType
			)

			setPromptNames(names)

			if (names.length > 0) {
				setSelectedPrompt(names[0])
			} else {
				setSelectedPrompt("")
			}

			if (!selectedPrompt && names.length > 0){
				setSelectedPrompt(names[0])
			}

		} catch (err) {

			console.error(err)
			setError("failed to load prompt names.")
			
		}
	}

	return {

		currentPrompt,
		setCurrentPrompt,
		
		loading,
		setLoading,

		error,
		setError,

		selectedPrompt,
		setSelectedPrompt,

		selectedPromptType,
		setSelectedPromptType,

		versions,
		setVersions,

		promptNames,

		loadPrompt,
		savePrompt,
		rollback
	}
}
