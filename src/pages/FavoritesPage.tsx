import { useAppSelector } from "../hooks";
import { TMovies } from "../models";
import { Nav, MoviesList } from "../components";

const FavoritesPage = () => {
  const favorites = useAppSelector((state) => state.movies.favorites);

  return (
    <>
      <Nav />
      <ul className="favorites-list">
        {favorites.length ?
          <MoviesList movies={favorites} /> :
          <div className="not-favorites">Ничего нет...</div>}
      </ul>
    </>

  );
}

export default FavoritesPage;