// Shown if error

"use client"

import { getErrorMessage } from "@/lib/error"
import { Card, CardContent } from "@/components/ui/card"


interface ErrorCardProps {

    error?: unknown
}


export default function ErrorCard({
    error
}: ErrorCardProps) {

    if (!error) {
        return null
    }

    return (
        <Card className="w-full max-w-3xl rounded-3xl border border-red-500 bg-red-50 p-4 text-sm text-red-700 shadow-lg">

            <CardContent className="rounded-lg bg-red-50 text-sm text-red-700">
                                
                {getErrorMessage(error)}

            </CardContent>

        </Card>
    )
}
