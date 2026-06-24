// Custom 404 page

import Link from "next/link"

import { Button } from "@/components/ui/button" 


export default function NotFound() {
	return (
		<div className="flex min-h-screen items-center justify-center">

			<div className="text-center">

				<h1 className="text-7xl font-bold">
					404
				</h1>

				<p className="mt-4 text-gray-600">
					Sorry, the page you are looking for does not exist.
				</p>

				<Link href="/dashboard">

					<Button
						variant="default"
						className="mt-6 inline-block rounded-lg px-4 py-2 h-10"
					>
						Go Home
					</Button>

				</Link>

			</div>
		</div>
	)
}
