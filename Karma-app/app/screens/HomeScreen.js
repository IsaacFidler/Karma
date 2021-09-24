import React, {Component} from 'react';
import {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import axios from 'axios';
import Jobs from '../components/Jobs'
import {_View} from 'react-native';
const x = 'this is my const'
// const url = 'http://localhost:3005/jobs';
const url = 'http://10.10.22.67:3005/jobs';
// const url = 'http://192.168.0.6:3005/jobs';

const homeScreen = () => {

  const [jobs, setJobs] = useState([])
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

  useEffect(() => {

    fetchApi();
  }, []);

  return (

    <ScrollView style={styles.page}>
      {
        jobs.length < 1 ? <Text> no events </Text> :
          jobs.map(item => {
            return < Jobs
              myState={item}
              key={item._id}
            />
          })
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  page: {


  }
})

export default homeScreen;
