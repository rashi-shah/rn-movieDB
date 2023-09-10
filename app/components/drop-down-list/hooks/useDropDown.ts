import React, {Dispatch, useState} from 'react';
import {Colors, horizontalScale, verticalScale} from '../../../theme';

export interface DropDownHookReturnType {
  imageStyles: {
    tintColor: string;
  };
  backgroundStyle: {
    backgroundColor: string;
  };
  changeFilter: (id: number) => void;
  textStyles: {
    paddingLeft: number;
  };
  viewStyle: {
    height: number;
  };
  setShowListVisibility: () => void;
  showList: boolean;
}

const useDropDown = (
  list: {id: number; val: string}[],
  setSelectedItem: Dispatch<React.SetStateAction<number>>,
  isTrailer?: boolean,
): DropDownHookReturnType => {
  const [showList, setShowList] = useState<boolean>(false);
  const viewStyle = showList
    ? {height: verticalScale(30 * list.length)}
    : {height: verticalScale(30)};
  const backgroundStyle = isTrailer
    ? {backgroundColor: 'transparent'}
    : {backgroundColor: Colors.darkBlue};
  const textStyles = isTrailer
    ? {paddingLeft: horizontalScale(4)}
    : {paddingLeft: horizontalScale(6)};
  const imageStyles = isTrailer
    ? {tintColor: Colors.darkBlue}
    : {tintColor: Colors.lightGreen};

  const setShowListVisibility = (): void =>
    showList ? setShowList(false) : setShowList(true);

  const changeFilter = (id: number): void => {
    setShowList(false);
    setSelectedItem(id);
  };

  return {
    imageStyles,
    backgroundStyle,
    changeFilter,
    textStyles,
    viewStyle,
    setShowListVisibility,
    showList,
  };
};

export {useDropDown};
