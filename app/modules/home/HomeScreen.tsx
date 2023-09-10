import React, {FC, useState} from 'react';
import {ImageBackground, RefreshControl, ScrollView, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Images} from '../../assets';
import {MovieList, TrailerList} from '../../components';
import {
  newMoviesFilterList,
  popularFilterList,
  strings,
  trendingMoviesFilterList,
} from '../../constants';
import type {TvInfoType} from '../../types';
import styles from './HomeScreenStyles';
import {
  MoviesHookReturnType,
  PopularMoviesHookReturnType,
  TrailerHookReturnType,
  TrendingHookReturnType,
  useNewMovies,
  usePopularMovies,
  useTrailers,
  useTrendingMovies,
} from './hooks';

const HomeScreen: FC = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const onRefresh = () => {
    onRefreshNewMovies();
    onRefreshTrendingMovies();
    onRefreshPopularMovies();
    onRefreshTrailers();
    setRefreshing(false);
  };
  const {
    loadMoreData,
    selectedItem,
    setSelectedItem,
    popular,
    currentPage,
    popularMoviesLoading,
    totalPages,
    onRefreshPopularMovies,
  }: PopularMoviesHookReturnType = usePopularMovies(popularFilterList);
  const {
    loadMoreNewMovies,
    selectedNewItem,
    setSelectedNewItem,
    newMovies,
    newMoviesCurrentPage,
    newMoviesLoading,
    newMoviesTotalPages,
    onRefreshNewMovies,
  }: MoviesHookReturnType = useNewMovies(newMoviesFilterList);
  const {
    loadMoreTrendingMovies,
    selectedTrendingItem,
    setSelectedTrendingItem,
    trendingMovies,
    trendingCurrentPage,
    trendingMoviesLoading,
    trendingTotalPages,
    onRefreshTrendingMovies,
  }: TrendingHookReturnType = useTrendingMovies(trendingMoviesFilterList);
  const {
    loadMoreTrailersData,
    selectedTrailerItem,
    setSelectedTrailerItem,
    trailerList,
    trailerCurrentPage,
    trailerLoading,
    trailerTotalPages,
    onRefreshTrailers,
  }: TrailerHookReturnType = useTrailers(popularFilterList);
  return (
    <ScrollView
      contentContainerStyle={styles.contentContainerStyle}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.linearGradientStyles}
      />
      <View style={styles.container}>
        <MovieList
          data={popular as TvInfoType[]}
          title={strings.popular}
          list={popularFilterList}
          isLoading={popularMoviesLoading}
          {...{
            loadMoreData,
            selectedItem,
            setSelectedItem,
            currentPage,
            totalPages,
          }}
        />
      </View>
      <View style={styles.container}>
        <MovieList
          data={newMovies as TvInfoType[]}
          title={strings.newMovies}
          list={newMoviesFilterList}
          loadMoreData={loadMoreNewMovies}
          selectedItem={selectedNewItem}
          setSelectedItem={setSelectedNewItem}
          currentPage={newMoviesCurrentPage}
          totalPages={newMoviesTotalPages}
          isLoading={newMoviesLoading}
        />
      </View>
      <View style={styles.container}>
        <TrailerList
          data={trailerList as TvInfoType[]}
          title={strings.latestTrailer}
          list={popularFilterList}
          loadMoreData={loadMoreTrailersData}
          selectedItem={selectedTrailerItem}
          setSelectedItem={setSelectedTrailerItem}
          currentPage={trailerCurrentPage}
          totalPages={trailerTotalPages}
          isLoading={trailerLoading}
        />
      </View>
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBackgroundStyles}
          resizeMode="contain"
          source={Images.trendingBackgroundImage}>
          <MovieList
            data={trendingMovies as TvInfoType[]}
            title={strings.trending}
            list={trendingMoviesFilterList}
            loadMoreData={loadMoreTrendingMovies}
            selectedItem={selectedTrendingItem}
            setSelectedItem={setSelectedTrendingItem}
            currentPage={trendingCurrentPage}
            totalPages={trendingTotalPages}
            isLoading={trendingMoviesLoading}
          />
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
