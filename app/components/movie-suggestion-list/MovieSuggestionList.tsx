import React, {FC} from 'react';
import {FlatList, View} from 'react-native';
import {strings} from '../../constants';
import {Colors, appStyles} from '../../theme';
import {TvInfoType} from '../../types';
import {CustomGradientText} from '../custom-gradient-text';
import {MovieItem} from '../movie-item';
import useMovieSuggestions, {
  SuggestionHookReturnType,
} from './hooks/useMovieSuggestions';
import {MovieListShimmer} from '../movie-list';

const ListFooterComponent: FC = () => {
  return (
    <View style={appStyles.bottomMarginStyles}>
      <MovieListShimmer />
    </View>
  );
};

const MovieSuggestionList = () => {
  const {
    loadMoreData,
    suggestedMovies,
    suggestionsLoading,
    currentPage,
    totalPages,
  }: SuggestionHookReturnType = useMovieSuggestions();

  return (
    <View>
      <CustomGradientText
        colors={[Colors.darkBlue, Colors.lightBlue]}
        style={appStyles.suggestionHeaderStyles}>
        {strings.discoverMovies}
      </CustomGradientText>
      {suggestionsLoading ? (
        <>
          <ListFooterComponent />
          <ListFooterComponent />
        </>
      ) : (
        <FlatList
          data={suggestedMovies as TvInfoType[]}
          numColumns={2}
          keyExtractor={(item, index) =>
            (item?.id as number)?.toString() + index
          }
          onEndReachedThreshold={0.3}
          onEndReached={loadMoreData}
          ListFooterComponent={
            currentPage < totalPages ? <ListFooterComponent /> : null
          }
          renderItem={({item}) => <MovieItem {...{item}} isTv={false} />}
        />
      )}
    </View>
  );
};

export default MovieSuggestionList;
