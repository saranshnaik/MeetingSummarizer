// Dashboard / meeting processing page

"use client"

import { useRequireAuth } from "@/hooks/useRequireAuth"

import Container from "@/components/layout/Container"
import Header from "@/components/layout/Header"

import UploadZone from "@/components/upload/UploadZone"


export default function DashboardPage() {
    
    const  {
        hasHydrated,
        isAuthenticated
    } = useRequireAuth()

    if (!hasHydrated || !isAuthenticated) {
        return null
    }
    

    return (
        <Container>

            <Header />

            <section  className="pt-6 pb-16">

                <UploadZone />

            </section>

        </Container>
    )
}
