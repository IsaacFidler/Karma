import React, {useState, useEffect} from 'react';
import {
  AsyncStorage, View, Text, StyleSheet, Button, TextInput, Image, TouchableOpacity, TextInputComponent,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import Buttons from '../components/Buttons';
import {urlUser} from '../components/utils'
import {AuthContext} from '../components/utils';

// just dummy sign in atm
export default SignIn = ({navigation}) => {
  const {control, handleSubmit, formState: {errors}} = useForm();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [allUsernames, setAllUsernames] = React.useState({});
  const [allPasswords, setAllPasswords] = React.useState({});
  const [correctDetails, setCorrectDetails] = React.useState(false);
  const {signIn} = React.useContext(AuthContext);

  //checking the user already exists.
  const onSubmit = () => {
    if (allUsernames.includes(username))
    {
      if (allPasswords.includes(password))
      {
        signIn({username, password});
      } else if (allPasswords.includes(password) == undefined)
      {
        setCorrectDetails(true);
      } else
      {
        setCorrectDetails(true);
      }
    } else
    {
      setCorrectDetails(true);
    }
  };

  const fetchUsers = async () => {
    try
    {
      const res = await axios.get(urlUser);
      const usernames = [];
      const passwords = [];

      const data = Object.values(res.data);
      for (const i of data)
      {
        usernames.push(i.username);
        passwords.push(i.password);
      }
      setAllUsernames(usernames);
      setAllPasswords(passwords);
      console.log(usernames);
      console.log(passwords);
    } catch (error)
    {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>

      <Image
        style={styles.topLogo}
        source={require('../assets/mainlogo.png')}
      />
      <View style={styles.textContainer}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcome}>Welcome Back!</Text>
          {
            correctDetails == false
              ? <Text style={styles.enterDetails}>Enter Details</Text>
              : <Text style={styles.wrongDetails}>Wrong Username/Password</Text>
          }
        </View>
        <View>
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
          <Buttons
            label="LOGIN"
            title="Sign in"
            onPress={onSubmit}
            style={styles.button}
          />

        </View>
        <View>
          <Button
            title="Create Account"
            onPress={() => {
              console.log('create account');
              navigation.navigate('CreateAccount');
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  textContainer: {
    borderRadius: 4,
    backgroundColor: '#ebebeb',
    height: 400,
    width: 350,
    top: 0,
    alignItems: 'center',
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
    backgroundColor: '#6354E4',
  },

  welcome: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 40
  },

  topLogo: {
    top: -50,
    height: 110,
    width: 300
  },

  enterDetails: {
    paddingBottom: 40,
  },

  wrongDetails: {
    color: '#ff4117',
    paddingBottom: 40,
    top: 10
  },
  wrongDetails: {
    color: '#ff4117',
    paddingBottom: 40,
    top: 10,
  },
  wrongDetails: {
    color: '#ff4117',
    paddingBottom: 40,
  },

  welcomeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  error: {textAlign: 'center', height: 17.5},
});