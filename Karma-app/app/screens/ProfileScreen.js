import React from 'react';
import {
  View, Text, Image, StyleSheet, ScrollView, TouchableOpacity
} from 'react-native';
import Buttons from '../components/Buttons';
import {AuthContext} from '../components/utils';
import findUser from '../helpers/getSpecificUser';
import {useState, useEffect} from 'react';
import {url, urlJobs, urlUser} from '../components/utils'
import axios from 'axios';
const filePath = '../assets/stock.png';
import Jobs from '../components/Jobs';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
const profileScreen = (props) => {
  const [user1, setUser1] = useState({})
  const [myJobs, setMyJobs] = useState({})
  const [myJobNames, setMyJobNames] = useState({})
  const navigation = props.navigation
  const {signOut} = React.useContext(AuthContext);
  const user = props.route.params.params
  console.log('&&&&&&&&&&&')
  // console.log(props.route.params.params)
  console.log('&&&&&&&&&&&')
  const pressHandler = (id) => {
    navigation.navigate('JobDetail', {
      id: id,
      username: props.route.params.params
    })

  }




  const findUser = async (username) => {
    try
    {
      const res = await axios.get(urlUser + '/' + username)
      let ans = res.data
      setUser1(ans[0])
      setMyJobNames(ans[0].jobsApplied.split(', '))

    } catch (error)
    {
      console.log(error)
    }
  }


  const fetchJobs = async () => {
    try
    {
      const res = await axios.get(urlJobs)
      let ans = []
      let data = res.data

      for (let i of data)
      {
        if (myJobNames.includes(i.title))
        {
          ans.push(i)
        }
      }
      setMyJobs(ans)

    } catch (error)
    {
      console.log(error)
    }
  }

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Screen is focused');
      findUser(user)
      fetchJobs()
      // The screen is focused
      // Call any action
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

  useEffect(() => {
    findUser(user)
    fetchJobs();
    console.log(url + user1.userImage)
  }, []);
  // useEffect(() => {
  //   findUser(user)
  // }, [myJobs]);

  useEffect(() => {
    fetchJobs();
  }, [myJobNames]);

  // useEffect(() => {
  //   fetchJobs();
  // }, [myJobs]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.titleContainer}>
          <View style={styles.picture}>
            {
              user1.userImage == undefined ? (
                <Image
                  style={styles.jobImageSmall}
                  source={require(filePath)}
                />
              )
                : (
                  <Image
                    source={{uri: url + user1.userImage}}
                    style={styles.jobImageSmall}
                  />
                )
            }
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.title}> {user1.username} </Text>
            <Text style={styles.text}> {user1.location} </Text>
            <Text style={styles.text}> {user1.aboutMe} </Text>
          </View>
          <View style={styles.button}>
            <Buttons label="LOGOUT" title="Sign out" onPress={signOut} style={styles.button} />
          </View>
          <ScrollView style={styles.jobsContainer}>
            <View style={styles.jobs}>
              {
                myJobs.length === undefined ? <Text> no events </Text> :
                  myJobs.length < 1 ? <Text> no events </Text> :
                    myJobs.map(item => {
                      return <TouchableOpacity style={styles.checkboxContainer} key={item._id} style={styles.container} onPress={() => pressHandler(item._id)}>
                        < Jobs
                          myState={item}
                          key={item._id}
                        />
                      </TouchableOpacity>
                    })
              }
              <View style={styles.gap} />
            </View>
          </ScrollView>
        </View>
        <View style={styles.gap} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6354E4',
    width: '100%',
    height: '100%'
  },
  titleContainer: {
    top: 25,
    backgroundColor: '#ebebeb',
    width: 410,
    borderRadius: 4,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },


  title: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    paddingBottom: 20
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20
  },
  gap: {
    height: 100,
    backgroundColor: '#6354E4',
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    elevation: 3,
    padding: 10,
    width: 200
  },
  jobImageSmall: {
    borderRadius: 4,
    width: 150,
    height: 150,
  },

  picture: {
    width: 150,
    height: 150,
    marginLeft: 100,
  },

  jobsContainer: {
    flexDirection: 'column',
    width: 410,
    backgroundColor: '#ebebeb'
  },

  jobs: {
    flexDirection: 'column',
    width: 410,
    backgroundColor: '#ebebeb',
    borderRadius: 4
  },
});

export default profileScreen;