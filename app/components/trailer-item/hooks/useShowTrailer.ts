import {useState} from 'react';
import {Alert, ImageSourcePropType} from 'react-native';
import {useDispatch} from 'react-redux';
import {Images} from '../../../assets';
import {APIConstants, strings} from '../../../constants';
import {AppDispatch, fetchMovieById, fetchTvSeriesById} from '../../../redux';
import type {DetailsInfoType, TvInfoType} from '../../../types';
import {convertDate} from '../../../utils';

export interface ShowTrailerHookReturnType {
  date: string;
  playTrailer: (id: number) => void;
  url: ImageSourcePropType;
  blurRadius: number;
  onLoadEnd: () => void;
  playing: boolean;
  onStatusChange: (status: string) => void;
  youtubeId: string;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  stopTrailer: () => void;
}

const useShowTrailer = (
  item: TvInfoType,
  isTv: boolean,
): ShowTrailerHookReturnType => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [youtubeId, setYoutubeId] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const date: string = convertDate(item?.release_date ?? item?.first_air_date);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const uri: string = item?.backdrop_path
    ? `${APIConstants.imageBaseURL}${item?.backdrop_path}`
    : APIConstants.defaultImageURL;
  const url: ImageSourcePropType = isLoading
    ? Images.defaultImage
    : {
        uri: uri,
      };
  const blurRadius: number = isLoading ? 12 : 0;

  const onLoadEnd = (): void => {
    setIsLoading(false);
  };

  const onStatusChange = (status: string): void => {
    if (status === 'ended') {
      setPlaying(false);
      setLoading(false);
    }
  };

  const playTrailer = async (id: number): Promise<void> => {
    let youtubeKey;
    isTv
      ? await dispatch(fetchTvSeriesById(id)).then(result => {
          youtubeKey = (result?.payload as DetailsInfoType)?.videos
            ?.results?.[0]?.key;
        })
      : await dispatch(fetchMovieById(id)).then(result => {
          youtubeKey = (
            result?.payload as DetailsInfoType
          )?.videos?.results?.filter(video =>
            video.name.includes(strings.trailer),
          )?.[0]?.key;
        });
    if (!playing && !youtubeKey) {
      Alert.alert(strings.trailerNotAvailable);
    } else if (!playing && youtubeKey) {
      setYoutubeId(youtubeKey);
      setPlaying(prev => !prev);
      setLoading(true);
    } else {
      setPlaying(prev => !prev);
    }
  };

  const stopTrailer = (): void => {
    setPlaying(prev => !prev);
  };

  return {
    date,
    blurRadius,
    onLoadEnd,
    url,
    playTrailer,
    loading,
    onStatusChange,
    playing,
    setLoading,
    youtubeId,
    stopTrailer,
  };
};

export default useShowTrailer;
