import {ParamListBase, useNavigation} from '@react-navigation/native';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import React, {FC} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Images} from '../../assets';
import {NavigationRoutes} from '../../constants';
import {DetailsScreen, HomeScreen, SearchScreen} from '../../modules';
import styles from './StackNavigationStyles';

const headerImage = (): React.JSX.Element => {
  return (
    <Image
      style={styles.headerImageStyle}
      source={Images.appLogo}
      resizeMode="stretch"
    />
  );
};

const headerBackImage = (): React.JSX.Element => {
  return <Image style={styles.headerBackImage} source={Images.backIcon} />;
};

const HeaderRightComponent: FC = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const navigateToSearchScreen = (): void => {
    navigation.navigate(NavigationRoutes.SearchScreen);
  };

  return (
    <TouchableOpacity
      style={styles.headerRightContainer}
      onPress={navigateToSearchScreen}>
      <Image style={styles.headerRightImage} source={Images.searchIcon} />
    </TouchableOpacity>
  );
};

const HeaderLeftComponent: FC = () => {
  return (
    <View style={styles.headerLeftContainer}>
      <Image style={styles.headerLeftImage} source={Images.menuIcon} />
    </View>
  );
};

const Stack = createStackNavigator();

const StackNavigation: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.headerStyle,
        headerTitle: headerImage,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        options={{
          headerRight: () => <HeaderRightComponent />,
          headerLeft: () => <HeaderLeftComponent />,
        }}
        name={NavigationRoutes.HomeScreen}
        component={HomeScreen}
      />
      <Stack.Screen
        options={{
          headerBackImage: headerBackImage,
          headerBackTitleVisible: false,
        }}
        name={NavigationRoutes.DetailsScreen}
        component={DetailsScreen}
      />
      <Stack.Screen
        options={{
          headerBackImage: headerBackImage,
          headerBackTitleVisible: false,
        }}
        name={NavigationRoutes.SearchScreen}
        component={SearchScreen}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
