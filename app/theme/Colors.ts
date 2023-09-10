type ColorsValue =
  | 'darkBlue'
  | 'white'
  | 'gray'
  | 'green'
  | 'lightGreen'
  | 'black'
  | 'inActiveIndicatorGreen'
  | 'activeIndicatorGreen'
  | 'activeIndicatorYellow'
  | 'inActiveIndicatorYellow'
  | 'progressBackground'
  | 'transparentWhite'
  | 'transparentBlack'
  | 'lightBlue'
  | 'darkGray'
  | 'lightBackground';

const Colors: Record<ColorsValue, string> = {
  darkBlue: '#00284B',
  white: '#FFFFFF',
  gray: '#1A1A19',
  darkGray: '#161615',
  green: '#0EDBB0',
  lightGreen: '#BFFDD1',
  activeIndicatorGreen: '#2ecc71',
  black: '#000000',
  inActiveIndicatorGreen: '#1F4A2B',
  activeIndicatorYellow: '#B8C017',
  inActiveIndicatorYellow: '#454405',
  progressBackground: '#031E26',
  transparentWhite: '#ffffff80',
  transparentBlack: '#00000080',
  lightBlue: '#00BAE9',
  lightBackground: '#EEEEF5',
};

export {Colors};
