import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen  from "./screens/SettingsScreen/SettingsScreen";
import ControlsScreen from './screens/ControlsScreen/ControlsScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen'
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      {/*<HomeStack.Screen name="Details" component={DetailsScreen} />*/}
    </HomeStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      {/*<SettingsStack.Screen name="Details" component={DetailsScreen} />*/}
    </SettingsStack.Navigator>
  );
}

const ControlsStack = createStackNavigator();
function ControlsStackScreen(){
  return(
    <ControlsStack.Navigator>
      <ControlsStack.Screen name="Controls" component={ControlsScreen}/>
    </ControlsStack.Navigator>
  )
}
export default function App() {
    return (
        <NavigationContainer style={{marginBottom:24}}>
            <Tab.Navigator >
                <Tab.Screen name="Home"
                    component={HomeStackScreen}/>
                <Tab.Screen name="Controls"
                    component={ControlsStackScreen}/>
                <Tab.Screen name="Settings"
                    component={SettingsStackScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    );}
