# Websocket status updates

import asyncio
from collections import defaultdict

from fastapi import WebSocket


class WebSocketManager:


	def __init__(self):
		
		self.connections: dict[
			str,
			list[WebSocket]
		] = defaultdict(list)

		self.loop = None


	async def connect(
		self,
		user_id: str,
		websocket: WebSocket
	):
		
		await websocket.accept()

		if self.loop is None:
			self.loop = asyncio.get_running_loop()
			
		# logger.info(f"[WS] Connected user={user_id}")

		self.connections[user_id].append(
			websocket
		)


	def disconnect(
		self,
		user_id: str,
		websocket: WebSocket
	):	
		
		# logger.info(f"[WS] Disconnected user={user_id}")
		
		if user_id not in self.connections:
			return
		
		if websocket in self.connections[user_id]:
			self.connections[user_id].remove(websocket)

		if not self.connections[user_id]:
			del self.connections[user_id]

		
	async def send_to_user(
		self,
		user_id: str,
		payload: dict
	):
		
		if user_id not in self.connections:
			return
		
		dead_connections = []

		# logger.info(f"[WS] Sending to {user_id}: {payload}")

		for ws in self.connections[user_id]:
			try:
				await ws.send_json(payload)
			
			except Exception:
				dead_connections.append(ws)

		for ws in dead_connections:
			self.disconnect(user_id, ws)

		
manager = WebSocketManager()
