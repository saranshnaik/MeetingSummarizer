// When first load / user sitting idle

import { FileAudio } from "lucide-react"


export default function EmptyState() {

    return (
        <div className="rounded-xl border border-dashed p-10 text-center">

            <div className="flex justify-center mb-4">

                <FileAudio className="h-10 w-10 text-muted-foreground" />

            </div>

            <h2 className="text-lg font-semibold">
                No meeting processed yet
            </h2>

            <p className="text-sm text-muted-foreground mt-2">
                Upload an audio file or paste a YouTube link to begin.
            </p>

        </div>
    )
}
