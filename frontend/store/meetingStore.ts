// Meeting store

import { create } from "zustand"


interface MeetingState {

	error: string

	loading: boolean

	selectedFile: File | null
	
	sourceUrl: string
	
	summary: string

	setError: (error: string) => void
	
	setLoading: (loading: boolean) => void
	
	setSelectedFile: (file: File | null) => void
	
	setSourceUrl: (link: string) => void
	
	setSummary: (summary: string) => void
	
	resetMeeting: () => void
}


export const useMeetingStore = create<MeetingState>((set) => ({

	error: "",

	loading: false,
	
	selectedFile: null,
	
	sourceUrl: "",

	summary: "",

	resetMeeting: () =>
		set({ 
			loading: false,
			summary: "",
			error: "",
			selectedFile: null,
			sourceUrl: ""
		 }),

	setError: (error) =>
		set({ error }),	

	setLoading: (loading) => 
		set({ loading }),	
	
	setSelectedFile: (selectedFile) =>
		set({ selectedFile }),	
	
	setSourceUrl: (sourceUrl) =>
		set({ sourceUrl }),	

	setSummary: (summary) =>
		set({ summary }),	
}))
