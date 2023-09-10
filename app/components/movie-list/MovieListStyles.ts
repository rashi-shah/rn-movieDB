import {StyleSheet} from 'react-native';
import {horizontalScale, moderateScale, verticalScale} from '../../theme';

const styles = StyleSheet.create({
  viewStyles: {
    zIndex: -1,
    flexDirection: 'row',
  },
  container: {
    zIndex: 1,
  },
  moviePosterStyle: {
    height: moderateScale(280),
    width: moderateScale(160),
    borderRadius: moderateScale(8),
  },
  row: {
    flexDirection: 'row',
  },
  movieCardStyles: {
    marginLeft: horizontalScale(24),
  },
  movieInfoContainer: {
    marginVertical: verticalScale(25),
    marginLeft: horizontalScale(22),
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
  listEmptyStyles: {
    marginLeft: horizontalScale(14),
  },
});

export default styles;
