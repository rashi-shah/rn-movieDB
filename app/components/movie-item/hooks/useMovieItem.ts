import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useState} from 'react';
import {APIConstants} from '../../../constants';
import type {TvInfoType} from '../../../types';
import {convertDate} from '../../../utils';

export interface MovieItemHookReturnType {
  value: number;
  date: string;
  uri: string;
  onLoadEnd: () => void;
  navigation: StackNavigationProp<ParamListBase>;
  isLoading: boolean;
}

export const useMovieItem = (item: TvInfoType): MovieItemHookReturnType => {
  const value: number = (item?.vote_average as number) * 10;
  const date: string = convertDate(item?.first_air_date ?? item?.release_date);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const uri: string = item?.poster_path
    ? `${APIConstants.imageBaseURL}${item?.poster_path}`
    : APIConstants.defaultImageURL;

  const onLoadEnd = (): void => {
    setIsLoading(false);
  };

  return {value, date, uri, onLoadEnd, navigation, isLoading};
};
