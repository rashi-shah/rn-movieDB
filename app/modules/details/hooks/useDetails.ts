import {RouteProp, useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {strings} from '../../../constants';
import {
  AppDispatch,
  RootState,
  fetchMovieById,
  fetchTvSeriesById,
  resetDetailsScreenError,
  resetMovieDetails,
} from '../../../redux';
import type {DetailsInfoType} from '../../../types';
import {convertToHoursAndMinutes} from '../../../utils';

export interface DetailsHookReturnType {
  movieDetails: Partial<DetailsInfoType>;
  date: Date;
  movieTime: string;
  releaseDate: string;
  director: string;
  overView: string;
  movieDetailsLoading: boolean;
  playing: boolean;
  onStatusChange: (status: string) => void;
  togglePlaying: () => void;
  youtubeKey: string;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const useDetails = (): DetailsHookReturnType => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const route = useRoute<RouteProp<{params: {id: number; isTv: boolean}}>>();
  const id: number = route?.params?.id;
  const isTv: boolean = route?.params?.isTv;
  const dispatch = useDispatch<AppDispatch>();
  const {movieDetails, errorLoadingDetails, movieDetailsLoading} = useSelector(
    (state: RootState) => state.newMovies,
  );
  const date: Date = new Date(
    (movieDetails?.release_date as string) ??
      (movieDetails?.first_air_date as string),
  );
  const overView: string =
    movieDetails?.overview?.length === 0
      ? strings.notAvailable
      : (movieDetails?.overview as string);
  const movieTime: string = isTv
    ? `${movieDetails?.number_of_episodes as number} ${strings.episode}`
    : convertToHoursAndMinutes(movieDetails?.runtime as number);
  const dateArr =
    movieDetails?.release_date?.split('-') ??
    movieDetails?.first_air_date?.split('-');
  dateArr?.push(dateArr?.shift() as string);
  const releaseDate: string = dateArr?.join('/') ?? strings.notAvailable;
  const director: string =
    movieDetails?.credits?.crew?.filter(
      member => member.job === strings.director,
    )?.[0]?.name ?? strings.notAvailable;
  const youtubeKey: string = isTv
    ? (movieDetails?.videos?.results?.[0]?.key as string)
    : (movieDetails?.videos?.results?.filter(video =>
        video.name.includes(strings.trailer),
      )?.[0]?.key as string);

  useEffect(() => {
    isTv ? dispatch(fetchTvSeriesById(id)) : dispatch(fetchMovieById(id));
    return () => {
      dispatch(resetMovieDetails());
    };
  }, [id]);

  useEffect(() => {
    if (errorLoadingDetails) {
      Alert.alert(errorLoadingDetails);
      dispatch(resetDetailsScreenError());
    }
  }, [errorLoadingDetails]);

  const onStatusChange = (status: string): void => {
    if (status === 'ended') {
      setPlaying(false);
      setLoading(false);
    }
  };

  const togglePlaying = (): void => {
    if (!playing && !youtubeKey) {
      Alert.alert(strings.trailerNotAvailable);
    } else if (playing && youtubeKey) {
      setPlaying(prev => !prev);
      setLoading(true);
    } else {
      setPlaying(prev => !prev);
    }
  };

  return {
    movieDetails,
    date,
    director,
    movieTime,
    releaseDate,
    overView,
    movieDetailsLoading,
    onStatusChange,
    playing,
    togglePlaying,
    youtubeKey,
    loading,
    setLoading,
  };
};

export {useDetails};
