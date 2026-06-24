// Websocket store

import { create } from "zustand"


export interface WebSocketEvent {

	event: string

	message: string

	timestamp: number

	action_id?: string
}


interface ActionStreamState {
	status: "idle" | "running" | "completed" | "failed"
	events: WebSocketEvent[]
	currentMessage?: string
}



interface WebSocketStore {
	
	connected: boolean

	events: WebSocketEvent[]

	actionsById: Record<string, ActionStreamState>

	setConnected: (
		connected: boolean
	) => void

	addEvent: (
		event: Omit<WebSocketEvent, "timestamp">
	) => void

	clearEvents: () => void
}


export const useWebsocketStore = create<WebSocketStore>(
	(set) => ({

		connected: false,

		events: [],

		actionsById: {},

		setConnected: (connected) => 
			set({
				connected
			}),

		addEvent: (event) => {
			set((state) => {

				const timestamp = Date.now()
				
				const nextEvents = [
					...state.events,
					{ ...event, timestamp }
				]
				
				let actionsById = state.actionsById || {}
				
				const actionId = event.action_id
				
				if (actionId) {
					const prev = actionsById[actionId] || {
						status: "idle",
						events: []
					}

					let status = prev.status

					if (event.event.endsWith("_started")) {
						status = "running"
					}

					if (event.event.endsWith("_completed")) {
						status = "completed"
					}

					if (event.event.endsWith("_failed")) {
						status = "failed"
					}

					actionsById = {
						...actionsById,
						[actionId]: {
							status,
							currentMessage: event.message,
							events: [
								...prev.events,
								{ ...event, timestamp }
							]
						}
					}
				}

				return {
					events: nextEvents,
					actionsById
				}
			})
		},

		clearEvents: () =>
			set({
				events: [],
				actionsById: {}
			})
	})
)
