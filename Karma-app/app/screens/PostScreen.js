import React, {useState} from 'react';
import {View, Text, Button, CheckBox, StyleSheet, TextInput, ScrollView} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import ImagePicker from '../components/ImagePicker'
const url = 'http://10.10.22.67:3005/jobs';

const postScreen = (navigation, props) => {


  //post new job to the database.
  function createJob (data, imgData) {
    async function createT (data1, imgData1) {
      try
      {
        let filename = imgData1.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        // Upload the image using the fetch and FormData APIs
        let formData = new FormData();
        //"productImage" is the name of the form field the server expects
        formData.append('productImage', {uri: imgData1, name: filename, type});
        console.log(formData)
        const response = await fetch(url, {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },

          //({
          // title: data1.title,
          // location: data1.location,
          // startDate: data1.startDate,
          // endDate: data1.endDate,
          // duration: data1.duration,
          // description: data1.description,
          // formData
          //})
        });
        console.log('asdf')
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
        {/* image picker component for form to create new job listing */}
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
})

export default postScreen;
