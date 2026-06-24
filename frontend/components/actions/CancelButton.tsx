// Cancel Button

"use client"

import { Button } from "../ui/button"


interface CancelButtonProps {
    
    disabled?: boolean
    
    loading?: boolean
    
    onClick?: () => void
}


export default function CancelButton({
    onClick,
    disabled = false,
    loading = false
}: CancelButtonProps) {

    return (
        <Button
            variant="destructive"
            onClick={onClick}
            disabled={disabled || loading}
            className="h-9 px-4 rounded-xl text-sm"
        >

            Cancel
        
        </Button>
    )
}
