import {
  // createSlice,
  // createAsyncThunk,
  buildCreateSlice,
  asyncThunkCreator,
  PayloadAction,
} from "@reduxjs/toolkit";
import { TMovie } from "../../models";

export interface MoviesState {
  movies: TMovie[];
  loading: boolean;
  error: string;
}
const initialState = {
  movies: [],
  loading: false,
  error: "",
} as MoviesState;

const createSliceWithThunk = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export const moviesSlice = createSliceWithThunk({
  name: "movies",
  initialState,
  selectors: {
    moviesState: (state) => state,
    moviesList: (state) => state.movies,
  },
  reducers: (create) => ({
    removeMovie: create.reducer((state, action: PayloadAction<number>) => {
      state.movies = state.movies.filter((movie) => movie.id !== action.payload);
    }),
    fetchMovies: create.asyncThunk<TMovie[]>(
      async (_, { rejectWithValue }) => {
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/movies');

          if (!response.ok) {
            return rejectWithValue("Loading movies error!");
          }

          return await response.json();
        } catch (e) {
          return rejectWithValue(e);
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
  }),
});

export const { removeMovie, fetchMovies } = moviesSlice.actions;
export default moviesSlice.reducer;