// Action changeable data

"use client"

import { ActionItem } from "@/types/action"

import { useActionState } from "@/hooks/useActionState"

import { Input } from "@/components/ui/input"


interface ActionMetadataProps {
	
	action: ActionItem
	
	updateField: (
		field: keyof ActionItem,
		value: string | Date | null
	) => void
}


export default function ActionMetadata({
	action,
	updateField
}: ActionMetadataProps) {

	const {
		loading,
		
		assignee,
		hasAssignee,
		
		hasEndTime,
		hasStartTime,
		hasDueDate,
		hasValidMeetingTimes,
		
		isEmail,
		isValidEmail,
		isMeeting,
		isTaskOrReminder,
		
		isLocked
	} = useActionState(action.id)

	const requiresDueDate = 
		isTaskOrReminder &&
		hasAssignee &&
		isValidEmail

		
	return (
		<div className="gap-4">
                                                
			<div className="grid grid-cols-[100px_1fr] items-center gap-2">
				
				<label className="text-sm font-medium text-right">
					
					{isEmail ? (
						<>
							Recipient
							<sup className="text-red-500 ml-0.5">*</sup>
							:{" "}
						</>
					)
						: "Assignee: "}

				</label>

				<Input
					type={isEmail ? "email" : "text"}
					value={action.assignee || ""}
					onChange={(e) => 
						updateField(
							"assignee",
							e.target.value
						)
					}
					disabled={isLocked || loading}
					required={isEmail}
					placeholder={isEmail || isTaskOrReminder
						? "john@example.com"
						: "Assignee name"
					}
					className="w-fill"
				/>

			</div>
			
			{(isEmail  || isTaskOrReminder) && assignee.length > 0 && !isValidEmail && (
				<div className="grid grid-cols-[100px_1fr]">

					<div />
						
					<div>

						<p className="text-xs text-red-500 pl-3">
							Please enter a valid email address
						</p>

					</div>

				</div>			
			)}

			{isTaskOrReminder && (
				
				<div className="grid grid-cols-[100px_1fr] items-center gap-2 pt-4">
					
					<label className="text-sm font-medium text-right">
						Due: 
						{requiresDueDate && (
							<sup className="text-red-500 ml-0.5">*</sup>
						)}
					</label>

					<Input
						type="datetime-local"
						value={action.due_date?.slice(0, 16) || ""}
						onChange={(e) => 
							updateField(
								"due_date",
								e.target.value
							)
						}
						disabled={isLocked || loading}
						className="w-fill"
					/>

				</div>
			)}

			{requiresDueDate && !hasDueDate && (
				<div className="grid grid-cols-[100px_1fr]">
					<div />
					
					<div>
					
						<p className="text-xs text-red-500 pl-3">
							Please enter a due date
						</p>
					
					</div>

				</div>
			)}

			{isMeeting && (
				<div className="grid grid-cols-[100px_1fr] items-center gap-2 pt-4">
					
					<label className="text-sm font-medium text-right">
						Start Time:
					</label>

					<Input
						type="datetime-local"
						value={action.start_time?.slice(0, 16) || ""}
						onChange={(e) => 
							updateField(
								"start_time",
								e.target.value
							)
						}
						required={isMeeting}
						disabled={isLocked || loading}
						className="w-fill"
					/>
					
				</div>
			)}

			{isMeeting && !hasStartTime && (
				<div className="grid grid-cols-[100px_1fr]">
					<div />
					
					<div>
					
						<p className="text-xs text-red-500 pl-3">
							Please enter a start time
						</p>
					
					</div>

				</div>
			)}

			{isMeeting && (
				<div className="grid grid-cols-[100px_1fr] items-center gap-2 pt-4">
					
					<label className="text-sm font-medium text-right">
						End Time:
					</label>

					<Input
						type="datetime-local"
						value={action.end_time?.slice(0, 16) || ""}
						onChange={(e) => 
							updateField(
								"end_time",
								e.target.value
							)
						}
						required={isMeeting}
						disabled={isLocked || loading}
					/>
					
				</div>
			)}

			{isMeeting && !hasEndTime && (

				<div className="grid grid-cols-[100px_1fr]">
					<div />
					
					<div>
					
						<p className="text-xs text-red-500 pl-3">
							Please enter an end time
						</p>
					
					</div>

				</div>

			)}

			{isMeeting &&
			hasStartTime &&
			hasEndTime &&
			!hasValidMeetingTimes && (
				<div className="grid grid-cols-[100px_1fr]">
					<div />
					
					<div>
					
						<p className="text-xs text-red-500 pl-3">
							End time must be after start time
						</p>
					
					</div>

				</div>
			)}

		</div>
	)
}
