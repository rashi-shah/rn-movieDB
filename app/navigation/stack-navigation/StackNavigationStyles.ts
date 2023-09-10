import {StyleSheet} from 'react-native';
import {Colors, horizontalScale, moderateScale} from '../../theme';

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: Colors.darkBlue,
    maxHeight: moderateScale(90),
  },
  headerRightContainer: {
    marginRight: horizontalScale(10),
    width: moderateScale(32),
    height: moderateScale(35),
  },
  headerLeftContainer: {
    marginLeft: horizontalScale(10),
    width: moderateScale(25),
    height: moderateScale(35),
  },
  headerImageStyle: {
    maxHeight: moderateScale(38),
    width: moderateScale(60),
  },
  headerRightImage: {
    width: '100%',
    height: '100%',
    tintColor: Colors.lightBlue,
  },
  headerLeftImage: {
    width: '100%',
    height: '100%',
    tintColor: Colors.white,
  },
  headerBackImage: {
    width: moderateScale(40),
    height: moderateScale(35),
    tintColor: Colors.white,
  },
});

export default styles;
