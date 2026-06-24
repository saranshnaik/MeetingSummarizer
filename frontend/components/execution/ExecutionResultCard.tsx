// Execution result card

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import ExecutionStatusBadge from "./ExecutionStatusBadge"

import OpenResourceButton from "./OpenResourceButton"

import { ExecutionResult } from "@/types/execution"


interface ExecutionResultCardProps {

    result: ExecutionResult
}


export default function ExecutionResultCard({
    result
}: ExecutionResultCardProps) {

    const resourceUrl = 
        result.type === "email" 
        ? "https://mail.google.com/mail/u/0/#sent"
        : result.resource_url
    
    return (
        <Card className="shadow-sm">

            <CardHeader className="space-y-3">

                <div className="flex items-center gap-3 flex-wrap">

                    <CardTitle className="text-base">
                        {result.title}
                    </CardTitle>

                    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium capitalize">
                        {result.type}
                    </span>

                    <ExecutionStatusBadge
                        status={result.status}
                    />

                </div>

            </CardHeader>

            <CardContent className="space-y-4 text-sm">

                <div>

                    <span className="font-medium">
                        Provider:
                    </span>{" "}
                    {result.provider || "Unknown"}

                </div>

                {result.resource_id && (

                    <div>

                        <span className="font-medium">
                            Resource ID:
                        </span>{" "}
                        {result.resource_id}

                    </div>

                )}

                {result.error && (

                    <div className="rounded-lg border border-red-500 bg-red-50 p-3 text-red-700">
                        
                        {result.error}

                    </div>

                )}

                <OpenResourceButton
                    resourceUrl={resourceUrl}
                />

            </CardContent> 

        </Card>
    )
}
