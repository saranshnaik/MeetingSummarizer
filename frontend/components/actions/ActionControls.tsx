// Action buttons

"use client"

import { ActionItem } from "@/types/action"

import { useActionState } from "@/hooks/useActionState"
import { useActions } from "@/hooks/useActions"

import CancelButton from "./CancelButton"
import ConfirmButton from "./ConfirmButton"


export default function ActionControls({
	action
}: {
	action: ActionItem
}) {

	const { 
		loading, 
		isConfirmDisabled,
		isLocked
	} = useActionState(action.id)

	const  {
        confirmAction,
        cancelAction,
    } = useActions()


	return (
		<div className="flex gap-3 pt-4">

			<ConfirmButton 
				onClick={() => confirmAction(action)}
				loading={loading}
				disabled={isConfirmDisabled}
			/>

			<CancelButton 
				onClick={() => cancelAction(action)}
				disabled={isLocked || loading}
				
			/>

		</div>
	)
}
