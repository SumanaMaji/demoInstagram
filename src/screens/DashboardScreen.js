
import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import GlobalStyles from '../../assets/css/styles';
import {COLORS} from '../../src/constant/Colors';
import {FONTS} from '../../src/constant/Font';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardContentScreen from '../screens/DashboardContentScreen';
// import Profile from '../Screen/Profile/MyTickets';
import Videos from '../screens/Reels/Video';
import MyAccount from '../screens/Profile/MyAccount';
import Post from '../screens/Post/PostUpload';
import Icon from 'react-native-vector-icons/FontAwesome5';
const Tab = createBottomTabNavigator();


const DashboardScreen = () => {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: COLORS.blue,
          tabBarInactiveTintColor: COLORS.textInputBorder,
          tabBarLabelStyle: {
            fontSize:14,
            fontFamily: FONTS.SemiBold,
          }
        })}
    >
        <Tab.Screen 
              name="Home" 
              component={DashboardContentScreen} 
              options={{headerShown: false, tabBarIcon: (tabInfo) => {
                return (
                  <Icon
                    name="home"
                    size={20}
                    color={tabInfo.focused ? COLORS.blue : COLORS.textInputBorder}
                  />
                );
              }
              }}
         />
           <Tab.Screen 
              name="Posts" 
              component={Post} 
              options={{headerShown: false, tabBarIcon: (tabInfo) => {
                return (
                  <Icon
                    name="plus-circle"
                    size={21}
                    color={tabInfo.focused ? COLORS.blue : COLORS.textInputBorder}
                  />
                );
              }}}
        />
        <Tab.Screen 
              name="Reels" 
              component={Videos} 
              options={{headerShown: false, tabBarIcon: (tabInfo) => {
                return (
                  <Icon
                    name="video"
                    size={21}
                    color={tabInfo.focused ? COLORS.blue : COLORS.textInputBorder}
                  />
                );
              }}}
        />     
        {/* <Tab.Screen 
              name="Payment" 
              component={DashboardContentScreen} 
              options={{headerShown: false, tabBarIcon: (tabInfo) => {
                return (
                  <Icon
                    name="credit-card"
                    size={21}
                    color={tabInfo.focused ? COLORS.blue : COLORS.textInputBorder}
                  />
                );
              }}}
        /> */}
        <Tab.Screen 
              name="You" 
              component={MyAccount} 
              options={{headerShown: false, tabBarIcon: (tabInfo) => {
                return (
                  <Icon
                    name="user-circle"
                    size={21}
                    color={tabInfo.focused ? COLORS.blue : COLORS.textInputBorder}
                  />
                );
              }}}
        />
      </Tab.Navigator>
  );
};

export default DashboardScreen;