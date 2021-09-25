import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, TextInput, Image, TouchableOpacity} from "react-native";
import {useForm, Controller} from 'react-hook-form';
import Buttons from '../components/Buttons';
import * as ImagePicker from 'expo-image-picker';


export default CreateAccount = ({navigation}) => {
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
      let localUri = result.uri;
      setImage(localUri);
    }
  };

  // pick image button and form for new job listing
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && <Image source={{uri: image}} style={{width: 200, height: 200}} />}
      </View>

      <Image
        style={styles.topLogo}
        source={require('../assets/banner.png')}
      />
      <Text style={styles.welcome}>Welcome Back!</Text>
      <View >
        <Controller
          control={control}
          name="name"
          render={({field: {onChange, value, onBlur}}) => (
            <TextInput
              style={styles.input}
              placeholder="NAME / CHARITY NAME"
              value={value}
              onChangeText={value => onChange(value)}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({field: {onChange, value, onBlur}}) => (
            <TextInput
              style={styles.input}
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
        <Controller
          control={control}
          name="description"
          render={({field: {onChange, value, onBlur}}) => (
            <TextInput
              style={styles.input}
              iconName="person"
              iconType="MaterialIcons"
              placeholder="DESCRIPTION"
              value={value}
              onChangeText={value => onChange(value)}
            />
          )}
        />
        <Buttons label="LOGIN" style={styles.button} title='LOGIN' onPress={() => {

          console.log('signin')
          navigation.push("HomeScreen")
        }
        } />
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
    backgroundColor: '#6354E4',
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
