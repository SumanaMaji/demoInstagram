import * as React from 'react';
import {Image,StyleSheet,View,Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DashboardScreen from '../src/screens/DashboardScreen';
import { COLORS } from '../src/constant/Colors';
import { FONTS } from '../src/constant/Font';
const Stack = createStackNavigator();
//const Drawer = createDrawerNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DashboardScreen" >
            <Stack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{
          title: 'Dashboard', 
          headerBackTitleVisible:false,
        }}
      />
      </Stack.Navigator>   
    </NavigationContainer>
  );
};

export default Routes;
