// Summary card

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { useMeeting } from "@/hooks/useMeeting"


export default function SummaryCard() {

    const { summary } = useMeeting()

    const cleanedSummary = 
        summary
            .replaceAll("###", "")
            .split("\n")
            .filter(Boolean)
            .map((line, index) => (

                <p key={index}>
                    {line.replaceAll("**", "")}
                </p>

            ))


    return (
        <Card className="shadow-xl">

            <CardHeader>
                
                <CardTitle className="text-xl font-semibold">
                    Meeting Summary
                </CardTitle>

            </CardHeader>

            <CardContent>
                
                <div className="space-y-3 text-sm text-gray-700 leading-7 whitespace-pre-wrap">

                    { cleanedSummary }

                </div>
                
            </CardContent>

        </Card>
    )
}
