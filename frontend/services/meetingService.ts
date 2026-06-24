// POST to meetings

import api from "@/lib/axios"

import { MeetingResponse } from "@/types/meeting"


export async function processMeeting(
    file?: File,
    sourceUrl?: string
): Promise<MeetingResponse> {
    
    const formData = new FormData()

    if (file) {
        formData.append("file", file)
    }

    if (sourceUrl) {
        formData.append("source_url", sourceUrl)
    }

    const response = await api.post(
        `/meeting/process`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            timeout: 1000 * 60 * 20
        }
    )

    return response.data
}
