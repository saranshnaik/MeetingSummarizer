// Meetings hook

"use client"

import axios from "axios"

import { useActionStore } from "@/store/actionStore"
import { useMeetingStore } from "@/store/meetingStore"
import { useWebsocketStore } from "@/store/websocketStore"

import { processMeeting } from "@/services/meetingService"


export function useMeeting() {

    const {
        error,
        setError,

        loading,
        setLoading,

        selectedFile, 
        setSelectedFile,

        sourceUrl,
        setSourceUrl,

        summary,
        setSummary,

        resetMeeting
    } = useMeetingStore()

	const { setActions } = useActionStore()

	const { clearEvents } = useWebsocketStore()


	async function process(
        file?: File,
        youtubeLink?: string
    ) {

        try {

            clearEvents()
            setLoading(true)
            setError("")
        
            const data = await processMeeting(
                file,
                youtubeLink
            )

            setActions(data.data.actions)
            setSummary(data.data.summary.text)

        } catch (err: unknown) {

            console.error(err)

			setSummary("")
            setActions([])

			if (axios.isAxiosError(err)) {
                setError(
                    err?.response?.data?.detail || "Failed to process meeting."
                )
            } else {
                setError("Error processing meeting.")
            }
            
        } finally {
            setLoading(false)
        }
    }


    return {
		error,
        setError,

        loading,
        setLoading,

        selectedFile, 
        setSelectedFile,

        sourceUrl,
        setSourceUrl,

        summary,
        setSummary,

        resetMeeting,

		process
    }
}
