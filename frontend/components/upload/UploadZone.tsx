// Combine all upload process

"use client"

import { useActions } from "@/hooks/useActions"
import { useMeeting } from "@/hooks/useMeeting"

import UploadForm from "./UploadForm"
import UploadStates from "./UploadStates"
import ResultsSection from "../results/ResultsSection"


export default function UploadZone() {

    const {
        loading,
        summary
    } = useMeeting()

    const { actions } = useActions()
    
    const hasResults = 
        summary.length > 0 ||
        Object.keys(actions).length > 0


    return (
        <div className="space-y-10">

            <div className="flex justify-center">

                <UploadForm />

            </div>

            <UploadStates hasResults={hasResults} />

            {!loading && hasResults  && (

                <ResultsSection />

            )}

        </div>
    )
}
