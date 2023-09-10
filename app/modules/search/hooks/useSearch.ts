import {useCallback, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  AppDispatch,
  RootState,
  loadMoreSearchData,
  resetSearchErrorMessage,
  resetSearchList,
  searchData,
  setSearchPageNo,
} from '../../../redux';
import type {SearchStateType, TvInfoType} from '../../../types';

export interface SearchHookReturnType {
  handleChange: (val: string) => void;
  searchResults: TvInfoType[];
  loadMoreData: () => void;
  searchText: string;
  searchResultLoading: boolean;
  currentPage: number;
  totalPages: number;
}

const useSearch = (): SearchHookReturnType => {
  const [searchText, setSearchText] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const [pageNo, setPageNo] = useState<number>(1);
  const {
    currentPage,
    searchResults,
    totalPages,
    errorMessage,
    searchResultLoading,
  }: SearchStateType = useSelector((state: RootState) => state.search);

  useEffect(() => {
    if (searchText) {
      fetchSearchData(searchText);
    }
    setPageNo(1);
    return () => {
      dispatch(resetSearchList());
    };
  }, [searchText]);

  useEffect(() => {
    if (pageNo > 1) {
      dispatch(loadMoreSearchData({text: searchText, pageNo: pageNo}));
    }
  }, [currentPage]);

  useEffect(() => {
    if (errorMessage) {
      Alert.alert(errorMessage);
      dispatch(resetSearchErrorMessage());
    }
  }, [errorMessage]);

  const handleChange = (val: string): void => {
    setSearchText(val);
  };

  const fetchSearchData = useCallback(
    (text: string) => {
      dispatch(searchData(text));
    },
    [searchText],
  );

  const loadMoreData = (): void => {
    if (currentPage < totalPages) {
      setPageNo(pageNo + 1);
      dispatch(setSearchPageNo());
    }
  };

  return {
    handleChange,
    searchResults,
    loadMoreData,
    searchText,
    searchResultLoading,
    currentPage,
    totalPages,
  };
};

export default useSearch;
