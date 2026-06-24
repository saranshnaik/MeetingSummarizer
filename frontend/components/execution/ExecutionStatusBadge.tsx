// Execution status

"use client"


interface ExecutionStatusBadgeProps {
    
    status: string
}


export default function ExecutionStatusBadge({
    status
}: ExecutionStatusBadgeProps) {

    const styles = {
        created: "bg-green-100 text-green-700",
        sent: "bg-blue-100 text-blue-700",
        needsAction: "bg-yellow-100 text-yellow-700",
        failed: "bg-red-100 text-red-700",
        unsupported: "bg-gray-100 text-gray-700"
    }

    return (
        <span
            className={`
                rounded-full px-3 py-1 text-xs font-medium capitalize
                ${styles[status as keyof typeof styles] || "bg-secondary"}
                `}
        >
            {status === "needsAction" ? "Pending" : status}
        </span>
    )
}
