// Prompt state management

import { create } from "zustand"

import { PromptResponse } from "@/types/prompt"


interface PromptState {

	currentPrompt: PromptResponse | null

	error: string

	loading: boolean
	
	selectedPrompt: string | null
	
	selectedPromptType: string
	
	versions: PromptResponse[]
	
	setCurrentPrompt: (
		prompt: PromptResponse | null
	) => void
	
	setError: (
		error: string
	) => void

	setLoading: (
		loading: boolean
	) => void

	setSelectedPrompt: (
		value: string
	) => void	
	
	setSelectedPromptType: (
		value: string
	) => void	

	setVersions: (
		versions: PromptResponse[]
	) => void
}


export const usePromptStore = create<PromptState>((set) => ({

	currentPrompt: null,

	error: "",

	loading: false,

	selectedPrompt: null,

	selectedPromptType: "system",

	versions: [],

	setCurrentPrompt: (prompt) =>
		set({
			currentPrompt: prompt
		}),

	setError: (error) =>
		set({
			error
		}),

	setLoading: (loading) =>
		set({
			loading
		}),

	setSelectedPrompt: (value) =>
		set({
			selectedPrompt: value
		}),
		
	setSelectedPromptType: (value) =>
		set({
			selectedPromptType: value
		}),

	setVersions: (versions) =>
		set({
			versions
		})
}))
