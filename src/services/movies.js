const API_KEY = "4287ad07"

export const searchMovies = async ({ searchQuery }) => {
  if (searchQuery === "") return null
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}`
    )
    const json = await response.json()
    const movies = json.Search
    return movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    }))
  } catch (error) {
    throw new Error("Error fetchings movies")
  }
}
