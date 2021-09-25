import React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './app/routes/tabs'
// import PostScreen from './app/routes/postStack'
import AuthStackScreen from './app/routes/authStack'
import Loading from './app/screens/LoadingScreen'


function App () {
  console.log('❤️  🏄‍♂️ ❤️  🏄‍♂️ ❤️  🏄‍♂️ ❤️  🏄‍♂️ app running ❤️  🏄‍♂️ ❤️  🏄‍♂️ ❤️  🏄‍♂️ ❤️  🏄‍♂️')
  const [isLoading, setIsLoading] = React.useState(true)
  const [user, setUser] = React.useState(null)


  //simulate load time.

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(!isLoading);
    }, 800)
  }, [])

  //if its loading show the load page.

  return (
    < NavigationContainer >
      {isLoading ? (
        <Loading />
      ) : user ? (
        <Tabs />
      ) : (
        <AuthStackScreen />
      )}
    </NavigationContainer >
  );
}

export default App;