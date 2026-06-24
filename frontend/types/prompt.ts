// Prompt type


export interface PromptResponse {

	content: string

	created_at: string

	created_by: string

	id: number
	
	is_active: boolean

	prompt_name: string

	prompt_type: string

	version: number
}


export interface PromptCreate {

	content: string

	created_by: string

	prompt_name: string | null

	prompt_type: string
}


export interface PromptRollback {

	prompt_name: string

	version: number
}
