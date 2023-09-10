import {ParamListBase} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Months, NavigationRoutes, strings} from '../constants';

/**
 * This function converts the date format from YYYY-MM-DD to Mon DD, YYYY format
 * @param {string} val
 * @returns {string}
 */
const convertDate = (val: string): string => {
  if (val) {
    const date: Date = new Date(val);
    const monthValue: number = date.getMonth();
    return `${Months[monthValue]} ${date.getDate()}, ${date.getFullYear()}`;
  }
  return strings.notAvailable;
};

/**
 * This function navigates to Details Screen and send the id of the movie in params of the route
 * @param {StackNavigationProp<ParamListBase>} navigation
 * @param {number} id
 * @param {boolean} isTv
 * @returns {void}
 */
const navigateToDetailsScreen = (
  navigation: StackNavigationProp<ParamListBase>,
  id: number,
  isTv?: boolean,
): void => {
  navigation.navigate(NavigationRoutes.DetailsScreen, {
    id: id,
    isTv: isTv ?? false,
  });
};

/**
 * This function converts minutes into hour, minute format
 * @param {number} totalMinutes
 * @returns {string}
 */
const convertToHoursAndMinutes = (totalMinutes: number): string => {
  const hours: number = Math.floor(totalMinutes / 60);
  const minutes: number = totalMinutes % 60;
  return `${hours}${strings.hour} ${minutes}${strings.minute}`;
};

export {convertDate, navigateToDetailsScreen, convertToHoursAndMinutes};
