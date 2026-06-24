// Header

"use client"


interface HeaderProps {

    subtitle?: string

    title?: string
}


export default function Header({
    subtitle = "AI-powered smart meeting intelligence",
    title = "Meeting Summarizer"
}: HeaderProps) {

    return (
        <div className="text-center space-y-2 px-4 py-4">

            <h1 className="text-4xl font-bold tracking-tight">
                {title}
            </h1>

            <p className="text-muted-foreground">
                {subtitle}
            </p>

        </div>
    )
}
