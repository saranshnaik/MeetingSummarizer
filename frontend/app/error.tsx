// Custom error card

"use client"

import { useEffect } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { getErrorMessage } from "@/lib/error"
import ErrorCard from "@/components/feedback/ErrorCard"


export default function Error({
	error,
	reset
}:{
	error: Error
	reset: () => void
}) {

	reset()
	
	useEffect(() => {
		toast.error(getErrorMessage(error))
	}, [error])

	return (
		<div className="flex min-h-screen items-center justify-center">
			
			<div className="p-6 items-center justify-center text-center">

				<h2 className="text-xl font-semibold">
					Something went wrong
				</h2>

				<ErrorCard error={error} />

				<Button
					variant="outline"
					type="button"
					className="mt-4 rounded-lg px-4 py-2"
					// onClick={() => reset()}
					onClick={() => location.reload()}
				>
					Try again
				</Button>

			</div>
		</div>
	)
}
