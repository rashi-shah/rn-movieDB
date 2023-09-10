import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {APIConstants} from '../../../constants';
import {
  AppDispatch,
  RootState,
  fetchTrailers,
  loadMoreTrailerData,
  resetTrailerError,
  setTrailerPageNo,
} from '../../../redux';
import type {TrailerStateType, TvInfoType} from '../../../types';
import {Alert} from 'react-native';

export interface TrailerHookReturnType {
  loadMoreTrailersData: () => void;
  selectedTrailerItem: number;
  setSelectedTrailerItem: React.Dispatch<React.SetStateAction<number>>;
  trailerList: Array<Partial<TvInfoType>>;
  trailerCurrentPage: number;
  trailerTotalPages: number;
  trailerLoading: boolean;
  onRefreshTrailers: () => void;
}

const useTrailers = (
  list: {id: number; val: string}[],
): TrailerHookReturnType => {
  const dispatch = useDispatch<AppDispatch>();
  const [pageNo, setPageNo] = useState<number>(1);
  const {
    trailerCurrentPage,
    trailerList,
    trailerTotalPages,
    trailerLoading,
    errorMessage,
  }: TrailerStateType = useSelector((state: RootState) => state.trailer);
  const [selectedTrailerItem, setSelectedTrailerItem] = useState<number>(
    list[0].id,
  );
  let url = APIConstants.popularMoviesURL;
  switch (selectedTrailerItem) {
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
    dispatch(fetchTrailers(url + 1));
  }, [selectedTrailerItem]);

  useEffect(() => {
    if (pageNo === 1) {
      dispatch(fetchTrailers(url + 1));
    } else {
      dispatch(loadMoreTrailerData(url + pageNo));
    }
  }, [trailerCurrentPage]);

  const loadMoreTrailersData = (): void => {
    if (trailerCurrentPage < trailerTotalPages) {
      setPageNo(pageNo + 1);
      dispatch(setTrailerPageNo());
    }
  };

  const onRefreshTrailers = (): void => {
    dispatch(fetchTrailers(APIConstants.upcomingMoviesURL + 1));
    setSelectedTrailerItem(0);
  };

  useEffect(() => {
    if (errorMessage) {
      Alert.alert(errorMessage);
      dispatch(resetTrailerError());
    }
  }, [errorMessage]);

  return {
    loadMoreTrailersData,
    selectedTrailerItem,
    setSelectedTrailerItem,
    trailerList,
    trailerCurrentPage,
    trailerLoading,
    trailerTotalPages,
    onRefreshTrailers,
  };
};

export {useTrailers};
