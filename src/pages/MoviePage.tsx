import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchMovieDetails } from "../redux/slices/moviesSlice";
import { Nav, MovieDetails, Loader } from "../components";
import { useEffect } from "react";

const MoviePage = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const url = import.meta.env.VITE_MOVIES_URL;
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  const { movieDetails, loading, error } = useAppSelector((state) => state.movies);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    dispatch(fetchMovieDetails({url:`${url}?apikey=${apiKey}&i=${id}`, signal: signal}));

    return () => abortController.abort();
  }, [dispatch, apiKey, url, id]);


  return (
    <>
      <Nav />
      {loading && <Loader />}
      
      <div className="movie-details-container">
        {!loading && movieDetails && <MovieDetails movie={movieDetails} />}
      </div>
      {error && <div className="error-message">{error}</div>}
    </>

  );
}

export default MoviePage;