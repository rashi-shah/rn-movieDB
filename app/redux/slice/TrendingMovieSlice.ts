import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchData} from '../../services';
import type {APIDataType, TrendingMoviesStateType} from '../../types';
import {ActionTypes} from '../../constants';

const initialState: TrendingMoviesStateType = {
  trendingMovies: [],
  trendingCurrentPage: 1,
  errorMessage: '',
  trendingTotalPages: 0,
  moreTrendingMoviesLoading: false,
  trendingMoviesLoading: false,
};

export const fetchTrendingMovies = createAsyncThunk(
  ActionTypes.fetchTrendingMovies,
  async (url: string) => {
    const response: APIDataType = await fetchData(url);
    return response;
  },
);

export const loadTrendingMovies = createAsyncThunk(
  ActionTypes.loadTrendingMovies,
  async (url: string) => {
    const response: APIDataType = await fetchData(url);
    return response;
  },
);

const trendingMovieSlice = createSlice({
  name: 'trendingMovie',
  initialState: initialState,
  reducers: {
    setPageVal: state => {
      state.trendingCurrentPage = state.trendingCurrentPage + 1;
    },
    resetError: state => {
      state.errorMessage = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchTrendingMovies.pending, state => {
      state.trendingMoviesLoading = true;
    });
    builder.addCase(fetchTrendingMovies.fulfilled, (state, action) => {
      state.trendingMoviesLoading = false;
      state.trendingMovies = action?.payload?.results;
      state.trendingTotalPages = action?.payload?.total_pages;
      state.trendingCurrentPage = 1;
    });
    builder.addCase(fetchTrendingMovies.rejected, (state, action) => {
      state.trendingMoviesLoading = false;
      state.errorMessage = action?.error?.message as string;
    });
    builder.addCase(loadTrendingMovies.pending, state => {
      state.moreTrendingMoviesLoading = true;
    });
    builder.addCase(loadTrendingMovies.fulfilled, (state, action) => {
      state.moreTrendingMoviesLoading = false;
      state.trendingMovies = [
        ...state.trendingMovies,
        ...action?.payload?.results,
      ];
      state.trendingTotalPages = action?.payload?.total_pages;
    });
    builder.addCase(loadTrendingMovies.rejected, (state, action) => {
      state.moreTrendingMoviesLoading = false;
      state.errorMessage = action?.error?.message as string;
    });
  },
});
export const trendingMovieReducer = trendingMovieSlice.reducer;
export const {setPageVal, resetError} = trendingMovieSlice.actions;
