// Admin page

"use client"

import AdminHeader from "@/components/admin/AdminHeader"
// import AdminStats from "@/components/admin/AdminStats"
import AdminTabs from "@/components/admin/AdminTabs"

import { useRequireAuth } from "@/hooks/useRequireAuth"


export default function AdminPage() {

	const { 
		hasHydrated,
		isAuthorized
	} = useRequireAuth({ adminOnly: true })

	if (!hasHydrated || !isAuthorized) {
		return null
	}
	
	return (

		<main className="flex-1">

			<div className="mx-auto max-w-7xl px-6 py-10 space-y-8">

				<AdminHeader />

				{/* <AdminStats /> */}

				<AdminTabs />

			</div>
			
		</main>
	)
}
