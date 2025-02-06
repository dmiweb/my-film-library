import { useAppDispatch, useAppSelector } from "../../hooks";
import { addFavoritesMovie, removeFavoritesMovie } from "../../redux/slices/moviesSlice";
import { TMovie, TMovieDetails } from "../../models";

const AddFavorites = ({ movie }: { movie: TMovie | TMovieDetails }) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.movies.favorites);
  const isMovieFavorite = favorites.some((favMovie) => favMovie.imdbID === movie.imdbID);

  const favoritMovie: TMovie = {
    Title: movie.Title,
    Year: movie.Year,
    imdbID: movie.imdbID,
    Type: movie.Type,
    Poster: movie.Poster,
    isFavorite: true
  };

  const handleAddFavorites = () => {
    if (isMovieFavorite) {
      dispatch(removeFavoritesMovie(movie.imdbID));
    } else {
      dispatch(addFavoritesMovie(favoritMovie));
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