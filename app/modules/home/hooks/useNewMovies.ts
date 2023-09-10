import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {APIConstants} from '../../../constants';
import {
  AppDispatch,
  RootState,
  fetchNewMoviesData,
  loadMoreNewMoviesData,
  resetMoviesError,
  setPage,
} from '../../../redux';
import type {NewMoviesStateType, TvInfoType} from '../../../types';

export interface MoviesHookReturnType {
  loadMoreNewMovies: () => void;
  selectedNewItem: number;
  setSelectedNewItem: React.Dispatch<React.SetStateAction<number>>;
  newMovies: Array<Partial<TvInfoType>>;
  newMoviesCurrentPage: number;
  newMoviesTotalPages: number;
  newMoviesLoading: boolean;
  onRefreshNewMovies: () => void;
}

const useNewMovies = (
  list: {id: number; val: string}[],
): MoviesHookReturnType => {
  const dispatch = useDispatch<AppDispatch>();
  const [pageNo, setPageNo] = useState<number>(1);
  const {
    newMoviesCurrentPage,
    newMovies,
    newMoviesTotalPages,
    newMoviesLoading,
    errorMessage,
  }: NewMoviesStateType = useSelector((state: RootState) => state.newMovies);
  const [selectedNewItem, setSelectedNewItem] = useState<number>(list[0].id);
  let url = APIConstants.upcomingMoviesURL;
  switch (selectedNewItem) {
    case 1:
      url = APIConstants.nowPlayingMoviesURL;
      break;
    case 2:
      url = APIConstants.topRatedMoviesURL;
      break;
    default:
      url = APIConstants.upcomingMoviesURL;
      break;
  }

  useEffect(() => {
    dispatch(fetchNewMoviesData(url + 1));
  }, [selectedNewItem]);

  useEffect(() => {
    if (pageNo === 1) {
      dispatch(fetchNewMoviesData(url + 1));
    } else {
      dispatch(loadMoreNewMoviesData(url + pageNo));
    }
  }, [newMoviesCurrentPage]);

  const loadMoreNewMovies = (): void => {
    if (newMoviesCurrentPage < newMoviesTotalPages) {
      setPageNo(pageNo + 1);
      dispatch(setPage());
    }
  };

  const onRefreshNewMovies = (): void => {
    dispatch(fetchNewMoviesData(APIConstants.upcomingMoviesURL + 1));
    setSelectedNewItem(0);
  };

  useEffect(() => {
    if (errorMessage) {
      Alert.alert(errorMessage);
      dispatch(resetMoviesError());
    }
  }, [errorMessage]);

  return {
    loadMoreNewMovies,
    selectedNewItem,
    setSelectedNewItem,
    newMovies,
    newMoviesCurrentPage,
    newMoviesLoading,
    newMoviesTotalPages,
    onRefreshNewMovies,
  };
};

export {useNewMovies};
