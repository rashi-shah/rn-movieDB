interface MovieInfoType {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface TvInfoType extends MovieInfoType {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  media_type: string;
}

interface APIDataType {
  page: number;
  results: Array<Partial<TvInfoType>>;
  total_pages: number;
  total_results: number;
}

interface MoviesStateType {
  popular: Array<Partial<TvInfoType>>;
  errorMessage: string;
  currentPage: number;
  totalPages: number;
  popularMoviesLoading: boolean;
  morePopularDataLoading: boolean;
}

interface NewMoviesStateType {
  newMovies: Array<Partial<TvInfoType>>;
  errorMessage: string;
  newMoviesCurrentPage: number;
  newMoviesTotalPages: number;
  movieDetails: Partial<DetailsInfoType>;
  movieDetailsLoading: boolean;
  newMoviesLoading: boolean;
  moreNewMoviesLoading: boolean;
  errorLoadingDetails: string;
}

interface TrendingMoviesStateType {
  trendingMovies: Array<Partial<TvInfoType>>;
  errorMessage: string;
  trendingCurrentPage: number;
  trendingTotalPages: number;
  trendingMoviesLoading: boolean;
  moreTrendingMoviesLoading: boolean;
}

interface TvStateType {
  popular: Array<TvInfoType>;
  errorMessage: string;
  currentPage: number;
  totalPages: number;
}

interface ItemType {
  index: number;
  isViewable: boolean;
  item: MovieInfoType;
  key: string;
}

interface CastInfoType {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: number;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id?: number;
  character: string;
  credit_id: string;
  order: number;
}

interface CrewInfoType {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
}

interface VideoInfoType {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: true;
  published_at: string;
  id: string;
}

interface MovieDetailsType {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    backdrop_path: string | null;
    id: number;
    name: string;
    poster_path: string;
  } | null;
  budget: number;
  genres: Array<{
    id: number;
    name: string;
  }>;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Array<{
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }>;
  production_countries: Array<{
    iso_3166_1: string | null;
    name: string;
  }>;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credits: {
    cast: CastInfoType[];
    crew: CrewInfoType[];
  };
  videos: {
    results: VideoInfoType[];
  };
}

interface DetailsInfoType extends MovieDetailsType {
  created_by: Array<{
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string;
  }>;
  episode_run_time: number[];
  first_air_date: string;
  genres: Array<{
    id: number;
    name: string;
  }>;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
  };
  name: string;
  next_episode_to_air: string | null;
  networks: Array<{
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }>;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_name: string;
  seasons: Array<{
    air_date: string;
    episode_count: 9;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    vote_average: number;
  }>;
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>;
  status: string;
  tagline: string;
  type: string;
}

interface TrailerStateType {
  trailerList: Array<Partial<TvInfoType>>;
  errorMessage: string;
  trailerCurrentPage: number;
  trailerTotalPages: number;
  trailerLoading: boolean;
  moreTrailerDataLoading: boolean;
}

interface SearchDataType {
  page: number;
  results: Array<TvInfoType>;
  total_pages: number;
  total_results: number;
}

interface SearchStateType {
  searchResults: Array<TvInfoType>;
  errorMessage: string;
  currentPage: number;
  totalPages: number;
  searchResultLoading: boolean;
  moreSearchResultLoading: boolean;
}

interface MovieSuggestionStateType {
  suggestedMovies: Array<Partial<TvInfoType>>;
  errorMessage: string;
  currentPage: number;
  totalPages: number;
  suggestionsLoading: boolean;
  moreSuggestionLoading: boolean;
}

export type {
  MovieInfoType,
  APIDataType,
  MoviesStateType,
  TvInfoType,
  TvStateType,
  NewMoviesStateType,
  TrendingMoviesStateType,
  ItemType,
  MovieDetailsType,
  DetailsInfoType,
  TrailerStateType,
  SearchDataType,
  SearchStateType,
  MovieSuggestionStateType,
};
