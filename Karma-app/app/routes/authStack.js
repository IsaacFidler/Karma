import React from "react";
import {createStackNavigator} from '@react-navigation/stack';

import SignIn from '../screens/SignInScreen'
import CreateAccount from '../screens/CreateAccountScreen'
import JobDetail from '../screens/JobDetail'
import Tabs from './tabs'
const AuthStack = createStackNavigator();

//stack for login / create account pages.
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

    {/* final screen is the homepage with bottom tab navigation */}
    <AuthStack.Screen
      name="HomeScreen"
      component={Tabs}
      options={{title: "Home Screen"}}
    />

    <AuthStack.Screen
      name="JobDetail"
      component={JobDetail}
      options={{title: "Job Detail"}}
    />
  </AuthStack.Navigator>
);

export default AuthStackScreen