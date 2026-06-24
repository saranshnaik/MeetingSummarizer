// Action description

"use client"

import { ActionItem } from "@/types/action"

import { useActionState } from "@/hooks/useActionState"

import { Textarea } from "@/components/ui/textarea"


interface ActionDescriptionProps {
	
	action: ActionItem
	
	updateField: (
		field: keyof ActionItem,
		value: string | Date | null
	) => void
}


export default function ActionDescription({
	action,
	updateField
}: ActionDescriptionProps) {

	const {
		isLocked,
		loading
	} = useActionState(action.id)

	return (
		<Textarea
            value={action.description || ""}
            onChange={(e) => 
                updateField(
					"description",
					e.target.value
				)
            }
            disabled={isLocked || loading}
        />
	)
}
