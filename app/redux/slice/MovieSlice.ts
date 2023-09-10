import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchData} from '../../services';
import type {
  APIDataType,
  DetailsInfoType,
  NewMoviesStateType,
} from '../../types';
import {APIConstants, ActionTypes} from '../../constants';

const initialState: NewMoviesStateType = {
  newMovies: [],
  newMoviesCurrentPage: 1,
  errorMessage: '',
  newMoviesTotalPages: 0,
  movieDetails: {},
  moreNewMoviesLoading: false,
  movieDetailsLoading: false,
  newMoviesLoading: false,
  errorLoadingDetails: '',
};

export const fetchMovieById = createAsyncThunk(
  ActionTypes.fetchMovieById,
  async (id: number) => {
    const response: DetailsInfoType = await fetchData(
      `${APIConstants.movieURL}${id}${APIConstants.queryParams}`,
    );
    return response;
  },
);

export const fetchTvSeriesById = createAsyncThunk(
  ActionTypes.fetchTvSeriesById,
  async (id: number) => {
    const response: DetailsInfoType = await fetchData(
      `${APIConstants.tvURL}${id}${APIConstants.queryParams}`,
    );
    return response;
  },
);

export const fetchNewMoviesData = createAsyncThunk(
  ActionTypes.fetchNewMoviesData,
  async (url: string) => {
    const response: APIDataType = await fetchData(url);
    return response;
  },
);

export const loadMoreNewMoviesData = createAsyncThunk(
  ActionTypes.loadMoreNewMoviesData,
  async (url: string) => {
    const response: APIDataType = await fetchData(url);
    return response;
  },
);

const movieSlice = createSlice({
  name: 'movie',
  initialState: initialState,
  reducers: {
    setPage: state => {
      state.newMoviesCurrentPage = state.newMoviesCurrentPage + 1;
    },
    resetMovieDetails: state => {
      state.movieDetails = {};
    },
    resetMoviesError: state => {
      state.errorMessage = '';
    },
    resetDetailsScreenError: state => {
      state.errorLoadingDetails = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchNewMoviesData.pending, state => {
      state.newMoviesLoading = true;
    });
    builder.addCase(fetchNewMoviesData.fulfilled, (state, action) => {
      state.newMoviesLoading = false;
      state.newMovies = action?.payload?.results;
      state.newMoviesTotalPages = action?.payload?.total_pages;
      state.newMoviesCurrentPage = 1;
    });
    builder.addCase(fetchNewMoviesData.rejected, (state, action) => {
      state.newMoviesLoading = false;
      state.errorMessage = action?.error?.message as string;
    });
    builder.addCase(loadMoreNewMoviesData.pending, state => {
      state.moreNewMoviesLoading = true;
    });
    builder.addCase(loadMoreNewMoviesData.fulfilled, (state, action) => {
      state.moreNewMoviesLoading = false;
      state.newMovies = [...state.newMovies, ...action?.payload?.results];
      state.newMoviesTotalPages = action?.payload?.total_pages;
    });
    builder.addCase(loadMoreNewMoviesData.rejected, (state, action) => {
      state.moreNewMoviesLoading = false;
      state.errorMessage = action?.error?.message as string;
    });
    builder.addCase(fetchMovieById.pending, state => {
      state.movieDetailsLoading = true;
    });
    builder.addCase(fetchMovieById.fulfilled, (state, action) => {
      state.movieDetailsLoading = false;
      state.movieDetails = action?.payload;
    });
    builder.addCase(fetchMovieById.rejected, (state, action) => {
      state.errorLoadingDetails = action?.error?.message as string;
      state.movieDetailsLoading = true;
    });
    builder.addCase(fetchTvSeriesById.pending, state => {
      state.movieDetailsLoading = true;
    });
    builder.addCase(fetchTvSeriesById.fulfilled, (state, action) => {
      state.movieDetailsLoading = false;
      state.movieDetails = action?.payload;
    });
    builder.addCase(fetchTvSeriesById.rejected, (state, action) => {
      state.errorLoadingDetails = action?.error?.message as string;
      state.movieDetailsLoading = true;
    });
  },
});
export const movieReducer = movieSlice.reducer;
export const {
  setPage,
  resetMovieDetails,
  resetMoviesError,
  resetDetailsScreenError,
} = movieSlice.actions;
