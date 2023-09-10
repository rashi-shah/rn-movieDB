const strings: Record<string, string> = {
  popular: "What's Popular",
  newMovies: 'New Movies',
  trending: 'Trending',
  latestTrailer: 'Latest Trailers',
  streaming: 'Streaming',
  onTv: 'On TV',
  forRent: 'For Rent',
  upcoming: 'Upcoming',
  topRated: 'Top Rated',
  nowPlaying: 'Now Playing',
  today: 'Today',
  thisWeek: 'This Week',
  inTheater: 'In Theaters',
  notAvailable: 'NA',
  userScore: 'User Score',
  playTrailer: 'Play Trailer',
  overView: 'OverView',
  director: 'Director',
  hour: 'h',
  minute: 'm',
  episode: 'Episodes',
  trailer: 'Trailer',
  trailerNotAvailable: 'Sorry, Trailer not Available',
  cantPlayTrailer: "Sorry, can't play Trailer",
  tv: 'tv',
  movie: 'movie',
  discoverMovies: 'Movies for You',
  showPoster: 'Stop Trailer',
  search: 'Search',
};

const popularFilterList = [
  {id: 0, val: strings.streaming},
  {id: 1, val: strings.onTv},
  {id: 2, val: strings.forRent},
];

const newMoviesFilterList = [
  {id: 0, val: strings.upcoming},
  {id: 1, val: strings.nowPlaying},
  {id: 2, val: strings.topRated},
];

const trendingMoviesFilterList = [
  {id: 0, val: strings.today},
  {id: 1, val: strings.thisWeek},
];

export {
  strings,
  popularFilterList,
  newMoviesFilterList,
  trendingMoviesFilterList,
};
