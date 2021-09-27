import React, {useState, useEffect} from 'react';
import {
  View, Text, StyleSheet, Button, TextInput, Image, TouchableOpacity,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import Buttons from '../components/Buttons';
import {AuthContext} from '../components/utils';
// const url = 'http://192.168.0.6:3005/jobs/users';
const url = 'http://10.10.22.243:3005/jobs/user';

export default CreateAccount = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [aboutMe, setAboutMe] = React.useState('');
  const {signIn} = React.useContext(AuthContext);
  const {control, handleSubmit, formState: {errors}} = useForm();

  function createUser (username, password, location, aboutMe, image) {
    async function createT (username1, password1, location1, aboutMe1, imgData1) {
      try
      {
        const filename = imgData1.split('/').pop();
        // Infer the type of the image
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : 'image';

        // Upload the image using the fetch and FormData APIs
        const formData = new FormData();
        // "productImage" is the name of the form field the server expects
        formData.append('userImage', {uri: imgData1, name: filename, type});
        formData.append('username', username1);
        formData.append('password', password1);
        formData.append('location', location1);
        formData.append('aboutMe', aboutMe1);
        formData.append('jobsApplied', '');
        formData.append('jobsSaved', '');

        const response = await fetch(url, {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },

        });
        const data = await response.text();
        return data;
      } catch (error)
      {
        console.log(error);
      }
    }

    createT(username, password, location, aboutMe, image);
  }

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
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled)
    {
      const localUri = result.uri;
      setImage(localUri);
    }
  };
  // const onPress = (navigation) => navigation.push("CreateAccount");
  // pick image button and form for new job listing
  return (
    <View style={styles.container}>

      <Button
        title="< Back"
        onPress={() => {
          console.log('create account');
          navigation.navigate('SignIn');
        }}
        style={styles.button}
      />

      <View style={styles.backButtonContainer} />
      <Text style={styles.welcome}>Welcome!</Text>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && <Image source={{uri: image}} style={{width: 200, height: 200}} />}
      </View>

      <Image
        style={styles.topLogo}
        source={require('../assets/banner.png')}
      />
      <View>
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

        <TextInput
          placeholder="LOCATION"
          value={location}
          onChangeText={setLocation}
          style={styles.input}
        />

        <TextInput
          placeholder="ABOUT ME"
          value={aboutMe}
          onChangeText={setAboutMe}
          style={styles.input}
        />

        <Buttons
          label="REGISTER"
          style={styles.button}
          title="Register"
          onPress={() => {
            createUser(username, password, location, aboutMe, image);
            console.log('New User Created 😱 😱 😱 😱');
            signIn({username, password});
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
    backgroundColor: '#ebebeb',
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
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    color: '#fff',
    backgroundColor: '#6354E4',
    left: -150,
    top: -50,
    padding: 10,
  },

  backButtonContainer: {
    width: 70,
    left: -150,
    top: -50,

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
    top: -50,
  },
  topLogo: {
    top: -200,
  },
  error: {textAlign: 'center', height: 17.5},
});
