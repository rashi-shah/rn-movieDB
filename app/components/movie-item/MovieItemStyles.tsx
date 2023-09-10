import {StyleSheet} from 'react-native';
import {
  Colors,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

const styles = StyleSheet.create({
  movieCardStyles: {
    flex: 1,
    marginLeft: horizontalScale(16),
  },
  moviePosterStyle: {
    height: moderateScale(280),
    width: moderateScale(160),
    borderRadius: moderateScale(8),
  },
  infoIconContainer: {
    position: 'absolute',
    backgroundColor: Colors.transparentWhite,
    top: '3%',
    right: '6%',
    height: moderateScale(22),
    width: moderateScale(22),
    borderRadius: moderateScale(11),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  infoIconStyles: {
    height: moderateScale(18),
    width: moderateScale(18),
    tintColor: Colors.transparentBlack,
  },
  movieInfoContainer: {
    marginVertical: verticalScale(25),
    marginLeft: horizontalScale(22),
  },
  movieTitleStyles: {
    width: horizontalScale(130),
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: Colors.black,
  },
  movieReleaseDate: {
    marginTop: verticalScale(7),
    color: Colors.gray,
    fontSize: moderateScale(16),
  },
  progressContainer: {
    position: 'absolute',
    zIndex: 1,
    top: moderateScale(259),
    left: moderateScale(20),
    borderWidth: moderateScale(1),
    borderColor: Colors.progressBackground,
    borderRadius: moderateScale(30),
    backgroundColor: Colors.progressBackground,
  },
  imageStyles: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(8),
  },
  shimmerStyles: {
    height: moderateScale(280),
    width: moderateScale(160),
    borderRadius: moderateScale(8),
  },
  shimmerViewStyles: {
    position: 'absolute',
    zIndex: 1,
  },
});

export default styles;
