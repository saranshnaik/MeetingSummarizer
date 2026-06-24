// Loading screen 

import { Loader2 } from "lucide-react" 


interface LoadingScreenProps {

	title: string

	description?: string
}


export default function LoadingScreen({
	title,
	description
}: LoadingScreenProps) { 
	
	return ( 
		<div className="rounded-xl border p-10 flex flex-col items-center justify-center gap-4"> 
		
			<Loader2 className="h-10 w-10 animate-spin text-primary" /> 
			
			<div className="text-center"> 
				<h2 className="font-semibold"> 
					
					{title}
				</h2> 
			
				<p className="text-sm text-muted-foreground"> 
					
					{description}
				
				</p> 
		
			</div> 
		
		</div> 
	) 
}
