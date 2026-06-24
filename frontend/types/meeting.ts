// Meeting schema

import { ActionItem } from "./action"
import { ApiResponse } from "./api"


export interface Summary {

    text: string
}


export interface MeetingData {

    actions: ActionItem[]

    meeting_id?: string
    
    summary: Summary
}


export type MeetingResponse = ApiResponse<MeetingData>
