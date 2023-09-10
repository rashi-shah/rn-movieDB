import {StyleSheet} from 'react-native';
import {
  Colors,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

const styles = StyleSheet.create({
  container: {
    width: horizontalScale(330),
    height: verticalScale(390),
    zIndex: -1,
  },
  overlay: {
    backgroundColor: Colors.darkBlue,
    opacity: 0.6,
    width: '100%',
    height: verticalScale(400),
  },
  trailerImage: {
    height: '100%',
    width: '100%',
  },
  posterContainer: {
    position: 'absolute',
    top: '20%',
    left: '5%',
    height: '45%',
    width: '95%',
  },
  posterImage: {
    height: '100%',
    width: '100%',
    borderRadius: moderateScale(5),
  },
  nameTextStyle: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: moderateScale(20),
  },
  dateTextStyle: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: moderateScale(15),
  },
  infoIconContainer: {
    position: 'absolute',
    backgroundColor: Colors.transparentWhite,
    top: '6%',
    right: '6%',
    height: moderateScale(20),
    width: moderateScale(20),
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  infoIconStyles: {
    height: moderateScale(16),
    width: moderateScale(16),
    tintColor: Colors.transparentBlack,
  },
  playIconContainer: {
    position: 'absolute',
    top: '40%',
    right: '43%',
    height: moderateScale(20),
    width: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  playIconStyles: {
    height: moderateScale(50),
    width: moderateScale(50),
    tintColor: Colors.white,
  },
  loaderStyles: {
    position: 'absolute',
    top: '40%',
    left: '45%',
  },
  loaderContainerStyles: {
    position: 'absolute',
    width: horizontalScale(312),
    height: verticalScale(173),
    backgroundColor: Colors.black,
  },
  closeIconStyles: {
    height: moderateScale(28),
    width: moderateScale(28),
    tintColor: Colors.black,
  },
});

export default styles;
