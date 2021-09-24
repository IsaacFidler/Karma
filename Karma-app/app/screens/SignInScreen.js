import React from "react";
import {View, Text, StyleSheet, Button, TextInput} from "react-native";
import {useForm, Controller} from 'react-hook-form';

export default SignIn = ({navigation}) => {
  const {control, handleSubmit, formState: {errors}} = useForm();
  const onSubmit = data => console.log(data);

  return (
    <View>
      <View>
        <Controller
          control={control}
          name="email"
          render={({field: {onChange, value, onBlur}}) => (
            <TextInput
              style={styles.input}
              iconName="person"
              iconType="MaterialIcons"
              placeholder="EMAIL"
              value={value}
              onChangeText={value => onChange(value)}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({field: {onChange, value, onBlur}}) => (
            <TextInput
              style={styles.input}
              iconName="person"
              iconType="MaterialIcons"
              placeholder="PASSWORD"
              value={value}
              onChangeText={value => onChange(value)}
            />
          )}
        />
        <Button style={styles.button} title='LOGIN' onPress={() => {

          console.log('signin')
          navigation.push("HomeScreen")
        }
        } />

      </View>
      <View>
        <Button

          title="Create Account"
          onPress={() => {
            console.log('create account')
            navigation.push("CreateAccount")
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 300,
    paddingHorizontal: 5,
    backgroundColor: 'white',
    marginBottom: 5,

  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
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
  error: {textAlign: 'center', height: 17.5},
});