import React, {FC} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {strings} from '../../constants';
import {appStyles} from '../../theme';
import type {TvInfoType} from '../../types';
import {DropDownList} from '../drop-down-list';
import {MovieItem} from '../movie-item';
import MovieListShimmer from './MovieListShimmer';
import styles from './MovieListStyles';

interface MovieListPropType {
  data?: Array<TvInfoType>;
  list: {id: number; val: string}[];
  title: string;
  loadMoreData: () => void;
  selectedItem: number;
  setSelectedItem: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
}

const ListFooterComponent: FC = () => {
  return (
    <SkeletonPlaceholder>
      <View
        style={StyleSheet.flatten([
          styles.moviePosterStyle,
          styles.listEmptyStyles,
        ])}
      />
    </SkeletonPlaceholder>
  );
};

const MovieList: FC<MovieListPropType> = ({
  data,
  list,
  title,
  loadMoreData,
  selectedItem,
  setSelectedItem,
  isLoading,
  currentPage,
  totalPages,
}) => {
  const isTv: boolean = list[selectedItem].val === strings.onTv ? true : false;

  return (
    <View
      key={selectedItem.toString()}
      style={StyleSheet.flatten([appStyles.screenStyles, styles.container])}>
      <View style={appStyles.horizontalViewStyle}>
        {isLoading ? (
          <SkeletonPlaceholder>
            <View style={appStyles.shimmerHeaderStyles} />
          </SkeletonPlaceholder>
        ) : (
          <Text style={appStyles.headerStyles}>{title}</Text>
        )}
        <DropDownList {...{list, selectedItem, setSelectedItem, isLoading}} />
      </View>
      <View
        style={StyleSheet.flatten([appStyles.screenStyles, styles.viewStyles])}>
        {isLoading ? (
          <MovieListShimmer />
        ) : (
          <FlatList
            extraData={data}
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={
              currentPage < totalPages ? <ListFooterComponent /> : null
            }
            data={data}
            horizontal={true}
            keyExtractor={(item, index) => item?.id.toString() + index}
            onEndReachedThreshold={0.4}
            onEndReached={loadMoreData}
            renderItem={({item}) => <MovieItem {...{item, isTv}} />}
          />
        )}
      </View>
    </View>
  );
};

export default MovieList;
