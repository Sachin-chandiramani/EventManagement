import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from './screens/Login';
import {Register} from './screens/Register';
import {EventsHome} from './screens/EventsHome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Profile} from './screens/Profile';
import {EventDetails} from './screens/EventDetails';
import {Screens} from './constants/screens';
import {useSelector} from 'react-redux';

const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const EventsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={Screens.EventsHome} component={EventsHome} />
      <Stack.Screen name={Screens.EventDetails} component={EventDetails} />
    </Stack.Navigator>
  );
};

function HomeTabs() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name={Screens.EventsStack}
        component={EventsStack}
        options={{
          headerShown: false,
        }}
      />
      <BottomTab.Screen name={Screens.Profile} component={Profile} />
    </BottomTab.Navigator>
  );
}

const ScreenNavigations = () => {
  const userToken = useSelector(state => state.auth.token);
  return (
    <Stack.Navigator
      initialRouteName={userToken ? Screens.HomeTabs : Screens.Login}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={Screens.Login} component={Login} />
      <Stack.Screen name={Screens.Register} component={Register} />
      <Stack.Screen name={Screens.HomeTabs} component={HomeTabs} />
    </Stack.Navigator>
  );
};

export default ScreenNavigations;
