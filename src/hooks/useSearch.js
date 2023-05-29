import { useState, useEffect, useRef } from "react"

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchError, setSearchError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = searchQuery === ""
      return
    }
    if (searchQuery === "") {
      setSearchError("Search string is empty")
      return
    }
    if (searchQuery.length < 3) {
      setSearchError("Input at least 3 characters to search")
      return
    }
    setSearchError(null)
  }, [searchQuery])

  return { searchQuery, setSearchQuery, searchError }
}
