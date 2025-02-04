import { useRef } from "react";
import { useAppDispatch } from "../../hooks";
import { fetchMovies } from "../../redux/slices/moviesSlice";

const SearchMovie = () => {
  const timeoutRef = useRef<number | null>(null);
  const apiKey = import.meta.env.VITE_API_KEY;
  const url = import.meta.env.VITE_MOVIES_URL;

  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const movieTitle = event.target.value.trim();

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if(movieTitle === '') return;

    timeoutRef.current = setTimeout(() => {
      dispatch(fetchMovies(`${url}?apikey=${apiKey}&s=${movieTitle}`));

      timeoutRef.current = null;
    }, 3000);
  }

  return (
    <div className="search-movie">
      <h1 className="search-movie__title">Поиск фильмов</h1>
      <input
        type="search"
        className="search-movie__input"
        name="search"
        required onChange={handleChange}
      />
    </div>
  );
}

export default SearchMovie;