// Execution result list

"use client"

import { ExecutionResult } from "@/types/execution"

import ExecutionResultCard from "./ExecutionResultCard"


interface ExecutionResultListProps {

    results: ExecutionResult[]
}


export default function ExecutionResultList({
    results
}: ExecutionResultListProps) {

    return (
        <div className="space-y-4">

            <h2 className="text-xl font-semibold">
                Execution Results
            </h2>

            {results.map((result, index) => (

                <ExecutionResultCard 
                    key={index}
                    result={result}
                />

            ))}

        </div>
    )
}
