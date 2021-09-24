import React, {useState} from 'react';
import {View, Text, Button, CheckBox, StyleSheet, TextInput, ScrollView} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import Input from '../components/Input';
import Buttons from '../components/Buttons';
import ImagePicker from '../components/ImagePicker'
const url = 'http://10.10.22.67:3005/jobs';
const axios = require('axios');

const postScreen = (navigation, props) => {

  const [jobs, setJobs] = useState([])
  const {control, handleSubmit, formState: {errors}} = useForm();

  const onSubmit = data => {
    // setJob(data)
    createJob(data)
    console.log(data.title)
  };
  const fetchApi = async () => {

    try
    {
      const res = await axios.get(url)
      let ans = []

      let data = Object.values(res.data)
      for (let i of data)
      {
        ans.push(i)
      }
      setJobs(ans)

    } catch (error)
    {
      console.log(error)
    }
  }

  //post new event to the database.
  function createJob (data, imgData) {
    console.log(data)
    async function createT (data1, imgData1) {
      try
      {
        console.log('imgadfg' + typeof imgData1)
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
          },
          body: JSON.stringify({
            title: data1.title,
            location: data1.location,
            startDate: data1.startDate,
            endDate: data1.endDate,
            duration: data1.duration,
            description: data1.description,
            productImage: imgData1

          })
        });
        console.log('sent')
        fetchApi()
        const data = await response.text();
      } catch (error)
      {
        console.log(error)
      }
    }
    createT(data, imgData);
  }

  return (
    <View style={styles.container}>
      <ScrollView >
        <ImagePicker onSubmit={createJob} />

      </ScrollView>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ebebeb',
    top: 10
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

export default postScreen;
