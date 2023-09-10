import {StyleSheet} from 'react-native';
import {
  Colors,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

const styles = StyleSheet.create({
  dropDownViewStyles: {
    height: verticalScale(30),
    width: horizontalScale(139),
    backgroundColor: Colors.darkBlue,
    borderRadius: moderateScale(15),
    borderColor: Colors.darkBlue,
  },
  linearGradientViewStyles: {
    position: 'absolute',
    height: verticalScale(30),
    width: horizontalScale(140),
    borderRadius: moderateScale(15),
    borderColor: Colors.darkBlue,
    borderWidth: moderateScale(1),
  },
  imageStyles: {
    height: verticalScale(18),
    width: horizontalScale(18),
    tintColor: Colors.lightGreen,
  },
  textStyles: {
    textAlign: 'left',
    fontWeight: 'bold',
    paddingLeft: horizontalScale(16),
    color: Colors.darkBlue,
    fontSize: moderateScale(15),
  },
  selectedTextStyles: {
    textAlign: 'left',
    fontWeight: 'bold',
    paddingLeft: horizontalScale(6),
    color: Colors.darkBlue,
    fontSize: moderateScale(15),
  },
  dropDownListContainerStyles: {
    height: verticalScale(30),
    width: horizontalScale(140),
  },
  listViewStyles: {
    height: verticalScale(60),
  },
  listItemStyles: {
    paddingTop: verticalScale(6),
  },
  buttonStyle: {
    justifyContent: 'space-around',
    paddingVertical: verticalScale(5),
    backgroundColor: Colors.darkBlue,
    height: verticalScale(27),
    width: horizontalScale(139),
    borderRadius: moderateScale(15),
    borderColor: Colors.darkBlue,
  },
  dropDownShimmerStyles: {
    position: 'absolute',
    height: verticalScale(25),
    width: horizontalScale(140),
    borderRadius: moderateScale(15),
    marginBottom: verticalScale(10),
  },
});

export default styles;
