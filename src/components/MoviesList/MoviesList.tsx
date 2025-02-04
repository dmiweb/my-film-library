import { TMovie } from "../../models";
import { MovieItem } from "../../components";

const MoviesList = ({ movies }: { movies: TMovie[] }) => {

  return (
    <ul className="movies-list">
      {movies.map(movie => <MovieItem key={movie.imdbID} movie={movie} />)}
    </ul>
  );
}

export default MoviesList;