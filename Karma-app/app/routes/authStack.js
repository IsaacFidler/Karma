import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AsyncStorage} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import SignIn from '../screens/SignInScreen';
import CreateAccount from '../screens/CreateAccountScreen';
import JobDetail from '../screens/JobDetail';
import Tabs from './tabs';
import {AuthContext} from '../components/utils';
import Loading from '../screens/LoadingScreen';

const AuthStack = createStackNavigator();
const StackAuth = createStackNavigator();
let uss = ''
function StackAuth2 () {
  return (
    <StackAuth.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
      }}
    >
      <StackAuth.Screen name="SignIn" component={SignIn} />
      <StackAuth.Screen name="CreateAccount" component={CreateAccount} />
    </StackAuth.Navigator>
  );
}

export default function AuthStackScreen ({navigation}) {

  const [theUsername, setTheUsername] = React.useState('');
  const [thePassword, setThePassword] = React.useState('');
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type)
      {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          if (action.token)
          {
            AsyncStorage.setItem('userToken', action.token);
          }
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          AsyncStorage.removeItem('userToken');
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,

    },
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try
      {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e)
      {

      }
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        setTheUsername(data.username)
        setThePassword(data.password)
        uss = data.username
        console.log(uss)
        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: async (data) => {
        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),
    [],
  );
  // //stack for login / create account pages.
  // const AuthStackScreen = ({navigation}) => (
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer screenoptions={{headerShown: false}}>
        <AuthStack.Navigator>
          {state.isLoading ? (
            // we havent finished checking for the token yet
            <AuthStack.Screen name="Loading" component={Loading} />
          ) : state.userToken == null ? (
            <AuthStack.Screen
              name="Auth"
              component={StackAuth2}
              options={{
                title: 'Sign In',
                headerShown: false,
                // when logging out, a pop animation feels intuituve
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
            />

          ) : (
            // user is signed final screen is the homepage with bottom tab navigation
            <AuthStack.Screen
              name="HomeScreen"
              component={Tabs}
              // initialParams={username}
              initialParams={uss}
              options={{
                title: 'Home Screen',
                headerShown: false,
              }}
            />
          )}

          <AuthStack.Screen
            initialParams={'hello'}
            name="JobDetail"
            component={JobDetail}
            options={{title: 'Job Detail'}}
          />
        </AuthStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

// export default AuthStackScreen
