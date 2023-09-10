import MaskedView from '@react-native-masked-view/masked-view';
import React, {FC} from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './CustomGradientTextStyles';

interface GradientTextProps extends TextProps {
  colors: string[];
}

const GradientText: FC<GradientTextProps> = ({colors, ...props}) => {
  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient colors={colors} start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
        <Text
          {...props}
          style={StyleSheet.flatten([styles.gradientTextStyles, props.style])}
        />
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;
