import React from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';
import {useState, useEffect} from 'react';
import axios from 'axios';
const url = 'http://192.168.0.6:3005/';
const url1 = 'http://192.168.0.6:3005/jobs';
const filePath = '../assets/stock.png'
let ans = [];

const JobDetail = ({route}) => {

  const {id} = route.params;
  const [job, setJob] = useState({})
  useEffect(() => {
    fetchJob()
  }, []);

  const fetchJob = async () => {
    try
    {
      let address = url1 + '/' + id
      const res = await axios.get(address)
      ans = []

      let data = Object.values(res.data)
      for (let i of data)
      {
        ans.push(i)
      }
      setJob(ans[0])
      console.log(job)
    } catch (error)
    {
      console.log(error)
    }

  }

  return (
    <View style={styles.container}>
      <Image source={{uri: job.productImage}}
        style={styles.jobImage}
      />
      <Text>{url + job.productImage}</Text>
      <Text> {job.title} </Text>
      <View style={styles.picture}>
        {
          job.productImage == undefined ?
            < Image
              style={styles.jobImage}
              source={require(filePath)}
            />
            :
            <Image source={{uri: job.productImage}}
              style={styles.jobImage}
            />
        }
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          {job.title}
        </Text>
        <Text style={styles.text}>
          {job.location}
        </Text>
        <Text style={styles.text}>
          {job.duration}
        </Text>
        <Text style={styles.text}>
          {job.dates}
        </Text>
        <Text style={styles.text}>
          {job.description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ebebeb'
  },
  jobImage: {
    borderWidth: 2,
    borderRadius: 2,
  }
})

export default JobDetail;