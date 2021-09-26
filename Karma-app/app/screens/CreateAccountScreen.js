import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, TextInput, Image, TouchableOpacity} from "react-native";
import {useForm, Controller} from 'react-hook-form';
import Buttons from '../components/Buttons';
import {AuthContext} from '../components/utils'
import * as ImagePicker from 'expo-image-picker';


export default CreateAccount = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const {signUp} = React.useContext(AuthContext);
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
      <Text style={styles.welcome}>Welcome!</Text>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && <Image source={{uri: image}} style={{width: 200, height: 200}} />}
      </View>

      <Image
        style={styles.topLogo}
        source={require('../assets/banner.png')}
      />
      <View >
        <TextInput
          style={styles.input}
          placeholder="USERNAME"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          placeholder="PASSWORD"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <Buttons label="REGISTER" style={styles.button} title='Register' onPress={() => {

          console.log('signin')
          // navigation.push("HomeScreen")
          signUp({username, password})
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
