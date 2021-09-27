import React from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';
import {useState, useEffect} from 'react';
import axios from 'axios';
// const url = 'http://192.168.0.6:3005/';
// const url1 = 'http://192.168.0.6:3005/jobs';
const url = 'http://10.10.22.243:3005/';
const url1 = 'http://10.10.22.243:3005/jobs';
const urlUpdate = 'http://10.10.22.243:3005/jobs/user/';
const filePath = '../assets/stock.png'
import ApplyBanner from '../components/ApplyBanner';
import Buttons from '../components/Buttons';


let ans = [];

const JobDetail = (props) => {
  // console.log('this is job detail    ' + props)
  // console.log(currentUser)

  const route = props.route
  const currentUser = route.params.username.params.params
  const {id} = route.params;
  console.log('*****' + route.params)
  console.log(currentUser)
  const [job, setJob] = useState({})
  useEffect(() => {
    fetchJob()
    // updateUsersApplied()
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
    } catch (error)
    {
      console.log(error)
    }
  }
  const updateUser = async (currentUser, jobTitle) => {
    async function updateU (currentUser1, jobTitle1) {
      try
      {
        let thisUrl = urlUpdate + currentUser1
        console.log(jobTitle1)
        // Upload the image using the fetch and FormData APIs
        const response = await fetch(thisUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            job: jobTitle1,
          })
        });

        const data = await response.text();
      } catch (error)
      {
        console.log(error);
      }
    }
    updateU(currentUser, job.title);
  }

  return (
    <View style={styles.container}>
      <Image source={{uri: job.productImage}}
        style={styles.jobImage}
      />
      <Text>{url + job.productImage}</Text>
      <View style={styles.picture}>
        {
          job.productImage == undefined ?
            < Image
              style={styles.jobImage}
              source={require(filePath)}
            />
            :
            <Image source={{uri: url + job.productImage}}
              style={styles.jobImage}
            />
        }
      </View>
      <View style={styles.textContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {job.title}
          </Text>
        </View>
        <Text style={styles.text}>
          {job.location}
        </Text>
        <Text style={styles.text}>
          {job.createdBy}
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

      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text > {job.duration}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Buttons label="Apply" style={styles.button} title='Register' onPress={() => {
            updateUser(currentUser, job.title)
            console.log(job.title, currentUser)
          }
          } />
        </View>
      </View >
      {/* <ApplyBanner jobInfo={job} onSubmit={updateUser(currentUser)} /> */}
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
  },
  titleContainer: {
    borderWidth: 4,
    width: 350,
  },
  title: {
    fontSize: 25,
    marginBottom: 30,
    color: '#6354E4'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#6354E4',
  },

  buttonContainer: {
    width: 100
  },

  textContainer: {
    width: 200
  }
})

export default JobDetail;