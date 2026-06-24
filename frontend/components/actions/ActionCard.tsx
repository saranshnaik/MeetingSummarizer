// Main Action card

"use client"

import { ActionItem } from "@/types/action"

import { Card, CardContent} from "@/components/ui/card"

import { useActions } from "@/hooks/useActions"
import { useActionState } from "@/hooks/useActionState"

import ActionHeader from "./ActionHeader"
import ActionDescription from "./ActionDescription"
import ActionMetadata from "./ActionMetadata"
import ActionControls from "./ActionControls"
import ActionStatus from "./ActionStatus"

import ExecutionResultCard from "../execution/ExecutionResultCard"
import ActionPipelineProgress from "../feedback/ActionPipelineProgress"


interface ActionCardProps {
   
    action: ActionItem
}


export default function ActionCard({
    action
}: ActionCardProps) {

    const  { updateAction } = useActions()
    
    const {
        action: currentAction,
        
        executionResult,
        
        loading,
        
        isLocked

    } = useActionState(action.id)


    function updateField(
        field: keyof ActionItem,
        value: string | Date | null
    ) {
        updateAction(currentAction.id, {
            [field]: value
        })
    }
    

    return (
        <Card className={`
            shadow-sm transition-opacity
            ${isLocked ? "opacity-70" : ""}
            h-full
            `}
        >

            <ActionHeader 
                action={currentAction}
                updateField={updateField}
            />

            <CardContent className="space-y-4">

                <ActionDescription
                    action={currentAction}
                    updateField={updateField}
                />

                <ActionMetadata
                    action={currentAction}
                    updateField={updateField}
                />

                <ActionControls action={action} />

                {loading && (

                    <ActionPipelineProgress actionId={action.id} />

                )}

                <ActionStatus action={action} />

                {executionResult && (

                    <ExecutionResultCard
                        result={executionResult}
                    />

                )}

            </CardContent>

        </Card>
    )
}
