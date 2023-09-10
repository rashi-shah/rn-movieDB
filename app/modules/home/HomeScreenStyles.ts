import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../theme';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(40),
    width: '100%',
  },
  linearGradientStyles: {
    position: 'absolute',
    width: horizontalScale(30),
    height: '100%',
    right: 0,
    zIndex: 1,
  },
  imageBackgroundStyles: {
    height: verticalScale(430),
    width: '100%',
  },
  contentContainerStyle: {
    backgroundColor: Colors.white,
  },
});

export default styles;
