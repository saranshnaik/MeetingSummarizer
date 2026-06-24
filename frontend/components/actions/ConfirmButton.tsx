// Confirm Button

"use client"

import { Button } from "../ui/button"


interface ConfirmButtonProps {
    
    disabled?: boolean
    
    loading?: boolean
    
    onClick: () => void
}


export default function ConfirmButton({
    onClick,
    disabled = false,
    loading = false
}: ConfirmButtonProps) {

    return (
        <Button
            onClick={onClick}
            disabled={disabled || loading}
            className="h-9 px-4 rounded-xl text-sm"
        >
            
            {loading
                ? "Executing..."
                : "Confirm"
            }
        
        </Button>
    )
}
