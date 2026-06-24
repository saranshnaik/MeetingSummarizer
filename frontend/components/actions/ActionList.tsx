// List of action cards

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import ActionCard from "./ActionCard"

import { useActions } from "@/hooks/useActions"


export default function ActionList() {

    const { actions } = useActions()


    return (
        <Card className="space-y-4 shadow-xl">

            <CardHeader>    

                <CardTitle className="text-xl font-semibold">
                    Extracted Actions
                </CardTitle>

            </CardHeader>

            <CardContent>
                
                {Object.values(actions).length === 0 ? (

                    <div className="space-y-3 text-sm text-gray-700 leading-7 whitespace-pre-wrap">
                    
                        No actions found
                    
                    </div>
                    
                ) : (
                    
                    <div className="overflow-x-auto pb-2">

                        <div className="flex gap-4 w-max p-2">

                            {Object.values(actions).map((action) => (
                            
                                <div 
                                    key={action.id}
                                    className="w-[500px] shrink-0"
                                >

                                    <ActionCard
                                        action={action}
                                    />

                                </div>

                            ))}

                        </div>

                    </div>
                )}
            
            </CardContent>

        </Card>
    )
}
