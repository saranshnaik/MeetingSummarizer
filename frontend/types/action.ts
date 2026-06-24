// Action schema


export interface ActionItem {
    
    assignee: string | null

    completed: boolean
    
    description?: string | null

    due_date?: string | null

    end_time?: string | null
    
    id: string

    priority: "low" | "medium" | "high"

    start_time?: string | null
    
    title: string

    type:
        | "task"
        | "email"
        | "meeting"
        | "reminder"
}


export interface ActionList {
    
    actions: ActionItem[]
}
