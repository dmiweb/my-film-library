import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
// import {movieDetails} from "../redux/slices/moviesSlice";
import { fetchMovieDetails } from "../redux/slices/moviesSlice";
import { Nav, MovieDetails, Loader } from "../components";
import { useEffect } from "react";

const MoviePage = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const url = import.meta.env.VITE_MOVIES_URL;
  // const [mov, setMov] = useState(null);
  const { id } = useParams();

  const dispatch = useAppDispatch();
  // dispatch(fetchMovieDetails(`${url}?apikey=${apiKey}&i=${id}`));
  // const { movieDetails, loading, error } = useAppSelector(movieDetails);
  const { movieDetails, loading, error } = useAppSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovieDetails(`${url}?apikey=${apiKey}&i=${id}`));
  }, [dispatch, apiKey, url, id]);


  return (
    <>
      <Nav />
      {loading && <Loader />}
      <div className="movie-details-container">
        {!loading && movieDetails && <MovieDetails movie={movieDetails} />}
      </div>
    </>

  );
}

export default MoviePage;