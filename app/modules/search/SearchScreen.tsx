import React, {FC} from 'react';
import {FlatList, Image, TextInput, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Images} from '../../assets';
import {MovieItem, MovieListShimmer} from '../../components';
import {MovieSuggestionList} from '../../components/movie-suggestion-list';
import {strings} from '../../constants';
import {Colors, appStyles} from '../../theme';
import styles from './SearchScreenStyles';
import useSearch, {SearchHookReturnType} from './hooks/useSearch';

interface ListEmptyComponentPropType {
  searchText: string;
}

interface ListFooterComponentProps {
  length: number;
}

const ListEmptyComponent: FC<ListEmptyComponentPropType> = ({searchText}) => {
  return searchText ? (
    <Image
      style={styles.imageStyles}
      source={Images.searchNotFoundImage}
      resizeMode="cover"
    />
  ) : (
    <MovieSuggestionList />
  );
};

const ListFooterComponent: FC<ListFooterComponentProps> = ({length}) => {
  return length % 2 === 0 ? (
    <MovieListShimmer />
  ) : (
    <View style={styles.shimmerStyles}>
      <SkeletonPlaceholder>
        <View style={styles.movieCardStyles}>
          <View style={styles.moviePosterStyle} />
          <View style={styles.movieTitleStyles} />
          <View style={styles.movieReleaseDate} />
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

const SearchScreen: FC = () => {
  const {
    handleChange,
    searchResults,
    loadMoreData,
    searchResultLoading,
    searchText,
    currentPage,
    totalPages,
  }: SearchHookReturnType = useSearch();

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={strings.search}
        placeholderTextColor={Colors.darkBlue}
        style={styles.searchInputStyles}
        onChangeText={val => handleChange(val)}
      />
      {searchResultLoading ? (
        <>
          <View style={appStyles.bottomMarginStyles}>
            <MovieListShimmer />
          </View>
          <View style={appStyles.bottomMarginStyles}>
            <MovieListShimmer />
          </View>
        </>
      ) : (
        <FlatList
          ListEmptyComponent={<ListEmptyComponent {...{searchText}} />}
          ListFooterComponent={
            currentPage < totalPages ? (
              <ListFooterComponent length={searchResults.length} />
            ) : null
          }
          extraData={searchResults}
          data={searchResults}
          numColumns={2}
          keyExtractor={(item, index) =>
            (item?.id as number)?.toString() + index
          }
          onEndReachedThreshold={0.3}
          onEndReached={loadMoreData}
          renderItem={({item}) => (
            <MovieItem
              {...{item}}
              isTv={item?.media_type === strings.tv ? true : false}
            />
          )}
        />
      )}
    </View>
  );
};

export default SearchScreen;
