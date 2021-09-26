import React from "react";
import {AsyncStorage, View, Text, StyleSheet, Button, TextInput, Image, TouchableOpacity, TextInputComponent} from "react-native";
import {useForm, Controller} from 'react-hook-form';
import Buttons from '../components/Buttons';


import {AuthContext} from '../components/utils'
//just dummy sign in atm
export default SignIn = ({navigation}) => {
  const {control, handleSubmit, formState: {errors}} = useForm();
  const onSubmit = data => console.log(data);

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const {signIn} = React.useContext(AuthContext);

  return (
    <View style={styles.container}>

      <Image
        style={styles.topLogo}
        source={require('../assets/banner.png')}
      />
      <Text style={styles.welcome}>Welcome Back!</Text>
      <View >
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        {/* <Buttons label="LOGIN" style={styles.button} title='LOGIN' onPress={} /> */}
        <Buttons label="LOGIN" title='Sign in' onPress={() => signIn({username, password})} style={styles.button} />


      </View>
      <View>
        <Button
          title="Create Account"
          onPress={() => {
            console.log('create account')
            navigation.navigate("CreateAccount")

          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ebebeb'
  },
  input: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 300,
    paddingHorizontal: 5,
    backgroundColor: 'white',
    marginBottom: 30,

  },

  inputContainer: {
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#6354E4'
  },
  inputContainer: {
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  welcome: {
    top: -50
  },
  topLogo: {
    top: -200
  },
  error: {textAlign: 'center', height: 17.5},
});

