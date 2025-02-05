import { buildCreateSlice, asyncThunkCreator, PayloadAction } from "@reduxjs/toolkit";
import { TMovies, TMovie, TMovieDetails, MoviesState } from "../../models";

const initialState = {
  movies: null,
  loading: false,
  error: "",
  movieDetails: null,
  favorites: [],
} as MoviesState;

const createSliceWithThunk = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export const moviesSlice = createSliceWithThunk({
  name: "movies",
  initialState,
  reducers: (create) => ({
    addFavoritesMovie: create.reducer((state, action: PayloadAction<TMovie>) => {
      if (state.movies && state.movies.Search) {
        state.movies.Search = state.movies.Search.map((movie) => {
          if (movie.imdbID === action.payload.imdbID) {
            return { ...movie, isFavorite: true };
          }
          return movie;
        });

        state.favorites = [...state.favorites, { ...action.payload, isFavorite: true }];
      }
    }),
    removeFavoritesMovie: create.reducer((state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter((movie) => movie.imdbID !== action.payload);

      if (state.movies && state.movies.Search) {
        state.movies.Search = state.movies.Search.map((movie) => ({
          ...movie,
          isFavorite: false
        }));
      }
    }),
    fetchMovies: create.asyncThunk<TMovies, string>(
      async (url, { rejectWithValue }) => {
        try {
          const response = await fetch(url);

          if (!response.ok) {
            return rejectWithValue("Loading movies error!");
          }

          return await response.json();
        } catch (e) {
          return rejectWithValue("Loading movies error!");
        }
      },
      {
        pending: (state) => {
          state.loading = true;
          state.error = "";
        },
        fulfilled: (state, action) => {
          state.movies = action.payload;
          state.error = "";
        },
        rejected: (state, action) => {
          state.error = action.payload as string;
        },
        settled: (state) => {
          state.loading = false;
        },
      }
    ),
    fetchMovieDetails: create.asyncThunk<TMovieDetails, { url: string, signal: AbortSignal }>(
      async ({ url, signal }, { rejectWithValue }) => {
        try {
          const response = await fetch(url, { signal });

          if (!response.ok) {
            if (signal.aborted) {
              return rejectWithValue("Request aborted");
            }
            return rejectWithValue("Error loading movie details!");
          }

          return await response.json();
        } catch (e) {
          if (signal.aborted) {
            return rejectWithValue("Request aborted");
          }
          console.log(e)
          return rejectWithValue("Error loading movie details!");
        }
      },
      {
        pending: (state) => {
          state.loading = true;
          state.error = "";
        },
        fulfilled: (state, action) => {
          state.movieDetails = action.payload;
          state.error = "";
        },
        rejected: (state, action) => {
          state.error = action.payload as string;
        },
        settled: (state) => {
          state.loading = false;
        },
      }
    ),
  }),
});

export const {
  addFavoritesMovie,
  removeFavoritesMovie,
  fetchMovies,
  fetchMovieDetails,
} = moviesSlice.actions;
export default moviesSlice.reducer;