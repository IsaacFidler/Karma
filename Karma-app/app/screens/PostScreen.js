import React, {useState} from 'react';
import {
  View, Text, Button, CheckBox, StyleSheet, TextInput, ScrollView,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import ImagePicker from '../components/ImagePicker';

const url = 'http://10.10.22.243:3005/jobs';
// const url = 'http://192.168.0.6:3005/jobs';

const postScreen = (navigation, props) => {
  const [jobs, setJobs] = useState([]);

  const fetchApi = async () => {
    try
    {
      const res = await axios.get(url);
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
  function createJob (data, imgData, tagArray) {
    async function createT (data1, imgData1, tagArray1) {
      try
      {
        const filename = imgData1.split('/').pop();
        // Infer the type of the image
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : 'image';

        // Upload the image using the fetch and FormData APIs
        const formData = new FormData();

        // "productImage" is the name of the form field the server expects
        formData.append('productImage', {uri: imgData1, name: filename, type});
        formData.append('title', data1.title);
        formData.append('location', data1.location);
        formData.append('startDate', data1.startDate);
        formData.append('endDate', data1.endDate);
        formData.append('duration', data1.duration);
        formData.append('description', data1.description);
        formData.append('tags', tagArray1.join());

        // console.log('asdf   ' + Object.keys(formData))
        const response = await fetch(url, {
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

    createT(data, imgData, tagArray);
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* image picker component for form to create new job listing */}
        <ImagePicker onSubmit={createJob} />
      </ScrollView>
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
});

export default postScreen;
