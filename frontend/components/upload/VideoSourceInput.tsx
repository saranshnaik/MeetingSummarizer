// YT URL input

"use client"

import { Link2, X } from "lucide-react"

import { Input } from "@/components/ui/input"
import { useMeeting } from "@/hooks/useMeeting";


export default function VideoSourceInput({
    disabled = false
}: {
    disabled?: boolean
}) {

    const {
        sourceUrl,
        setSourceUrl
    } = useMeeting()


    function detectSourceType(url:  string) {
        if (url.includes("youtube.com") || url.includes("youtu.be")) {
            return "YouTube"
        }
        if (url.includes("drive.google.com")) {
            return "Google Drive"
        }
        if (url.toLowerCase().endsWith(",mp4")) {
            return "Direct MP4"
        }
        return "External URL"
    }


    return (
        <div className="">

            <label className="text-sm font-medium">
                
                Video URL
                
            </label>

            <div className="relative">

                <Link2 className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />

                <Input
                    placeholder="YouTube, Google Drive, or .mp4 URL"
                    value={sourceUrl}
                    onChange={(e) =>
                        setSourceUrl(e.target.value)
                    }
                    className="pl-10 rounded-xl w-full h-11"
                    disabled={disabled}
                />

                {sourceUrl && !disabled && (

                    <button 
                        type="button"
                        onClick={() => setSourceUrl("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
                    >

                        <X className="h-4 w-4" />

                    </button>
                )}

            </div>

            {sourceUrl && (
                <p className="text-xs text-muted-foreground">
                    Detected Source:{" "}
                    {detectSourceType(sourceUrl)}
                </p>
            )}

            {disabled && (

                <p className="pl-2 pt-1 text-xs text-muted-foreground">
                    Remove uploaded audio to use URL input

                </p>
            )}

        </div>
    )
}
