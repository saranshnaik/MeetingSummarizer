// Centralized actions storage

import { create } from "zustand"

import { ActionItem } from "@/types/action"
import { ExecutionResult } from "@/types/execution"


type ActionStatus = 
	| "idle"
	| "loading"
	| "success"
	| "failed"
	| "cancelled"


interface ActionState {

	actions: Record<string, ActionItem>
	
	results: Record<string, ExecutionResult>

	statuses: Record<string, ActionStatus>

	setActions: (actions: ActionItem[]) => void

	resetActions: () => void
	
	setResult: (
		id: string,
		result: ExecutionResult
	) => void
	
	setStatus: (
		id: string,
		status: ActionStatus
	) => void

	updateAction: (
		id: string,
		updates: Partial<ActionItem>
	) => void
}


export const useActionStore = create<ActionState>((set) => ({

	actions: {},

	results: {},

	statuses: {},

	setActions: (actions) =>
		set({ 
			actions: Object.fromEntries(
				actions.map((action) => [
					action.id,
					action
				])
			) 
		}),

	resetActions: () => {
		set({
			actions: {},
			results: {},
			statuses: {}
		})
	},
		
	setResult: (id, result) => 
		set((state) => ({
			results: {
				...state.results,
				[id]: result
			}
		})),

	setStatus: (id, status) =>
		set((state) => ({
			statuses: {
				...state.statuses,
				[id]: status
			}
		})),
	
	updateAction: (id, updates) =>
		set((state) => ({
			actions: {
				...state.actions,
				[id]: {
					...state.actions[id],
					...updates
				}
			}
		}))
}))
