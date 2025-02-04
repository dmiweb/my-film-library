import { TMovie } from "../../models";
import { AddFavorites, DetailsButton } from "../../components";

const MovieItem = ({ movie }: { movie: TMovie }) => {
  return (
    <li id={movie.imdbID} className="movie-item">
      <div className="movie__poster-container">
        <img src={movie.Poster} className="movie__poster" alt={`Постер к фильму ${movie.Title}`} />
      </div>
      <div className="movie__details">
        <h2 className="movie__title">{movie.Title}</h2>
        <div className="movie__year">Год: {movie.Year}</div>
        <div className="movie__imdb">imdb: {movie.imdbID}</div>
        <div className="movie__type">Тип: {movie.Type}</div>
      </div>
      <AddFavorites movie={movie} />
      <DetailsButton idMovie={movie.imdbID}/>
    </li>
  );
}

export default MovieItem;