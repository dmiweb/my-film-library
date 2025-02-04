import { useAppSelector } from "../hooks";
import { Nav, SearchMovie, MoviesList } from "../components";

const SearchPage = () => {
  const { movies, loading, error } = useAppSelector((state) => state.movies);

  const moviesList = movies?.Search || [];

  return (
    <>
      {loading && <span className="loader"></span>}
      {error && <div className="error-message">{error}</div>}
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
    </>
  );
}

export default SearchPage;