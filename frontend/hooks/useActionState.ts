// Action state hook

"use client"

import { useMemo } from "react"

import { useActionStore } from "@/store/actionStore"

import { validateAction } from "@/lib/utils"


export function useActionState(
	actionId: string
) {

	const action = useActionStore(
		(state) => state.actions[actionId]
	)

	const status = useActionStore(
		(state) => state.statuses[actionId] || "idle"
	)

	const executionResult = useActionStore(
		(state) => state.results[actionId]
	)

	const validation = useMemo(
		() => validateAction(action, status),
		[action, status]
	)
	return {
		action,
		status,
		executionResult,
		...validation,
	}

	// return useActionStore(state => {

	// 	const action = state.actions[actionId]

	// 	const status = state.statuses[actionId] || "idle"

	// 	const executionResult = state.results[actionId]

	// 	const validation = validateAction(action, status)
		
	// 	return {
	// 		action,
	// 		status,
	// 		executionResult,
	// 		...validation,
	// 	}
	// })
}
