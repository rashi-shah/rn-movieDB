import React, {FC} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Images} from '../../assets';
import {moderateScale} from '../../theme';
import {TvInfoType} from '../../types';
import {navigateToDetailsScreen} from '../../utils';
import {Progress} from '../progress';
import styles from './MovieItemStyles';
import {MovieItemHookReturnType, useMovieItem} from './hooks/useMovieItem';

interface MovieItemPropType {
  item: TvInfoType;
  isTv: boolean;
}

const MovieItem: FC<MovieItemPropType> = ({item, isTv}) => {
  const {
    date,
    navigation,
    onLoadEnd,
    uri,
    value,
    isLoading,
  }: MovieItemHookReturnType = useMovieItem(item);

  return (
    <Pressable
      style={styles.movieCardStyles}
      onPress={() => navigateToDetailsScreen(navigation, item?.id, isTv)}>
      <View style={styles.moviePosterStyle}>
        <View style={styles.infoIconContainer}>
          <Image style={styles.infoIconStyles} source={Images.infoIcon} />
        </View>
        {isLoading && (
          <View style={styles.shimmerViewStyles}>
            <SkeletonPlaceholder>
              <View style={styles.shimmerStyles} />
            </SkeletonPlaceholder>
          </View>
        )}
        {uri && (
          <Image
            style={styles.imageStyles}
            onLoadEnd={onLoadEnd}
            source={{uri: uri}}
          />
        )}
      </View>
      <Progress
        style={styles.progressContainer}
        value={value}
        radius={moderateScale(20)}
        fontSize={moderateScale(6)}
        progressValueFontSize={moderateScale(14)}
        inActiveStrokeWidth={moderateScale(3)}
        activeStrokeWidth={moderateScale(3)}
      />
      <View style={styles.movieInfoContainer}>
        <Text
          style={styles.movieTitleStyles}
          numberOfLines={2}
          ellipsizeMode="tail">
          {item?.name ?? item?.title}
        </Text>
        <Text style={styles.movieReleaseDate}>{date}</Text>
      </View>
    </Pressable>
  );
};

export default MovieItem;
