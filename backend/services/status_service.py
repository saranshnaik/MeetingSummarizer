# Websocket status service

import asyncio

from services.websocket_manager import manager


class StatusService:

	async def emit(
		self,
		user_id: str,
		event: str,
		message: str,
		action_id: str | None = None
	):
		
		await manager.send_to_user(
			user_id,
			{
				"action_id": action_id,
				"event": event,
				"message": message
			}
		)


	def emit_sync(
		self,
		user_id: str,
		event: str,
		message: str,
		action_id: str | None = None
	):
		
		if manager.loop is None:
			return
		
		asyncio.run_coroutine_threadsafe(
			self.emit(
				user_id=user_id,
				event=event,
				message=message,
				action_id=action_id
			),
			manager.loop
		)


	def _run_emit(
		self,
		user_id: str,
		event: str,
		message: str
	):
		
		asyncio.run(
			self.emit(
				user_id=user_id,
				event=event,
				message=message
			)
		)
		

status_service = StatusService()
