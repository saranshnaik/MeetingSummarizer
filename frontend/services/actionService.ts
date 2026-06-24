// POST to actions

import api from "@/lib/axios"

import { ActionItem } from "@/types/action"

import { ExecutionResponse } from "@/types/execution"


export async function executeAction(
    action: ActionItem
): Promise<ExecutionResponse> {

    const response = await api.post(
        `/action/execute`,
        action
    )
    
    return response.data
}
