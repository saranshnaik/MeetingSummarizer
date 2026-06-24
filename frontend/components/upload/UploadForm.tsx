// Upload form

"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import { useMeeting } from "@/hooks/useMeeting"

import AudioUpload from "./AudioUpload"
import VideoSourceInput from "./VideoSourceInput"


export default function UploadForm() {

	const {
		loading,
		selectedFile,
		sourceUrl,
		process
	} = useMeeting()

	const hasUrl = sourceUrl.trim().length > 0

	const hasFile = !!selectedFile

	const canSubmit = hasUrl || hasFile


	async function handleSubmit() {
        
        await process(
            selectedFile || undefined,
            sourceUrl || undefined
        )        
    }

	
	return (
		<Card className="w-full max-w-3xl rounded-3xl border shadow-lg">

			<CardContent className="p-8 space-y-8">

				<div className="space-y-2 text-center">

					<h2 className="text-3xl font-bold tracking-tight">
						
						Upload Meeting

					</h2>

					<p className="text-muted-foreground">

						Upload a meeting recording or paste a video URL

					</p>

				</div>

				<AudioUpload disabled={hasUrl} />

				<div className="relative">

					<div className="absolute inset-0 flex items-center">

						<span className="w-full border-t" />
						
					</div>

					<div className="relative flex justify-center text-xs uppercase">

						<span className="bg-background px-2 text-muted-foreground">

							Or 

						</span>
					
					</div>

				</div>

				<VideoSourceInput disabled={hasFile} />

				<div className="py-3 flex justify-center">

					<Button
						variant="default"
						onClick={handleSubmit}
						disabled={loading || !canSubmit}
						className="h-11 px-4 rounded-xl text-base"
					>
						{loading 
							? "Processing...  "
							: "Process Meeting"
						}
						
					</Button>

				</div>

			</CardContent>

		</Card>
	)
}
