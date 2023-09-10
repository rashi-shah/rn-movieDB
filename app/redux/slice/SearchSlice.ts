import {createAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {debounce} from 'lodash';
import {APIConstants, ActionTypes, strings} from '../../constants';
import {fetchData} from '../../services';
import type {SearchDataType, SearchStateType} from '../../types';
import {AppDispatch} from '../Store';

const initialState: SearchStateType = {
  searchResults: [],
  currentPage: 1,
  errorMessage: '',
  totalPages: 0,
  searchResultLoading: false,
  moreSearchResultLoading: false,
};

const updateSearch = createAction<SearchDataType>(ActionTypes.updateData);
const updateFailed = createAction<string>(ActionTypes.updateFailed);

const searchHandler = async (
  searchText: string,
  {dispatch}: {dispatch: AppDispatch},
): Promise<void> => {
  try {
    const response: SearchDataType = await fetchData(
      `${APIConstants.searchURL}${searchText}${APIConstants.page}` + 1,
    );
    const filteredRes = {
      ...response,
      results: response?.results?.filter(
        result =>
          result.media_type === strings.movie ||
          result.media_type === strings.tv,
      ),
    };
    dispatch(updateSearch(filteredRes));
  } catch (error) {
    dispatch(updateFailed(error as string));
  }
};

const debounceHandler = debounce(searchHandler, 1000);

export const searchData = createAsyncThunk<
  void,
  string,
  {searchText: string; dispatch: AppDispatch}
>(ActionTypes.searchData, debounceHandler);

export const loadMoreSearchData = createAsyncThunk(
  ActionTypes.loadMoreSearchData,
  async ({text, pageNo}: {text: string; pageNo: number}) => {
    const response: SearchDataType = await fetchData(
      `${APIConstants.searchURL}${text}${APIConstants.page}${pageNo}`,
    );
    const filteredRes = {
      ...response,
      results: response?.results?.filter(
        result =>
          result.media_type === strings.movie ||
          result.media_type === strings.tv,
      ),
    };
    return filteredRes;
  },
);

const searchSlice = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: {
    setSearchPageNo: state => {
      state.currentPage = state.currentPage + 1;
    },
    resetSearchList: state => {
      state.searchResults = [];
    },
    resetSearchErrorMessage: state => {
      state.errorMessage = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(searchData.pending, state => {
      state.searchResultLoading = true;
    });
    builder.addCase(loadMoreSearchData.pending, state => {
      state.moreSearchResultLoading = true;
    });
    builder.addCase(loadMoreSearchData.fulfilled, (state, action) => {
      state.moreSearchResultLoading = false;
      state.searchResults = [
        ...state.searchResults,
        ...action?.payload?.results,
      ];
      state.totalPages = action?.payload?.total_pages;
    });
    builder.addCase(loadMoreSearchData.rejected, (state, action) => {
      state.moreSearchResultLoading = false;
      state.errorMessage = action?.error?.message as string;
    });
    builder.addCase(updateSearch, (state, action) => {
      state.searchResultLoading = false;
      state.searchResults = action?.payload?.results;
      state.totalPages = action?.payload?.total_pages;
      state.currentPage = 1;
    });
    builder.addCase(updateFailed, (state, action) => {
      state.searchResultLoading = false;
      state.errorMessage = action?.payload;
    });
  },
});
export const searchReducer = searchSlice.reducer;
export const {setSearchPageNo, resetSearchErrorMessage, resetSearchList} =
  searchSlice.actions;
