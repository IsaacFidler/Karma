import React, {useState} from 'react';
import {View, Text, Button, CheckBox, StyleSheet, TextInput} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import Input from '../components/Input';
import Buttons from '../components/Buttons';


const postScreen = (navigation) => {
  const {control, handleSubmit, formState: {errors}} = useForm();
  const onSubmit = data => console.log(data);

  return (
    <View style={styles.container}>

      {/* TITLE */}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, value}}) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
            placeholder='TITLE'
          />
        )}
        name="title"
        defaultValue=""
      />
      {errors.title && <Text>This is required.</Text>}

      {/* LOCATION */}
      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({field: {onChange, value}}) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="lastName"
        defaultValue=""
      />

      {/* dates */}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, value}}) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
            placeholder='TITLE'
          />
        )}
        name="title"
        defaultValue=""
      />
      {errors.title && <Text>This is required.</Text>}

      {/* duration */}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, value}}) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
            placeholder='TITLE'
          />
        )}
        name="title"
        defaultValue=""
      />
      {errors.title && <Text>This is required.</Text>}

      {/* description */}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, value}}) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
            placeholder='TITLE'
          />
        )}
        name="title"
        defaultValue=""
      />
      {errors.title && <Text>This is required.</Text>}

      <Buttons label="SUBMIT" title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ebebeb',
    top: -100
  },
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
    // shadowRadius: 2.62,
    elevation: 4,
  },
})

export default postScreen;
