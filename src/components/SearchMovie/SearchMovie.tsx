import { useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { saveQuerySearch, clearMovies, fetchMovies } from "../../redux/slices/moviesSlice";

const SearchMovie = () => {
  const timeoutRef = useRef<number | null>(null);
  const prevSearchQuery = useRef<string>("");
  const apiKey = import.meta.env.VITE_API_KEY;
  const url = import.meta.env.VITE_MOVIES_URL;

  const dispatch = useAppDispatch();
  const saveQuery = useAppSelector((state) => state.movies.querySearch);

  useEffect(() => {
    if (saveQuery === "") {
      dispatch(clearMovies());
    }
  }, [saveQuery, dispatch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value.trim();

    dispatch(saveQuerySearch(searchQuery));

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (searchQuery === prevSearchQuery.current) return;
    if (searchQuery === '') {
      dispatch(clearMovies());
      prevSearchQuery.current = searchQuery;
      return;
    };

    timeoutRef.current = setTimeout(() => {
      dispatch(fetchMovies(`${url}?apikey=${apiKey}&s=${searchQuery}`));

      prevSearchQuery.current = searchQuery;
      timeoutRef.current = null;
    }, 500);
  }

  return (
    <div className="search-movie">
      <h1 className="search-movie__title">Поиск фильмов</h1>
      <input
        type="search"
        className="search-movie__input"
        name="search"
        defaultValue={saveQuery}
        required onChange={handleChange}
      />
    </div>
  );
}

export default SearchMovie;