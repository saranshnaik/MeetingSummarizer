// Helper functions

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { ActionItem } from "@/types/action"


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}


export function validateAction(
	action: ActionItem,
	status: string,
) {

	const loading = status === "loading"

	const isCompleted = status === "success"

    const isEmail = action.type === "email"

	const isTaskOrReminder = 
		action.type === "task" ||
		action.type === "reminder"

	const assignee = action.assignee?.trim() || ""

	const hasAssignee = assignee.length > 0

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(assignee)

	const isMeeting = action.type === "meeting"

	const hasStartTime = !!action.start_time

	const hasEndTime = !!action.end_time

	const hasDueDate = !!action.due_date

	const hasValidMeetingTimes = 
		hasStartTime && 
		hasEndTime &&
		new Date(action.end_time!) > new Date(action.start_time!)

    const isLocked = 
        status === "success" || 
        status === "cancelled"
    
    const isConfirmDisabled = 
        isCompleted ||
        isLocked ||
        loading ||
        (
            isEmail &&
            !isValidEmail
        ) || (
			isTaskOrReminder &&
			hasAssignee &&
			!isValidEmail
		)
		|| (
			isTaskOrReminder &&
			hasAssignee &&
			isValidEmail &&
			!hasDueDate
		)
		|| (
			isMeeting &&
			!hasValidMeetingTimes
		)

		return {
			loading,

			isCompleted,

			isEmail,
			isValidEmail,
			
			isTaskOrReminder,
			
			assignee,
			hasAssignee,
			
			isMeeting,
			hasStartTime,
			hasEndTime,
			hasDueDate,
			hasValidMeetingTimes,

			isLocked,
			isConfirmDisabled
		}
}
