// Action card header

"use client"

import { ActionItem } from "@/types/action"

import { useActionState } from "@/hooks/useActionState"

import { CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"


interface ActionHeaderProps {
	
    action: ActionItem

    updateField: (
        field: keyof ActionItem,
        value: string | Date | null
    ) => void
}


export default function ActionHeader({
	action,
	updateField
}: ActionHeaderProps) {

    const {
        isLocked,
        loading,
    } = useActionState(action.id)


	return (
		<CardHeader className="space-y-3">

            <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3">

                <CardTitle className="text-lg">
                    
                    <Input
                        className="w-full"
                        value={action.title}
                        onChange={(e) =>
                            updateField(
								"title",
								e.target.value
                            )
                        }
                        disabled={isLocked || loading}
                    />

                </CardTitle>

                <div className="flex justify-center">

                    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium capitalize">
                        
                        {action.type}

                    </span>

                </div>

                <div className="flex justify-end relative group overflow-visible">

                    <span 
                        className={`
                            rounded-full px-3 py-1 text-xs font-medium capitalize
                            ${
                                action.priority === "high"
                                    ? "bg-red-100 text-red-700"
                                    : action.priority === "medium"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-green-100 text-green-700"
                            }
                        `}
                    >

                        {action.priority}

                    </span>

                    <span className="
                            absolute left-1/2 -translate-x-1/2 top-full mt-2
                            bg-white text-gray-700 border border-gray-200 rounded-md
                            px-2 py-1 text-xs whitespace-nowrap shadow-lg z-50
                            opacity-0 invisible transition-opacity duration-250 
                            group-hover:opacity-100 group-hover:visible"
                    >
                        Priority
                    </span>

                </div>

            </div>

        </CardHeader>
	)
}
