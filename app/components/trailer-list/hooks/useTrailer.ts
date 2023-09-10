import {useEffect, useRef, useState} from 'react';
import {FlatList} from 'react-native';
import {APIConstants, strings} from '../../../constants';
import {horizontalScale} from '../../../theme';
import type {ItemType, TvInfoType} from '../../../types';

export interface TrailerHookReturnType {
  flatListRef: React.RefObject<FlatList<TvInfoType>>;
  snapToOffsets: number[];
  viewabilityConfigCallbackPairs: React.MutableRefObject<
    {
      onViewableItemsChanged: ({
        viewableItems,
      }: {
        viewableItems: ItemType[];
      }) => void;
    }[]
  >;
  viewabilityConfig: {
    waitForInteraction: boolean;
    itemVisiblePercentThreshold: number;
  };
  uri: string;
  isTv: boolean;
}

const useTrailer = (
  data: TvInfoType[],
  selectedItem: number,
  list: {id: number; val: string}[],
): TrailerHookReturnType => {
  const flatListRef = useRef<FlatList<TvInfoType>>(null);
  const itemWidth: number = horizontalScale(330);
  const startScroll: number = itemWidth * 1;
  const [uri, setUri] = useState<string>(APIConstants.defaultImageURL);
  const viewabilityConfig = {
    waitForInteraction: true,
    itemVisiblePercentThreshold: 50,
  };
  const snapToOffsets: number[] = data?.map((x, i) => {
    return i * itemWidth + startScroll;
  });
  const isTv: boolean = list[selectedItem].val === strings.onTv ? true : false;

  const setBackgroundImage = (url: string): string =>
    `${APIConstants.backgroundImageURL}${url}`;

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ItemType[];
  }): void => {
    const url = setBackgroundImage(viewableItems[0]?.item?.backdrop_path);
    setUri(url);
  };

  const viewabilityConfigCallbackPairs = useRef([
    {viewabilityConfig, onViewableItemsChanged},
  ]);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({
        offset: startScroll,
        animated: false,
      });
    }
  }, [flatListRef]);

  useEffect(() => {
    const url = setBackgroundImage(data?.[0]?.backdrop_path);
    setUri(url);
  }, [data]);

  return {
    uri,
    flatListRef,
    snapToOffsets,
    viewabilityConfigCallbackPairs,
    viewabilityConfig,
    isTv,
  };
};

export {useTrailer};
