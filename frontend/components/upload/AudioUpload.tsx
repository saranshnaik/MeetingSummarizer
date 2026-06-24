// Selecting and validating audio file (not connecting to backend)

"use client"

import React, { useRef,useState } from "react"

import { Upload } from "lucide-react"

import { useMeeting } from "@/hooks/useMeeting"


export default function AudioUpload({
    disabled = false
}: {
    disabled?: boolean
}) {

    const {
        selectedFile,
        setSelectedFile
    } = useMeeting()

    const inputRef = useRef<HTMLInputElement | null>(null)

    const [dragActive, setDragActive] = useState(false)


    function handleRemove() {

        setSelectedFile(null)

        if (inputRef.current) {
            inputRef.current.value = ""
        }
    }

    
    function handleDragOver(
        event: React.DragEvent<HTMLDivElement>
    ) {

        event.preventDefault()

        if (!disabled) {
            setDragActive(true)
        }
    }


    function handleDragLeave(
        event: React.DragEvent<HTMLDivElement>
    ) {
        event.preventDefault()

        setDragActive(false)
    }


    function handleDrop(
        event: React.DragEvent<HTMLDivElement>
    ) {
        event.preventDefault()

        setDragActive(false)

        if (disabled) {
            return
        }

        const file = event.dataTransfer.files?.[0]

        if (!file) {
            return
        }

        setSelectedFile(file)
    }


    return (
        <div className="space-y-3">

            <label className="text-sm font-medium">
                
                Upload Audio

            </label>

            <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
                    border-2 border-dashed rounded-2xl p-10 transition
                    ${
                        disabled
                            ? "opacity-50 cursor-not-allowed bg-muted/20"
                            : dragActive
                                ? "border-primary bg-primary/5"
                                : "hover:bg-muted/40 cursor-pointer"
                    }
                `}
            >
                            
                <input 
                    ref={inputRef}
                    type="file"
                    accept="audio/*, video/*"
                    onChange={(event) => {
                        const file = event.target.files?.[0]

                        if (file) {
                            setSelectedFile(file)
                        }
                    }}
                    className="hidden"
                    id="audio-upload"
                    disabled={disabled}
                />

                <label 
                    htmlFor="audio-upload"
                    className={`
                        flex  flex-col items-center gap-4
                        
                        ${
                            disabled
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                        }
                    `}
                >
                                
                    <Upload className="h-10 w-10 text-muted-foreground" />

                    <div className="text-center space-y-1">

                        <p className="font-medium">
                            Drag file or click to upload
                        </p>

                        <p className="text-sm text-muted-foreground">
                            Supported types: MP3, MP4, WAV, M4A, OGG
                        </p>

                    </div>

                </label>
     
            </div>

            {selectedFile && (

                <div className="flex items-center justify-between rounded-xl border border-green-200 bg-green-50 px-4 py-3">

                    <div className="min-w-0">

                        <p className="text-sm text-green-700 font-medium truncate">
                            
                            Selected: {selectedFile.name}
                        
                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={handleRemove}
                        className="text-sm font-medium text-red-600 hover:cursor-pointer hover:text-red-700 transition">

                            Remove

                        </button>

                </div>
                        
            )}

        </div>
    )
}
