// Action pipeline progress

import { CheckCircle2, Loader2 } from "lucide-react"

import { useWebsocketStore } from "@/store/websocketStore"


export default function PipelineProgress() {

    const events = useWebsocketStore(
        (state) => state.events
    )

    if (!events.length) {
        return (
            <div className="rounded-xl border p-10 flex flex-col items-center gap-4">

                <Loader2 className="h-10 w-10 animate-spin" />

                <p className="text-lg font-semibold">
                    Starting...
                </p>

            </div>
        )
    }

    const completedEvents = events.filter(
        (event) => event.event.endsWith("_completed")
    )

    
    const activeEvent = [...events]
        .reverse()
        .find(
            (event) => 
                event.event.endsWith("_started")
        )
        

    return (        
        <div className="rounded-xl border p-8 w-[400px] mx-auto">

            <div className="flex flex-col items-center text-center gap-4">
                
                <h2 className="font-semibold text-2xl">

                    Processing

                </h2>

                <div className="flex items-center gap-3">

                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    
                    <p className="font-medium">

                        {activeEvent?.message ?? "Finishing..."}

                    </p>

                </div>
                

            </div>

            <div className="space-y-4 flex flex-col items-center">

                {
                    completedEvents.length > 0 && (
                        <>
                            <div className="my-6 border-t  w-full" />

                            <div className="space-y-3 flex flex-col items-center">

                                {
                                    completedEvents.map(
                                        (event) => (

                                            <div 
                                                key={event.timestamp}
                                                className="flex items-center gap-3"
                                            >

                                                <CheckCircle2
                                                    className="h-4 w-4 text-green-500 shrink-0"
                                                />

                                                <p className="text-sm text-muted-foreground">

                                                    {event.message}

                                                </p>
                                            

                                            </div>
                                        )
                                    )
                                }
                            </div>
                        </>
                    )    
                }
            
            </div>

        </div>
    )
}
