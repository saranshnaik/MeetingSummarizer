// Results section

"use client"

import ActionList from "../actions/ActionList"
import SummaryCard from "../summary/SummaryCard"


export default function ResultSection() {
    
    return (
        <div className="space-y-6">

            <SummaryCard />
                            
            <ActionList />

        </div>
    )
}
