import React, {Component} from 'react';
import {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import axios from 'axios';
import Jobs from '../components/Jobs'
import {_View} from 'react-native';
// const url = 'http://localhost:3005/jobs';
// const url = 'http://10.10.22.67:3005/jobs';
const url = 'http://192.168.0.6:3005/jobs';

const homeScreen = ({navigation}) => {

  const [jobs, setJobs] = useState([])
  useEffect(() => {
    fetchApi()
  }, []);

  //pressHandler is called when an ad is clicked on to reveal the detailed page
  const pressHandler = (id) => {
    console.log(id)
    navigation.navigate('JobDetail', {id: id})
  }


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

  function createEvent (title, location, startDate, endDate, duration, description) {

    async function createT (title, location, startDate, endDate, duration, description) {
      try
      {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title,
            location,
            startDate,
            endDate,
            duration,
            description,

          })
        });

        fetchApi()
        const data = await response.json();
      } catch (error)
      {
        console.log(error)
      }
    }

    createT(title, location, startDate, endDate, duration, description);
  }

  useEffect(() => {

    fetchApi();
  }, []);

  //map through all job listing in database and show on homepage
  return (
    <ScrollView style={styles.page}>

      {
        jobs.length < 1 ? <Text> no events </Text> :
          jobs.map(item => {
            return <TouchableOpacity style={styles.checkboxContainer} key={item._id} style={styles.container} onPress={() => pressHandler(item._id)}>
              < Jobs
                myState={item}
                key={item._id}
              />
            </TouchableOpacity>
          })
      }
      <View style={styles.gap} />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gap: {
    height: 400,
    backgroundColor: '#0000',
  },
  checkboxContainer: {
    width: 200,
    flexDirection: "row",
    marginBottom: 20,
    flexWrap: 'wrap'
  },
  page: {


  }
})

export default homeScreen;
