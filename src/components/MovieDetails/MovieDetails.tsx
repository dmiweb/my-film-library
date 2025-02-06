import { TMovieDetails } from "../../models";
import { AddFavorites } from "../../components";

const MovieDetails = ({ movie }: { movie: TMovieDetails }) => {

  return (
    <>
      <h2 className="movie-details__title">{movie.Title}</h2>
      <div className="movie-details">

        <div className="movie-details__poster-container">
          <img src={movie.Poster} className="movie-details__poster" alt={`Постер к фильму ${movie.Title}`} />
        </div>
        <div className="movie-details__fields-container">
          <div className="movie-details__year">Год: {movie.Year}</div>
          <div className="movie-details__genre">Жанр: {movie.Genre}</div>
          <div className="movie-details__runtime">Длительность: {movie.Runtime}</div>
          <div className="movie-details__director">Режиссер: {movie.Director}</div>
          <div className="movie-details__actors">Актеры: {movie.Actors}</div>
          <div className="movie-details__imdb-rating">Рейтинг: {movie.imdbRating}</div>
        </div>
        <AddFavorites movie={movie} />
      </div>
    </>
  );
}

export default MovieDetails;