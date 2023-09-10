import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ActionTypes} from '../../constants';
import {fetchData} from '../../services';
import type {APIDataType, MovieSuggestionStateType} from '../../types';

const initialState: MovieSuggestionStateType = {
  suggestedMovies: [],
  currentPage: 1,
  errorMessage: '',
  totalPages: 0,
  suggestionsLoading: false,
  moreSuggestionLoading: false,
};

export const fetchSuggestedMovies = createAsyncThunk(
  ActionTypes.fetchSuggestedMovies,
  async (url: string) => {
    const response: APIDataType = await fetchData(url);
    return response;
  },
);

export const loadMoreSuggestions = createAsyncThunk(
  ActionTypes.loadMoreSuggestions,
  async (url: string) => {
    const response: APIDataType = await fetchData(url);
    return response;
  },
);

const DiscoverMovieSlice = createSlice({
  name: 'discover',
  initialState: initialState,
  reducers: {
    setCurrentSuggestedPage: state => {
      state.currentPage = state.currentPage + 1;
    },
    resetSuggestedMovieError: state => {
      state.errorMessage = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchSuggestedMovies.pending, state => {
      state.suggestionsLoading = true;
    });
    builder.addCase(fetchSuggestedMovies.fulfilled, (state, action) => {
      state.suggestionsLoading = false;
      state.suggestedMovies = action?.payload?.results;
      state.totalPages = action?.payload?.total_pages;
      state.currentPage = 1;
    });
    builder.addCase(fetchSuggestedMovies.rejected, (state, action) => {
      state.suggestionsLoading = false;
      state.errorMessage = action?.error?.message as string;
    });
    builder.addCase(loadMoreSuggestions.pending, state => {
      state.moreSuggestionLoading = true;
    });
    builder.addCase(loadMoreSuggestions.fulfilled, (state, action) => {
      state.moreSuggestionLoading = false;
      state.suggestedMovies = [
        ...state.suggestedMovies,
        ...action?.payload?.results,
      ];
      state.totalPages = action?.payload?.total_pages;
    });
    builder.addCase(loadMoreSuggestions.rejected, (state, action) => {
      state.moreSuggestionLoading = false;
      state.errorMessage = action?.error?.message as string;
    });
  },
});
export const discoverMovieReducer = DiscoverMovieSlice.reducer;
export const {setCurrentSuggestedPage, resetSuggestedMovieError} =
  DiscoverMovieSlice.actions;
