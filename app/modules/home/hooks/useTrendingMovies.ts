import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {APIConstants} from '../../../constants';
import {
  AppDispatch,
  RootState,
  fetchTrendingMovies,
  loadTrendingMovies,
  resetError,
  setPageVal,
} from '../../../redux';
import type {TrendingMoviesStateType, TvInfoType} from '../../../types';

export interface TrendingHookReturnType {
  loadMoreTrendingMovies: () => void;
  selectedTrendingItem: number;
  setSelectedTrendingItem: React.Dispatch<React.SetStateAction<number>>;
  trendingMovies: Array<Partial<TvInfoType>>;
  trendingCurrentPage: number;
  trendingTotalPages: number;
  trendingMoviesLoading: boolean;
  onRefreshTrendingMovies: () => void;
}

const useTrendingMovies = (
  list: {id: number; val: string}[],
): TrendingHookReturnType => {
  const dispatch = useDispatch<AppDispatch>();
  const [pageNo, setPageNo] = useState<number>(1);
  const {
    trendingCurrentPage,
    trendingTotalPages,
    trendingMovies,
    trendingMoviesLoading,
    errorMessage,
  }: TrendingMoviesStateType = useSelector(
    (state: RootState) => state.trendingMovies,
  );
  const [selectedTrendingItem, setSelectedTrendingItem] = useState<number>(
    list[0].id,
  );
  const url =
    selectedTrendingItem === 0
      ? APIConstants.trendingToday
      : APIConstants.trendingWeekly;

  useEffect(() => {
    dispatch(fetchTrendingMovies(url + 1));
  }, [selectedTrendingItem]);

  useEffect(() => {
    if (pageNo === 1) {
      dispatch(fetchTrendingMovies(url + 1));
    } else {
      dispatch(loadTrendingMovies(url + pageNo));
    }
  }, [trendingCurrentPage]);

  const loadMoreTrendingMovies = (): void => {
    if (trendingCurrentPage < trendingTotalPages) {
      setPageNo(pageNo + 1);
      dispatch(setPageVal());
    }
  };

  const onRefreshTrendingMovies = (): void => {
    dispatch(fetchTrendingMovies(APIConstants.trendingToday + 1));
    setSelectedTrendingItem(0);
  };

  useEffect(() => {
    if (errorMessage) {
      Alert.alert(errorMessage);
      dispatch(resetError());
    }
  }, [errorMessage]);

  return {
    loadMoreTrendingMovies,
    selectedTrendingItem,
    setSelectedTrendingItem,
    trendingMovies,
    trendingCurrentPage,
    trendingMoviesLoading,
    trendingTotalPages,
    onRefreshTrendingMovies,
  };
};

export {useTrendingMovies};
