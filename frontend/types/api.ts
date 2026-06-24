// API schema


export interface Meta {             // For additional enhancements in the future
    
    page?: number
    
    page_size?: number
    
    request_id?: string
    
    total?: number
}


export interface ApiResponse<T> {
    
    data: T
    
    message?: string
    
    meta?: Meta
    
    success: boolean
}


// export interface ErrorDetail {
//     code: string
//     message: string
//     field?: string
// }


// export interface ErrorResponse {
//     success: false
//     error: ErrorDetail
// }
