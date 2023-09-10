import React, {Dispatch, FC} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Images} from '../../assets';
import {Colors, appStyles} from '../../theme';
import {CustomGradientText} from '../custom-gradient-text';
import styles from './DropDownListStyles';
import {DropDownHookReturnType, useDropDown} from './hooks';

interface DropDownListProps {
  list: {id: number; val: string}[];
  selectedItem: number;
  setSelectedItem: Dispatch<React.SetStateAction<number>>;
  isTrailer?: boolean;
  isLoading: boolean;
}

const DropDownList: FC<DropDownListProps> = ({
  list,
  selectedItem,
  setSelectedItem,
  isTrailer,
  isLoading,
}) => {
  const {
    imageStyles,
    backgroundStyle,
    changeFilter,
    textStyles,
    viewStyle,
    setShowListVisibility,
    showList,
  }: DropDownHookReturnType = useDropDown(list, setSelectedItem, isTrailer);

  return (
    <View style={styles.dropDownListContainerStyles}>
      {isLoading ? (
        <SkeletonPlaceholder>
          <View style={styles.dropDownShimmerStyles} />
        </SkeletonPlaceholder>
      ) : (
        <LinearGradient
          colors={[Colors.lightGreen, Colors.green]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={StyleSheet.flatten([
            styles.linearGradientViewStyles,
            viewStyle,
          ])}>
          <View
            style={StyleSheet.flatten([
              styles.dropDownViewStyles,
              backgroundStyle,
            ])}>
            <Pressable
              style={StyleSheet.flatten([
                appStyles.horizontalViewStyle,
                styles.buttonStyle,
                backgroundStyle,
              ])}
              onPress={setShowListVisibility}>
              {isTrailer ? (
                <Text
                  style={StyleSheet.flatten([styles.textStyles, textStyles])}>
                  {list[selectedItem].val}
                </Text>
              ) : (
                <CustomGradientText
                  colors={[Colors.lightGreen, Colors.green]}
                  style={styles.selectedTextStyles}>
                  {list[selectedItem].val}
                </CustomGradientText>
              )}
              <Image
                style={StyleSheet.flatten([styles.imageStyles, imageStyles])}
                source={showList ? Images.upArrow : Images.downArrow}
              />
            </Pressable>
            {showList && (
              <View style={styles.listViewStyles}>
                {list
                  .filter(val => val.id !== selectedItem)
                  .map(listItem => {
                    return (
                      <Pressable
                        style={styles.listItemStyles}
                        key={listItem.id.toString()}
                        onPress={() => changeFilter(listItem.id)}>
                        <Text style={styles.textStyles}>{listItem.val}</Text>
                      </Pressable>
                    );
                  })}
              </View>
            )}
          </View>
        </LinearGradient>
      )}
    </View>
  );
};

export default DropDownList;
