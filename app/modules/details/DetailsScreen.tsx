import React, {FC} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Images} from '../../assets';
import {Progress} from '../../components';
import {APIConstants, strings} from '../../constants';
import {Colors, moderateScale, verticalScale} from '../../theme';
import styles from './DetailsScreenStyles';
import {DetailsHookReturnType, useDetails} from './hooks';
import type {DetailsInfoType} from '../../types';
import YoutubePlayer from 'react-native-youtube-iframe';

interface ImageBackdropProps {
  movieDetails: Partial<DetailsInfoType>;
}

const ImageBackdrop: FC<ImageBackdropProps> = ({movieDetails}) => {
  return (
    <View style={styles.backdropImageContainer}>
      <LinearGradient
        colors={['rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0)']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.linearGradientStyles}
      />
      <View style={styles.posterImageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: `${APIConstants.imageBaseURL}${movieDetails?.poster_path}`,
          }}
        />
      </View>
      <Image
        style={styles.backdropImage}
        source={{
          uri: `${APIConstants.imageBaseURL}${movieDetails?.backdrop_path}`,
        }}
      />
    </View>
  );
};

const DetailsScreen: FC = () => {
  const {
    movieDetails,
    date,
    director,
    movieTime,
    releaseDate,
    overView,
    movieDetailsLoading,
    onStatusChange,
    playing,
    youtubeKey,
    togglePlaying,
    loading,
    setLoading,
  }: DetailsHookReturnType = useDetails();

  return (
    <ScrollView style={styles.container} bounces={false}>
      {movieDetailsLoading && (
        <View style={styles.activityIndicatorStyles}>
          <ActivityIndicator
            animating={movieDetailsLoading}
            size={'large'}
            color={Colors.lightBlue}
          />
        </View>
      )}
      {playing ? (
        <>
          <YoutubePlayer
            height={verticalScale(211)}
            videoId={youtubeKey}
            play={playing}
            onChangeState={onStatusChange}
            onReady={() => setLoading(false)}
          />
          <ActivityIndicator
            style={styles.loaderStyles}
            animating={loading}
            size={'small'}
            color={Colors.lightBlue}
          />
        </>
      ) : (
        <ImageBackdrop {...{movieDetails}} />
      )}
      <View style={styles.movieNameContainer}>
        <Text style={styles.nameTextStyles} numberOfLines={2}>
          {movieDetails?.title ?? movieDetails?.name}
          <Text style={styles.yearTextStyles}>{`(${date.getFullYear()})`}</Text>
        </Text>
      </View>
      <View style={styles.movieScoreContainer}>
        <Progress
          style={styles.progressContainer}
          value={(movieDetails?.vote_average as number) * 10}
          radius={moderateScale(30)}
          fontSize={moderateScale(10)}
          progressValueFontSize={moderateScale(22)}
          inActiveStrokeWidth={moderateScale(5)}
          activeStrokeWidth={moderateScale(5)}
        />
        <Text style={styles.scoreStyles}>{strings.userScore}</Text>
        <Text style={styles.pipeSymbol}>|</Text>
        <TouchableOpacity
          style={styles.trailerContainer}
          onPress={togglePlaying}>
          <Image
            style={styles.imageStyles}
            source={playing ? Images.pauseIcon : Images.playIcon}
          />
          <Text style={styles.trailerTextStyles}>
            {playing ? strings.showPoster : strings.playTrailer}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.movieReviewContainer}>
        <Text
          style={
            styles.movieReviewStyles
          }>{`${releaseDate} (${movieDetails?.production_countries?.[0]?.iso_3166_1}) . ${movieTime}`}</Text>
        <Text style={styles.movieReviewStyles}>{`${movieDetails?.genres
          ?.map(genre => genre?.name)
          .join(', ')}`}</Text>
      </View>
      <View style={styles.overViewContainer}>
        <Text style={styles.scoreStyles}>{strings.overView}</Text>
        <Text style={styles.overViewTextStyles}>{overView}</Text>
        <Text
          style={StyleSheet.flatten([
            styles.overViewTextStyles,
            styles.boldFontStyles,
          ])}>
          {director}
        </Text>
        <Text style={styles.directorTextStyles}>{strings.director}</Text>
      </View>
    </ScrollView>
  );
};

export default DetailsScreen;
