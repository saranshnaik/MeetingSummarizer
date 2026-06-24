// Upload states

"use client"

import EmptyState from "@/components/feedback/EmptyState"
import ErrorCard from "@/components/feedback/ErrorCard"
import PipelineProgress from "@/components/feedback/PipelineProgress"

import { useMeeting } from "@/hooks/useMeeting"

import { getErrorMessage } from "@/lib/error"


export default function UploadStates({
	hasResults,
}: {
	hasResults: boolean
}) {

	const { error, loading } = useMeeting()

	if (loading) {

		return (
			<div className="flex justify-center w-full">

				<PipelineProgress />

			</div>
		)
	}

	if (error) {

		return (
			<div className="flex justify-center">

				<ErrorCard error={getErrorMessage(error)} />

			</div>
		)
	}

	if (!hasResults) {

		return (
			<div className="flex justify-center">

				<EmptyState />

			</div>
		)
	}

	return null
}
