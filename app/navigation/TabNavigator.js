import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import Search from '../screens/Search';
import Notification from '../screens/latestPosts';
import Profile from '../screens/Login/Login';
import Icon from "react-native-vector-icons/Ionicons";
import AppNavigator from './AppNavigator';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen options={{tabBarIcon: ({ color, size}) => {
          return <AntDesign name="home" size={size} color={color} />
      }
      }} name='HomeScreen' component={AppNavigator} />
      <Tab.Screen options={{tabBarIcon: ({color, size}) => {
          return <AntDesign name="search1" size={size} color={color} />
      }
      }} name='Search' component={Search} />
      <Tab.Screen options={{tabBarIcon: ({color, size}) => {
          return <AntDesign name="notification" size={size} color={color} />
      }
      }} name='Notification' component={Notification} />
      <Tab.Screen options={{tabBarIcon: ({color, size}) => {
          return <Icon name="person" size={size} color={color} />
      }
      }} name='Profile' component={Profile} />

    </Tab.Navigator>
  );
};

export default TabNavigator;
