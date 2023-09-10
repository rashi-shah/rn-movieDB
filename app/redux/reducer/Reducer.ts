import {combineReducers} from 'redux';
import {
  discoverMovieReducer,
  movieReducer,
  movieTrailerReducer,
  popularMovieReducer,
  searchReducer,
  trendingMovieReducer,
} from '../slice';

export const rootReducer = combineReducers({
  popularMovies: popularMovieReducer,
  newMovies: movieReducer,
  trendingMovies: trendingMovieReducer,
  trailer: movieTrailerReducer,
  search: searchReducer,
  discover: discoverMovieReducer,
});
