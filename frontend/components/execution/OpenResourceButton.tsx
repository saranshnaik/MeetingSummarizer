// Open link button

"use client"

import { Button } from "@/components/ui/button"


interface OpenResourceButtonProps {
    
    resourceUrl?: string
}


export default function OpenResourceButton({
    resourceUrl
}: OpenResourceButtonProps) {

    if (!resourceUrl) {
        return null
    }

    return (
        <a
            href={resourceUrl}
            target="_blank"
            rel="noopener noreferref"
        >
            
            <Button
                className="rounded-xl"
                variant="outline"
                size="sm"
            >
                Open Resource
            </Button>
        
        </a>
    )
}
