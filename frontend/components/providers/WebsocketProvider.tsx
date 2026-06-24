// Websocket provider

"use client"

import React, { useEffect } from "react"

import { websocketService } from "@/services/websocketService"

import { useAuthStore } from "@/store/authStore"


export default function WebsocketProvider({
	children
}: {
	children: React.ReactNode
}) {

	const user = useAuthStore(
		(state) => state.user
	)

	useEffect(() => {
		if (!user?.id) {
			websocketService.disconnect()
			return
		}

		websocketService.connect(
			String(user.id)
		)

		return () => {
			websocketService.disconnect()
		}
	}, [user?.id])

	return children
}
