import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {APIConstants} from '../../../constants';
import {
  AppDispatch,
  RootState,
  fetchSuggestedMovies,
  loadMoreSuggestions,
  resetSuggestedMovieError,
  setCurrentSuggestedPage,
} from '../../../redux';
import type {MovieSuggestionStateType, TvInfoType} from '../../../types';

export interface SuggestionHookReturnType {
  loadMoreData: () => void;
  currentPage: number;
  totalPages: number;
  suggestedMovies: Array<Partial<TvInfoType>>;
  suggestionsLoading: boolean;
}

const useMovieSuggestions = (): SuggestionHookReturnType => {
  const dispatch = useDispatch<AppDispatch>();
  const [pageNo, setPageNo] = useState<number>(1);
  const {
    currentPage,
    totalPages,
    errorMessage,
    suggestedMovies,
    suggestionsLoading,
  }: MovieSuggestionStateType = useSelector(
    (state: RootState) => state.discover,
  );

  useEffect(() => {
    if (pageNo === 1) {
      dispatch(
        fetchSuggestedMovies(`${APIConstants.discoverMoviesURL}${pageNo}`),
      );
    } else {
      dispatch(
        loadMoreSuggestions(`${APIConstants.discoverMoviesURL}${pageNo}`),
      );
    }
  }, [currentPage]);

  useEffect(() => {
    if (errorMessage) {
      Alert.alert(errorMessage);
      dispatch(resetSuggestedMovieError());
    }
  }, [errorMessage]);

  const loadMoreData = (): void => {
    if (currentPage < totalPages) {
      setPageNo(pageNo + 1);
      dispatch(setCurrentSuggestedPage());
    }
  };

  return {
    loadMoreData,
    currentPage,
    totalPages,
    suggestedMovies,
    suggestionsLoading,
  };
};

export default useMovieSuggestions;
