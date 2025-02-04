import { useAppDispatch, useAppSelector } from "../../hooks";
import { addFavoritesMovie, removeFavoritesMovie } from "../../redux/slices/moviesSlice";
import { TMovie } from "../../models";

const AddFavorites = ({ movie }: { movie: TMovie }) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.movies.favorites);
  const isMovieFavorite = favorites.some((favMovie) => favMovie.imdbID === movie.imdbID);

  const handleAddFavorites = () => {
    if (isMovieFavorite) {
      dispatch(removeFavoritesMovie(movie.imdbID));
    } else {
      dispatch(addFavoritesMovie(movie));
    }
  }

  return (
    <button
      className={isMovieFavorite ? 'add-favorites-btn add-favorites-btn_active' : 'add-favorites-btn'}
      title={isMovieFavorite ? "Удалить из избранного" : "Добавить в избранное"}
      onClick={handleAddFavorites}
    >
      &#9733;
    </button>
  );
}

export default AddFavorites;