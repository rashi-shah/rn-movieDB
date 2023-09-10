import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ActionTypes} from '../../constants';
import {fetchData} from '../../services';
import type {APIDataType, MoviesStateType} from '../../types';

const initialState: MoviesStateType = {
  popular: [],
  currentPage: 1,
  errorMessage: '',
  totalPages: 0,
  popularMoviesLoading: false,
  morePopularDataLoading: false,
};

export const fetchPopularMovies = createAsyncThunk(
  ActionTypes.fetchPopularMovies,
  async (url: string) => {
    const response: APIDataType = await fetchData(url);
    return response;
  },
);

export const loadMorePopularData = createAsyncThunk(
  ActionTypes.loadMorePopularData,
  async (url: string) => {
    const response: APIDataType = await fetchData(url);
    return response;
  },
);

const popularMovieSlice = createSlice({
  name: 'popularMovie',
  initialState: initialState,
  reducers: {
    setCurrentPage: state => {
      state.currentPage = state.currentPage + 1;
    },
    resetPopularMoviesError: state => {
      state.errorMessage = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPopularMovies.pending, state => {
      state.popularMoviesLoading = true;
    });
    builder.addCase(fetchPopularMovies.fulfilled, (state, action) => {
      state.popularMoviesLoading = false;
      state.popular = action?.payload?.results;
      state.totalPages = action?.payload?.total_pages;
      state.currentPage = 1;
    });
    builder.addCase(fetchPopularMovies.rejected, (state, action) => {
      state.popularMoviesLoading = false;
      state.errorMessage = action?.error?.message as string;
    });
    builder.addCase(loadMorePopularData.pending, state => {
      state.morePopularDataLoading = true;
    });
    builder.addCase(loadMorePopularData.fulfilled, (state, action) => {
      state.morePopularDataLoading = false;
      state.popular = [...state.popular, ...action?.payload?.results];
      state.totalPages = action?.payload?.total_pages;
    });
    builder.addCase(loadMorePopularData.rejected, (state, action) => {
      state.morePopularDataLoading = false;
      state.errorMessage = action?.error?.message as string;
    });
  },
});
export const popularMovieReducer = popularMovieSlice.reducer;
export const {setCurrentPage, resetPopularMoviesError} =
  popularMovieSlice.actions;
