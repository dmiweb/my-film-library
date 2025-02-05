import { useAppSelector } from "../hooks";
import { Nav, SearchMovie, MoviesList } from "../components";

const SearchPage = () => {
  const { movies, loading, error } = useAppSelector((state) => state.movies);

  const moviesList = movies?.Search || [];

  return (
    <>
      {loading && <span className="loader"></span>}
      <Nav />
      <SearchMovie />
      {
        movies?.Response === 'False' &&
        <div className="movies-not-found">Фильмов не найдено...</div>
      }
      {
        movies?.Response === 'True' &&
        <MoviesList movies={moviesList} />
      }
      {error && <div className="error-message">{error}</div>}
    </>
  );
}

export default SearchPage;