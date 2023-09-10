import React, {FC} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import {Images} from '../../assets';
import {Colors, verticalScale} from '../../theme';
import {TvInfoType} from '../../types';
import styles from './TrailerItemStyles';
import {ShowTrailerHookReturnType} from './hooks';
import useShowTrailer from './hooks/useShowTrailer';

interface MovieItemPropType {
  item: TvInfoType;
  isTv: boolean;
}

const TrailerItem: FC<MovieItemPropType> = ({item, isTv}) => {
  const {
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
  }: ShowTrailerHookReturnType = useShowTrailer(item, isTv);

  return (
    <Pressable style={styles.container} onPress={() => playTrailer(item?.id)}>
      <View style={styles.posterContainer}>
        {playing ? (
          <TouchableOpacity
            style={styles.infoIconContainer}
            onPress={stopTrailer}>
            <Image style={styles.closeIconStyles} source={Images.closeIcon} />
          </TouchableOpacity>
        ) : (
          <>
            <View style={styles.infoIconContainer}>
              <Image style={styles.infoIconStyles} source={Images.infoIcon} />
            </View>
            <View style={styles.playIconContainer}>
              <Image style={styles.playIconStyles} source={Images.playIcon} />
            </View>
          </>
        )}
        {playing ? (
          <>
            <View style={styles.loaderContainerStyles}>
              <ActivityIndicator
                style={styles.loaderStyles}
                animating={loading}
                size={'large'}
                color={Colors.lightBlue}
              />
            </View>
            <YoutubePlayer
              height={verticalScale(390)}
              videoId={youtubeId}
              play={playing}
              onChangeState={onStatusChange}
              onReady={() => setLoading(false)}
            />
          </>
        ) : (
          <Image
            style={styles.posterImage}
            source={url}
            {...{blurRadius, onLoadEnd}}
          />
        )}
        <Text style={styles.nameTextStyle}>{item?.name ?? item?.title}</Text>
        <Text style={styles.dateTextStyle}>{date}</Text>
      </View>
    </Pressable>
  );
};

export default TrailerItem;
