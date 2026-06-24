// Websocket service

import { useWebsocketStore } from "@/store/websocketStore"

import { API_BASE_URL } from "@/lib/api"


class WebsocketService {

	private socket: WebSocket | null = null

	private heartbeat: NodeJS.Timeout | null = null

	private reconnectTimeout: NodeJS.Timeout | null = null

	private userId: string | null = null

	private shouldReconnect = true


	connect(
		userId: string
	) {

		if (
			this.socket &&
			(
				this.socket.readyState === WebSocket.OPEN ||
				this.socket.readyState === WebSocket.CONNECTING
			)
		) {
			return
		}

		const wsUrl = 
			`${API_BASE_URL.replace("http", "ws")}/ws/${userId}`

		this.userId = userId

		this.shouldReconnect = true

		this.socket = new WebSocket(wsUrl)

		this.socket.onopen = () => {

			console.log("[WS] Connected", wsUrl)
			
			useWebsocketStore
				.getState()
				.setConnected(true)

			this.heartbeat = setInterval(() => {

				this.socket?.send("ping")
			}, 30000)
		}

		this.socket.onmessage = (
			event
		) => {

			try {

				const data = JSON.parse(
					event.data
				)
				
				useWebsocketStore
					.getState()
					.addEvent({
						...data
					})

			} catch (error) {
				console.error("[WS] parse error", error)
			}
		} 

		this.socket.onclose = () => {

			console.log("[WS] Disconnected")

			useWebsocketStore
				.getState()
				.setConnected(false)

			this.socket = null

			if (
				this.shouldReconnect &&
				this.userId
			) {
				this.reconnectTimeout = 
					setTimeout(() => {

						console.log("[WS] Reconnecting...")

						this.connect(
							this.userId!
						)
					}, 2000)
			}

			if (this.heartbeat) {

				clearInterval(this.heartbeat)

				this.heartbeat = null
			}
		}

		this.socket.onerror = (
			error
		) => {
			console.error("[WS] Error", error)
		}
	}


	disconnect() {

		this.shouldReconnect = false

		if (this.reconnectTimeout) {

			clearTimeout(this.reconnectTimeout)

			this.reconnectTimeout = null

		}

		if (this.heartbeat) {

			clearInterval(this.heartbeat)

			this.heartbeat = null
		}

		if (this.socket) {

			this.socket.close()
			this.socket = null
		}
	}
}


export const websocketService = new WebsocketService()
