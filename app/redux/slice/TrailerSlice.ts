import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ActionTypes} from '../../constants';
import {fetchData} from '../../services';
import type {APIDataType, TrailerStateType} from '../../types';

const initialState: TrailerStateType = {
  trailerList: [],
  trailerCurrentPage: 1,
  errorMessage: '',
  trailerTotalPages: 0,
  moreTrailerDataLoading: false,
  trailerLoading: false,
};

export const fetchTrailers = createAsyncThunk(
  ActionTypes.fetchTrailers,
  async (url: string) => {
    const response: APIDataType = await fetchData(url);
    return response;
  },
);

export const loadMoreTrailerData = createAsyncThunk(
  ActionTypes.loadMoreTrailerData,
  async (url: string) => {
    const response: APIDataType = await fetchData(url);
    return response;
  },
);

const movieTrailerSlice = createSlice({
  name: 'trailerMovie',
  initialState: initialState,
  reducers: {
    setTrailerPageNo: state => {
      state.trailerCurrentPage = state.trailerCurrentPage + 1;
    },
    resetTrailerError: state => {
      state.errorMessage = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchTrailers.pending, state => {
      state.trailerLoading = true;
    });
    builder.addCase(fetchTrailers.fulfilled, (state, action) => {
      state.trailerLoading = false;
      state.trailerList = action?.payload?.results;
      state.trailerTotalPages = action?.payload?.total_pages;
      state.trailerCurrentPage = 1;
    });
    builder.addCase(fetchTrailers.rejected, (state, action) => {
      state.trailerLoading = false;
      state.errorMessage = action?.error?.message as string;
    });
    builder.addCase(loadMoreTrailerData.pending, state => {
      state.moreTrailerDataLoading = true;
    });
    builder.addCase(loadMoreTrailerData.fulfilled, (state, action) => {
      state.moreTrailerDataLoading = false;
      state.trailerList = [...state.trailerList, ...action?.payload?.results];
      state.trailerTotalPages = action?.payload?.total_pages;
    });
    builder.addCase(loadMoreTrailerData.rejected, (state, action) => {
      state.moreTrailerDataLoading = false;
      state.errorMessage = action?.error?.message as string;
    });
  },
});
export const movieTrailerReducer = movieTrailerSlice.reducer;
export const {setTrailerPageNo, resetTrailerError} = movieTrailerSlice.actions;
