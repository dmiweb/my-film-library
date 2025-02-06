export type TMovies = {
  Search: TMovie[];
  Response: string;
  totalResults: string;
}

export type TMoviesNoFound = {
  Response: string;
  Error: string;
}

export type TMovie = {
  "Title": string;
  "Year": string;
  "imdbID": string;
  "Type": string;
  "Poster": string;
  isFavorite: boolean;
}

export type TMovieDetails = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
};

export type MoviesState = {
  movies: TMovies | null;
  loading: boolean;
  error: string | null;
  movieDetails: TMovieDetails | null,
  favorites: TMovie[],
}