import {Dimensions, StyleSheet} from 'react-native';
import {
  Colors,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray,
  },
  backdropImageContainer: {
    width: Dimensions.get('window').width,
    height: verticalScale(211),
  },
  posterImageContainer: {
    zIndex: 1,
    position: 'absolute',
    width: horizontalScale(100),
    height: verticalScale(150),
    top: moderateScale(33),
    left: moderateScale(30),
    borderRadius: moderateScale(8),
    overflow: 'hidden',
  },
  backdropImage: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  linearGradientStyles: {
    position: 'absolute',
    width: horizontalScale(200),
    height: '100%',
    left: 0,
    zIndex: 1,
  },
  movieNameContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: verticalScale(20),
    paddingHorizontal: horizontalScale(20),
  },
  nameTextStyles: {
    color: Colors.white,
    fontSize: moderateScale(24),
    fontWeight: 'bold',
  },
  yearTextStyles: {
    color: Colors.transparentWhite,
    fontSize: moderateScale(24),
  },
  progressContainer: {
    borderWidth: moderateScale(1),
    borderColor: Colors.progressBackground,
    borderRadius: moderateScale(30),
    backgroundColor: Colors.progressBackground,
    marginRight: horizontalScale(10),
  },
  scoreStyles: {
    color: Colors.white,
    fontSize: moderateScale(20),
    fontWeight: 'bold',
  },
  imageStyles: {
    height: moderateScale(18),
    width: moderateScale(18),
    tintColor: Colors.white,
    marginRight: horizontalScale(10),
  },
  pipeSymbol: {
    color: Colors.transparentWhite,
    fontSize: moderateScale(40),
    fontWeight: '100',
    alignSelf: 'center',
    marginHorizontal: horizontalScale(30),
  },
  trailerTextStyles: {
    color: Colors.white,
    fontSize: moderateScale(20),
  },
  movieScoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: verticalScale(7),
    marginHorizontal: horizontalScale(20),
    alignItems: 'center',
  },
  movieReviewContainer: {
    justifyContent: 'space-between',
    marginVertical: verticalScale(12),
    paddingVertical: verticalScale(15),
    alignItems: 'center',
    backgroundColor: Colors.darkGray,
    borderWidth: moderateScale(1),
  },
  movieReviewStyles: {
    color: Colors.white,
    fontSize: moderateScale(18),
    fontWeight: '500',
  },
  overViewContainer: {
    marginHorizontal: horizontalScale(20),
    marginVertical: verticalScale(20),
  },
  overViewTextStyles: {
    marginTop: verticalScale(10),
    color: Colors.white,
    fontSize: moderateScale(16),
  },
  boldFontStyles: {
    marginTop: verticalScale(20),
    fontWeight: '900',
  },
  directorTextStyles: {
    marginTop: verticalScale(6),
    color: Colors.white,
    fontSize: moderateScale(16),
  },
  trailerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIndicatorStyles: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: Colors.darkGray,
  },
  loaderStyles: {
    position: 'absolute',
    top: '15%',
    left: '48%',
  },
});

export default styles;
