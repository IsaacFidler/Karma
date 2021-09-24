import React, {useState} from 'react';
import {View, Text, Button, CheckBox, StyleSheet, TextInput} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import Input from '../components/Input';
import Buttons from '../components/Buttons';
const url = 'http://10.10.22.67:3005/jobs';


const postScreen = (navigation, props) => {
  const [job, setJob] = useState({})

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

  function createJob (data) {
    console.log(data)
    async function createT (data1) {
      try
      {
        console.log(data1)
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: data1.title,
            location: data1.location,
            startDate: data1.startDate,
            endDate: data1.endDate,
            duration: data1.duration,
            description: data1.description
          })
        });

        fetchApi()
        const data = await response.json();
      } catch (error)
      {
        console.log(error)
      }
    }
    createT(data);
  }






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
    elevation: 4,
  },
})

export default postScreen;
