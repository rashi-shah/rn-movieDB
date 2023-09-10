import {StyleSheet} from 'react-native';
import {
  Colors,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBackground,
  },
  searchInputStyles: {
    color: Colors.darkBlue,
    fontSize: moderateScale(24),
    borderColor: Colors.lightBlue,
    borderWidth: moderateScale(1),
    marginHorizontal: horizontalScale(10),
    marginVertical: verticalScale(10),
    paddingVertical: verticalScale(6),
    paddingHorizontal: horizontalScale(10),
  },
  imageStyles: {
    width: horizontalScale(340),
    height: verticalScale(500),
    alignSelf: 'center',
  },
  moviePosterStyle: {
    height: moderateScale(280),
    width: moderateScale(160),
    borderRadius: moderateScale(8),
  },
  movieCardStyles: {
    marginLeft: horizontalScale(24),
  },
  movieTitleStyles: {
    marginVertical: verticalScale(12),
    width: moderateScale(155),
    height: verticalScale(20),
  },
  movieReleaseDate: {
    width: moderateScale(155),
    height: verticalScale(20),
  },
  shimmerStyles: {
    position: 'absolute',
    bottom: verticalScale(30),
    right: horizontalScale(20),
  },
});

export default styles;
