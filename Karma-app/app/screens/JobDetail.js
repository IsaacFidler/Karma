import React from 'react';
import {View, Text, Button, StyleSheet, Image, ScrollView} from 'react-native';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {url, urlJobs, urlUser} from '../components/utils'
const filePath = '../assets/stock.png'
import ApplyBanner from '../components/ApplyBanner';
import Buttons from '../components/Buttons';
import Map from '../components/Map'
import Header from '../components/Header'

let ans = [];

const JobDetail = (props) => {
  // console.log('this is job detail    ' + props)
  // console.log(currentUser)

  const route = props.route
  const currentUser = route.params.username.params.params
  const {id} = route.params;
  const [job, setJob] = useState({})
  useEffect(() => {
    fetchJob()
    // updateUsersApplied()
  }, []);

  const fetchJob = async () => {
    try
    {
      let address = urlJobs + '/' + id
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
        let thisUrl = urlUser + '/' + currentUser1
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


  console.log(url + job.productImage)
  return (
    <View>
      <Header />
      <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.container}>
          <View style={styles.picture}>
            {
              job.productImage == undefined ?
                < Image
                  style={styles.jobImageSmall}
                  source={require(filePath)}
                />
                :
                <Image source={{uri: url + job.productImage}}
                  style={styles.jobImageSmall}
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
            <Text style={styles.user}>
              {job.createdBy}
            </Text>

            <Text style={styles.text}>
              {job.dates}
            </Text>
            <Text style={styles.text}>
              {job.description}
            </Text>
            <Text>{typeof job.longitude}</Text>
          </View>

          {/* <View style={styles.gap} /> */}
        </View>
        <Map job={job} />
      </ScrollView>


      <View style={styles.footerContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.duration} > {job.duration}</Text>
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
    backgroundColor: '#ebebeb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  duration: {
    fontSize: 30
  },
  picture: {
    height: 150,
    width: 150,
    borderWidth: 3
  },
  gap: {
    height: 400,
    backgroundColor: '#0000',
  },
  jobImage: {
    borderWidth: 2,
    borderRadius: 2,
  },
  titleContainer: {
    borderWidth: 4,
    width: '100%',
  },
  title: {
    fontSize: 25,
    marginBottom: 30,
    color: '#6354E4'
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#6354E4',
    right: 100
  },

  buttonContainer: {
    width: 100
  },

  footerContainer: {
    top: -70,
    width: '100%',
    flexDirection: 'row',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 30,
    paddingTop: 10,
    backgroundColor: '#fff'
  },

  jobImageSmall: {
    borderRadius: 4,
    width: 150,
    height: 150,
  },

  textContainer: {
    width: 200
  },
  user: {
    textDecorationLine: 'underline',
  }
})

export default JobDetail;