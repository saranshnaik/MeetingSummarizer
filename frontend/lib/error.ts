// Error message helper


export function getErrorMessage(
	error: unknown	
): string {
	
	// console.log(typeof error)
	const message = 
		typeof error === "string"
		? error
		: typeof error === "object" &&
		  error !== null &&
		  "message" in error
		  ? String(error.message)
		  : "Something went wrong"

	const cleaned = message
		.replace(/\x1B\[[0-9;]*m/g, "")
		.trim()

	if (cleaned.includes("HTTP Error 403")) {
		return "Access denied to Google Drive file."
	}

	return cleaned
}
