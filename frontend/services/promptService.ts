// prompt service

import api from "@/lib/axios"

import { PromptCreate, PromptResponse } from "@/types/prompt"


export async function getLatestPrompt(
	promptName: string | null
): Promise<PromptResponse> {
	
	const response = await api.get(
		`/admin/prompts/${promptName}/latest`
	)

	return response.data
}


export async function createPrompt(
	payload: PromptCreate
): Promise<PromptResponse> {
	
	const response = await api.post(
		`/admin/prompts/`,
		payload
	)

	return response.data
}


export async function getPromptVersions(
	promptName: string | null
): Promise<PromptResponse[]> {
	
	const response = await api.get(
		`/admin/prompts/${promptName}`
	)

	return response.data
}


export async function rollbackPrompt(
	promptName: string | null,
	version: number
): Promise<PromptResponse> {
	
	const response = await api.post(
		`/admin/prompts/${promptName}/rollback/${version}`
	)

	return response.data
}


export async function getPromptNames(
	promptType?: string
): Promise<string[]> {
	
	const response = await api.get(
		`/admin/prompts/names`,
		{
			params: {
				prompt_type: promptType
			}
		}
	)

	return response.data
}
