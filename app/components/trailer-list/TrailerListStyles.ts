import {Dimensions, StyleSheet} from 'react-native';
import {
  Colors,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

const styles = StyleSheet.create({
  horizontalViewStyle: {
    position: 'absolute',
    top: moderateScale(20),
    left: moderateScale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerStyles: {
    color: Colors.white,
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: horizontalScale(15),
  },
  viewStyles: {
    width: Dimensions.get('window').width,
    height: verticalScale(390),
    zIndex: -1,
  },
  overlay: {
    backgroundColor: Colors.darkBlue,
    opacity: 0.6,
    width: '100%',
    height: verticalScale(390),
  },
  trailerImage: {
    height: '100%',
    width: '100%',
    zIndex: 1,
  },
  positionStyles: {
    position: 'absolute',
  },
  shimmerHeaderStyles: {
    fontSize: moderateScale(22),
    marginLeft: horizontalScale(20),
    marginBottom: verticalScale(10),
    marginRight: horizontalScale(20),
    height: verticalScale(20),
    width: horizontalScale(150),
  },
  shimmerViewStyles: {
    width: Dimensions.get('window').width,
    height: verticalScale(390),
    zIndex: -1,
    backgroundColor: Colors.gray,
  },
  shimmerPosterContainer: {
    position: 'absolute',
    top: verticalScale(80),
    left: horizontalScale(20),
    width: horizontalScale(314),
    height: verticalScale(170),
    zIndex: 1,
    borderRadius: moderateScale(6),
  },
  backgroundStyles: {
    backgroundColor: Colors.darkGray,
  },
});

export default styles;
