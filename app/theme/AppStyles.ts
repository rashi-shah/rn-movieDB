import {StyleSheet} from 'react-native';
import {Colors} from './Colors';
import {horizontalScale, moderateScale, verticalScale} from './Metrics';

const appStyles = StyleSheet.create({
  screenStyles: {
    flex: 1,
  },
  horizontalViewStyle: {
    flexDirection: 'row',
  },
  headerStyles: {
    color: Colors.black,
    fontSize: moderateScale(22),
    marginLeft: horizontalScale(16),
    marginBottom: verticalScale(10),
    marginRight: horizontalScale(20),
  },
  shimmerHeaderStyles: {
    fontSize: moderateScale(22),
    marginLeft: horizontalScale(25),
    marginBottom: verticalScale(10),
    marginRight: horizontalScale(20),
    height: verticalScale(20),
    width: horizontalScale(150),
  },
  suggestionHeaderStyles: {
    color: Colors.black,
    fontSize: moderateScale(20),
    alignSelf: 'center',
    marginVertical: verticalScale(7),
    fontWeight: 'bold',
  },
  bottomMarginStyles: {
    marginBottom: verticalScale(30),
  },
});
export default appStyles;
