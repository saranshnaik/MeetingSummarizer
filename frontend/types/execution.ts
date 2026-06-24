// Execution schema


export interface ExecutionResult {

    error?: string

    provider?: string
    
    resource_id?: string
    
    resource_url?: string
    
    status: string
    
    title: string

    type: string
}


export interface ExecutionResponse {

    data: ExecutionResult
    
    message?: string

    success?: boolean
}
