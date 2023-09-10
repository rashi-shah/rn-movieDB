import React, {FC} from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import styles from './TrailerListStyles';

const TrailerListShimmer: FC = () => {
  return (
    <View style={styles.backgroundStyles}>
      <SkeletonPlaceholder>
        <View style={styles.trailerImage}>
          <View style={styles.shimmerPosterContainer} />
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

export default TrailerListShimmer;
