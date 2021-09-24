import React, {useState, useEffect} from 'react';
import {Button, Image, View, Platform, StyleSheet, TextInput} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {useForm, Controller} from 'react-hook-form';
import Buttons from '../components/Buttons';



export default function ImagePickerExample (props) {
  const [image, setImage] = useState(null);
  const {control, handleSubmit, formState: {errors}} = useForm();
  const onSubmit = data => {

    props.onSubmit(data, image)
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web')
      {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted')
        {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled)
    {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && <Image source={{uri: image}} style={{width: 200, height: 200}} />}
      </View>
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
            placeholder='LOCATION'
          />
        )}
        name="location"
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
            placeholder='START DATE'
          />
        )}
        name="startDate"
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
            placeholder='END DATE'
          />
        )}
        name="endDate"
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
            placeholder='DURATION'
          />
        )}
        name="duration"
        defaultValue=""
      />
      {errors.title && <Text>This is required.</Text>}
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
            placeholder='DESCRIPTION'
          />
        )}
        name="description"
        defaultValue=""
      />
      {errors.title && <Text>This is required.</Text>}

      <Buttons style={styles.button} label="SUBMIT" title="Submit" onPress={handleSubmit(onSubmit)} />
      <View style={styles.gap} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ebebeb',
    top: 100
  },
  gap: {
    height: 400,
    backgroundColor: '#0000',
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
    width: 200,
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

})