import React from 'react';
import { StyleSheet, View, Platform, Text } from 'react-native';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Profile from './Components/Profile';
import challengePage from './Components/challengePage';
import Redeem from './Components/Redeem'
import reportProgress from './Components/reportProgress';
import TransitionScreen from './Components/TransitionScreen';
import Leaderboard from './Components/Leaderboard';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavBar from './Components/NavBar';


const Stack = createNativeStackNavigator();
const config = {
  screens: {
    Home: 'home',
    Profile: 'profile',
    challengePage: 'challengePage',
    reportProgress: 'reportProgress',
    Leaderboard: 'Leaderboard'
  },
};

const linking = {
  config,
};

export default function App() {

  return (
        <NavigationContainer linking={linking}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen name="TransitionScreen" component={TransitionScreen} />
            <Stack.Screen name="Navbar" component={NavBar} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="challengePage" component={challengePage} />
            <Stack.Screen name="reportProgress" component={reportProgress} />
            <Stack.Screen name="Leaderboard" component={Leaderboard} />
            <Stack.Screen name="Redeem" component={Redeem} />
          </Stack.Navigator>
        </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
