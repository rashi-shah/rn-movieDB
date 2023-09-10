import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {APIConstants} from '../../../constants';
import {
  AppDispatch,
  RootState,
  fetchPopularMovies,
  loadMorePopularData,
  resetPopularMoviesError,
  setCurrentPage,
} from '../../../redux';
import type {MoviesStateType, TvInfoType} from '../../../types';
import {Alert} from 'react-native';

export interface PopularMoviesHookReturnType {
  loadMoreData: () => void;
  selectedItem: number;
  setSelectedItem: React.Dispatch<React.SetStateAction<number>>;
  popular: Array<Partial<TvInfoType>>;
  currentPage: number;
  totalPages: number;
  popularMoviesLoading: boolean;
  onRefreshPopularMovies: () => void;
}

const usePopularMovies = (
  list: {id: number; val: string}[],
): PopularMoviesHookReturnType => {
  const dispatch = useDispatch<AppDispatch>();
  const [pageNo, setPageNo] = useState<number>(1);
  const {
    currentPage,
    popular,
    totalPages,
    popularMoviesLoading,
    errorMessage,
  }: MoviesStateType = useSelector((state: RootState) => state.popularMovies);
  const [selectedItem, setSelectedItem] = useState<number>(list[0].id);
  let url = APIConstants.popularMoviesURL;
  switch (selectedItem) {
    case 1:
      url = APIConstants.popularTvURL;
      break;
    case 2:
      url = APIConstants.onRentURL;
      break;
    default:
      url = APIConstants.popularMoviesURL;
      break;
  }

  useEffect(() => {
    dispatch(fetchPopularMovies(url + 1));
  }, [selectedItem]);

  useEffect(() => {
    if (pageNo === 1) {
      dispatch(fetchPopularMovies(url + 1));
    } else {
      dispatch(loadMorePopularData(url + pageNo));
    }
  }, [currentPage]);

  const loadMoreData = (): void => {
    if (currentPage < totalPages) {
      setPageNo(pageNo + 1);
      dispatch(setCurrentPage());
    }
  };

  const onRefreshPopularMovies = (): void => {
    dispatch(fetchPopularMovies(APIConstants.popularMoviesURL + 1));
    setSelectedItem(0);
  };

  useEffect(() => {
    if (errorMessage) {
      Alert.alert(errorMessage);
      dispatch(resetPopularMoviesError());
    }
  }, [errorMessage]);

  return {
    loadMoreData,
    selectedItem,
    setSelectedItem,
    popular,
    popularMoviesLoading,
    currentPage,
    totalPages,
    onRefreshPopularMovies,
  };
};

export {usePopularMovies};
