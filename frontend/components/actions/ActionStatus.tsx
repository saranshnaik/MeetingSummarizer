// Action status

"use client"

import { ActionItem } from "@/types/action"

import { useActionState } from "@/hooks/useActionState"


export default function ActionStatus({
	action
}: {
	action: ActionItem
}) {

	const { status } = useActionState(action.id)


	if (status === "success") {

		return (
			<p className="text-sm text-green-600 font-medium">
				Action executed successfully
			</p>
		)
	}


	if (status === "failed") { 
		
		return (
			<p className="text-sm text-red-600 font-medium">
				Action execution failed
			</p>
		)
	}


	if (status === "cancelled") { 
		
		return (
			<p className="text-sm text-muted-foreground font-medium">
				Action cancelled
			</p>
		)
	}
	

	return null
}
