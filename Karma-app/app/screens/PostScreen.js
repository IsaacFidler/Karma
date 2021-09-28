import React, {useState, useEffect} from 'react';
import {
  View, Text, Button, CheckBox, StyleSheet, TextInput, ScrollView,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import ImagePicker from '../components/ImagePicker';
import {urlJobs} from '../components/utils'
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
const API_KEY = 'AIzaSyDwJRsrQCpB8YuYrwIW8pp4dP61P0JLpCk'
let loc = ''
const postScreen = (props) => {
  const [jobs, setJobs] = useState([]);
  const [user2, setUser2] = useState('');
  const [location, setLocation] = useState('');

  const fetchApi = async () => {
    try
    {
      const res = await axios.get(urlJobs);
      const ans = [];

      const data = Object.values(res.data);
      for (const i of data)
      {
        ans.push(i);
      }
      setJobs(ans);
    } catch (error)
    {
      console.log(error);
    }
  };

  // post new job to the database.
  function createJob (data, imgData, tagArray, user, locations) {
    // console.log(loc)
    async function createT (data1, imgData1, tagArray1, user1, location1) {
      try
      {
        console.log(location1)
        const filename = imgData1.split('/').pop();
        // Infer the type of the image
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : 'image';

        // Upload the image using the fetch and FormData APIs
        const formData = new FormData();

        // "productImage" is the name of the form field the server expects
        formData.append('productImage', {uri: imgData1, name: filename, type});
        formData.append('title', data1.title);
        formData.append('location', location1);
        formData.append('startDate', data1.startDate);
        formData.append('endDate', data1.endDate);
        formData.append('duration', data1.duration);
        formData.append('description', data1.description);
        formData.append('createdBy', user1);
        formData.append('tags', tagArray1.join());

        const response = await fetch(urlJobs, {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },

        });
        fetchApi();
        const data = await response.text();
        return data;
      } catch (error)
      {
        console.log(error);
      }
    }

    createT(data, imgData, tagArray, props.route.params.route.params, loc);
  }

  return (
    <View style={styles.container}>
      {/* image picker component for form to create new job listing */}
      <View style={styles.googleContainer}>
        <GooglePlacesAutocomplete

          placeholder='LOCATION'
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            setLocation(data.description)
            loc = data.description
            console.log(loc)

          }}
          query={{
            key: API_KEY,
            language: 'en',
          }}
          styles={{
            container: {flex: 0, position: 'absolute', width: '100%', zIndex: 1}
          }}
        />
      </View>
      <ImagePicker onSubmit={createJob} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ebebeb',
    top: 10,
  },
  googleContainer: {
    marginTop: 50,
    alignItems: 'center',
    borderWidth: 2,
    height: 200,
    marginBottom: -90,
    width: 328
  },
  search: {
    backgroundColor: '#000',
    position: 'absolute',
    width: '100%',
    padding: 200,

    // zIndex: 1,
    // width: '100%'
  }

});

export default postScreen;
