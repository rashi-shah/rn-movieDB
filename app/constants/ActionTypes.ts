const ActionTypes: Record<string, string> = {
  fetchPopularMovies: 'popularMovie/fetchPopularMovies',
  loadMorePopularData: 'popularMovie/loadMorePopularData',
  loadMoreNewMoviesData: 'movie/loadMoreNewMoviesData',
  fetchNewMoviesData: 'movie/fetchNewMoviesData',
  fetchTrendingMovies: 'movie/fetchTrendingMovies',
  loadTrendingMovies: 'movie/loadTrendingMovies',
  fetchMovieById: 'movie/fetchMovieById',
  fetchTvSeriesById: 'movie/fetchTvSeriesById',
  fetchTrailers: 'trailer/fetchTrailers',
  loadMoreTrailerData: 'trailer/loadMoreTrailerData',
  loadMoreSearchData: 'search/loadMoreTrailerData',
  searchData: 'search/searchData',
  updateData: 'search/updateData',
  updateFailed: 'search/updateFailed',
  fetchSuggestedMovies: 'discover/fetchSuggestedMovies',
  loadMoreSuggestions: 'discover/loadMoreSuggestions',
};

export default ActionTypes;
