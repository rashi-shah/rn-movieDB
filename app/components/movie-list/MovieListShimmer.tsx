import React, {FC} from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import styles from './MovieListStyles';

const MovieListShimmer: FC = () => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.row}>
        <View style={styles.movieCardStyles}>
          <View style={styles.moviePosterStyle} />
          <View style={styles.movieTitleStyles} />
          <View style={styles.movieReleaseDate} />
        </View>
        <View style={styles.movieCardStyles}>
          <View style={styles.moviePosterStyle} />
          <View style={styles.movieTitleStyles} />
          <View style={styles.movieReleaseDate} />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

export default MovieListShimmer;
