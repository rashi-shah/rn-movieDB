import React, {FC} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import {CircularProgressProps} from 'react-native-circular-progress-indicator/lib/typescript/types';
import {Colors, moderateScale} from '../../theme';

interface ProgressPropType extends CircularProgressProps {
  value: number;
  fontSize: number;
  style: StyleProp<ViewStyle>;
}

const Progress: FC<ProgressPropType> = ({value, fontSize, style, ...props}) => {
  return (
    <View style={style}>
      <CircularProgress
        value={value}
        radius={moderateScale(20)}
        progressValueColor={Colors.white}
        progressValueFontSize={moderateScale(14)}
        activeStrokeWidth={moderateScale(3)}
        activeStrokeColor={
          value < 70
            ? Colors.activeIndicatorYellow
            : Colors.activeIndicatorGreen
        }
        inActiveStrokeColor={
          value < 70
            ? Colors.inActiveIndicatorYellow
            : Colors.inActiveIndicatorGreen
        }
        inActiveStrokeWidth={moderateScale(3)}
        maxValue={100}
        circleBackgroundColor={Colors.progressBackground}
        valueSuffix={'%'}
        valueSuffixStyle={{
          fontSize: fontSize,
        }}
        {...props}
      />
    </View>
  );
};

export default Progress;
