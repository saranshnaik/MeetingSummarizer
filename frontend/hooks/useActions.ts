// Manage extracted/confirmed actions

"use client"

import { ActionItem } from "@/types/action"

import { executeAction } from "@/services/actionService"

import { useActionStore } from "@/store/actionStore"
import { useWebsocketStore } from "@/store/websocketStore"


export function useActions() {

    const {
        
        actions,
        setActions,
        updateAction,
        resetActions,
        
        statuses,
        setStatus,

        results,
        setResult

    } = useActionStore()

    const { clearEvents } = useWebsocketStore()


    async function confirmAction(
        action: ActionItem
    ) {

        try {

            clearEvents()

            setStatus(action.id, "loading")

            const result = await executeAction(action)

            setResult(action.id, result.data)
            
            const status = 
                (result.data.status !== "failed" && result.data.status !== "blocked") 
                    ? "success" 
                    : "failed"
            
            setStatus(action.id, status)
            
        } catch (err) {

            console.error(err)

            setStatus(action.id, "failed")

        }
    }

    
    function cancelAction(
        action: ActionItem
    ) {
        setStatus(action.id, "cancelled")
    }

    return {
        actions,
        setActions,
        updateAction,
        resetActions,
        
        statuses,
        setStatus,

        results,
        setResult,

        confirmAction,
        cancelAction
    }
}
