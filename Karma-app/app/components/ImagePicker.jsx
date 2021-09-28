import React, {useState, useEffect} from 'react';
import {
  Button, Image, View, Platform, StyleSheet, ScrollView, TextInput, Text,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {useForm, Controller} from 'react-hook-form';
import {CheckBox} from 'react-native-elements';
import Buttons from './Buttons';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
const API_KEY = 'AIzaSyDwJRsrQCpB8YuYrwIW8pp4dP61P0JLpCk'
const tagArray = [];

// expo image picker
export default function ImagePickerExample (props) {
  const [image, setImage] = useState(null);
  const [animalTag, setAnimalTag] = useState(false);
  const [childrenTag, setChildrenTag] = useState(false);
  const [educationTag, setEducationTag] = useState(false);
  const [homelessTag, setHomelessTag] = useState(false);
  const [socialTag, setSocialTag] = useState(false);
  const [tags, setTags] = useState([]);
  const {control, handleSubmit, formState: {errors}} = useForm();

  const onSubmit = (data) => {
    setTags(tagArray);
    props.onSubmit(data, image, tagArray);
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

  // pick image button and form for new job listing
  return (

    <View style={styles.container}>

      <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
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
                placeholder="TITLE"
              />
            )}
            name="title"
            defaultValue=""
          />
          {errors.title && <Text>This is required.</Text>}

          {/* LOCATION */}



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
                placeholder="START DATE"
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
                placeholder="END DATE"
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
                placeholder="DURATION"
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
                placeholder="DESCRIPTION"
              />
            )}
            name="description"
            defaultValue=""
          />
          {errors.title && <Text>This is required.</Text>}
          <View style={styles.checkboxContainer}>
            <CheckBox
              title="Animals"
              checked={animalTag}
              onPress={() => {
                if (animalTag === false)
                {
                  tagArray.push('Animals');
                  console.log(tagArray);
                } else if (animalTag === true)
                {
                  tagArray.splice(tagArray.indexOf('Animals', 1));
                  console.log(tagArray);
                }
                setAnimalTag(!animalTag);
              }}
            />
            <CheckBox
              title="Children & Family services"
              checked={childrenTag}
              onPress={() => {
                if (childrenTag === false)
                {
                  tagArray.push('Children Services');
                  console.log(tagArray);
                } else if (childrenTag === true)
                {
                  tagArray.splice(tagArray.indexOf('Children Services', 1));
                  console.log(tagArray);
                }
                setChildrenTag(!childrenTag);
              }}
            />
            <CheckBox
              title="Education"
              checked={educationTag}
              onPress={() => {
                if (educationTag === false)
                {
                  tagArray.push('Education');
                  console.log(tagArray);
                } else if (educationTag === true)
                {
                  tagArray.splice(tagArray.indexOf('Education', 1));
                  console.log(tagArray);
                }
                setEducationTag(!educationTag);
              }}
            />

            <CheckBox
              title="Homeless services"
              checked={homelessTag}
              onPress={() => {
                if (homelessTag === false)
                {
                  tagArray.push('Homeless Services');
                  console.log(tagArray);
                } else if (homelessTag === true)
                {
                  tagArray.splice(tagArray.indexOf('Homeless Services', 1));
                  console.log(tagArray);
                }
                setHomelessTag(!homelessTag);
              }}
            />
            <CheckBox
              title="Social services"
              checked={socialTag}
              onPress={() => {
                if (socialTag === false)
                {
                  tagArray.push('Social Services');
                  console.log(tagArray);
                } else if (socialTag === true)
                {
                  tagArray.splice(tagArray.indexOf('Social Services', 1));
                  console.log(tagArray);
                }
                setSocialTag(!socialTag);
              }}
            />
          </View>

          <Buttons style={styles.button} label="SUBMIT" title="Submit" onPress={handleSubmit(onSubmit)} />
          <View style={styles.gap} />
        </View>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ebebeb',
    top: 100,
    width: '100%',
  },
  googleContainer: {
    marginTop: 50,
    flex: 1, alignItems: 'center',
  },
  search: {
    flex: 0,
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    width: '100%'
  },
  gap: {
    height: 400,
    backgroundColor: '#0000',
  },
  input: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 328,
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
    width: 100,
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

  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  checkbox: {
    alignSelf: 'center',
    width: 20,
    height: 20,
  },
  label: {
    margin: 8,
  },

});