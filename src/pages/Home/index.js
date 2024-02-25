import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Explore from '../Explore';
import MyCourses from '../MyCourses';
import Profile from '../Profile';
// import MatchingPage2 from '../MatchingPage2';
import Home from './Home';

const Tab = createMaterialBottomTabNavigator();

const TabNavigation = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      shifting={false}
      activeColor={colors.primary}
      barStyle={{ backgroundColor: colors.surface }}
    >
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={24}
            />
          ),
        }}
      />

      <Tab.Screen
        name="MyCoursesTab"
        component={MyCourses}
        options={{
          tabBarLabel: 'My Courses',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="book-outline"
              color={color}
              size={24}
            />
          ),
        }}
      />

{/* <Tab.Screen
        name="MatchingPage2"
        component={MatchingPage2}
        options={{
          tabBarLabel: 'Matchmaking',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="puzzle-outline"
              color={color}
              size={24}
            />
          ),
        }}
      /> */}

      <Tab.Screen
        name="ExploreTab"
        component={Explore}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="compass-outline"
              color={color}
              size={24}
            />
          ),
        }}
      />

      <Tab.Screen
        name="ProfileTab"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
