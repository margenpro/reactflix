/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useRef, useState, useMemo, useCallback } from "react"
import { searchMovies } from "../services/movies"

export function useMovies({ searchQuery, sort }) {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [moviesError, setMoviesError] = useState(null)
  const previuseSearch = useRef(searchQuery)

  const getMovies = useCallback(async ({searchQuery}) => {
      if (searchQuery === previuseSearch.current) return
      try {
        setIsLoading(true)
        setMoviesError(null)
        previuseSearch.current = searchQuery
        const _movies = await searchMovies({ searchQuery })
        setMovies(_movies)
      } catch (error) {
        setMoviesError(error.message)
      } finally {
        setIsLoading(false)
      }
  })

  const sorteMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.year.localeCompare(b.year))
      : movies
  }, [sort, movies])

  return { movies: sorteMovies, getMovies, isLoading, moviesError }
}
