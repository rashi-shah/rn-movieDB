import React, {FC} from 'react';
import {FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {appStyles} from '../../theme';
import type {TvInfoType} from '../../types';
import {DropDownList} from '../drop-down-list';
import {TrailerItem} from '../trailer-item';
import styles from './TrailerListStyles';
import {TrailerHookReturnType, useTrailer} from './hooks';
import TrailerListShimmer from './TrailerListShimmer';

interface MovieListPropType {
  data?: Array<TvInfoType>;
  list: {id: number; val: string}[];
  title: string;
  loadMoreData: () => void;
  selectedItem: number;
  setSelectedItem: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
}

const ListFooterComponent: FC = () => {
  return (
    <View
      style={StyleSheet.flatten([
        appStyles.screenStyles,
        styles.shimmerViewStyles,
      ])}>
      <SkeletonPlaceholder>
        <View style={styles.trailerImage}>
          <View style={styles.shimmerPosterContainer} />
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

const TrailerList: FC<MovieListPropType> = ({
  data,
  list,
  title,
  loadMoreData,
  selectedItem,
  setSelectedItem,
  currentPage,
  totalPages,
  isLoading,
}) => {
  const {
    isTv,
    uri,
    flatListRef,
    snapToOffsets,
    viewabilityConfigCallbackPairs,
    viewabilityConfig,
  }: TrailerHookReturnType = useTrailer(
    data as TvInfoType[],
    selectedItem,
    list,
  );

  return (
    <View key={selectedItem.toString()} style={appStyles.screenStyles}>
      <View style={styles.horizontalViewStyle}>
        {isLoading ? (
          <SkeletonPlaceholder>
            <View style={styles.shimmerHeaderStyles} />
          </SkeletonPlaceholder>
        ) : (
          <Text style={styles.headerStyles}>{title}</Text>
        )}
        <DropDownList
          isTrailer={true}
          {...{list, selectedItem, setSelectedItem, isLoading}}
        />
      </View>
      <View
        style={StyleSheet.flatten([appStyles.screenStyles, styles.viewStyles])}>
        {isLoading ? (
          <TrailerListShimmer />
        ) : (
          <ImageBackground
            resizeMethod="resize"
            style={styles.trailerImage}
            source={{uri: uri}}>
            <View style={styles.overlay} />
            <FlatList
              style={styles.positionStyles}
              viewabilityConfigCallbackPairs={
                viewabilityConfigCallbackPairs.current
              }
              viewabilityConfig={viewabilityConfig}
              extraData={data}
              showsHorizontalScrollIndicator={false}
              data={data}
              horizontal={true}
              keyExtractor={(item, index) => item?.id.toString() + index}
              onEndReachedThreshold={0.3}
              onEndReached={loadMoreData}
              decelerationRate={'normal'}
              ref={flatListRef}
              snapToOffsets={snapToOffsets}
              snapToAlignment={'center'}
              renderItem={({item}) => (
                <TrailerItem {...{item}} isTv={isTv ?? false} />
              )}
              ListFooterComponent={
                currentPage < totalPages ? <ListFooterComponent /> : null
              }
            />
          </ImageBackground>
        )}
      </View>
    </View>
  );
};

export default TrailerList;
