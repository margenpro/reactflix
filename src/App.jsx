import "./App.css"
import { useCallback, useState } from "react"
import { useMovies } from "./hooks/useMovies"
import { useSearch } from "./hooks/useSearch"
import { Movies } from "./components/Movies"
import debounce from "just-debounce-it"

function App() {
  const [sort, setSort] = useState(false)
  const { searchQuery, setSearchQuery, error } = useSearch()
  const { movies, getMovies } = useMovies({ searchQuery, sort })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedGetMovies = useCallback(
    debounce((searchQuery) => {
      getMovies({ searchQuery })
    }, 300),
    []
  )

  const hanldeSubmit = (event) => {
    event.preventDefault()
    getMovies({ searchQuery })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleQueryChange = (event) => {
    const search = event.target.value
    setSearchQuery(search)
    debouncedGetMovies(search)
  }

  return (
    <div className="page">
      <header>
        <h1>Reactflix</h1>
        <form className="form" onSubmit={hanldeSubmit}>
          <input
            name="query"
            placeholder="Avengers, Scary Movie, X-Men"
            value={searchQuery}
            onChange={handleQueryChange}
          />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type="submit">Search</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
