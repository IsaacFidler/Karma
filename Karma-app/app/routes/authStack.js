import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';

import SignIn from '../screens/SignInScreen'
import CreateAccount from '../screens/CreateAccounScreen'
import Tabs from './tabs'
import PostScreen from '../screens/PostScreen'
const AuthStack = createStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="SignIn"
      component={SignIn}
      options={{title: "Sign In"}}
    />
    <AuthStack.Screen
      name="CreateAccount"
      component={CreateAccount}
      options={{title: "Create Account"}}
    />
    <AuthStack.Screen
      name="HomeScreen"
      component={Tabs}
      options={{title: "Home Screen"}}
    />

  </AuthStack.Navigator>
);

export default AuthStackScreen