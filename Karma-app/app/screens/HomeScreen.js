import React, {Component} from 'react';
import {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import axios from 'axios';
import Jobs from '../components/Jobs'
import {_View} from 'react-native';
import {urlJobs} from '../components/utils';
import Header from '../components/Header'


//for image retireval the jobs part is not required

const homeScreen = (props) => {
  const [jobs, setJobs] = useState([])
  const navigation = props.navigation
  //pressHandler is called when an ad is clicked on to reveal the detailed page

  const pressHandler = (id) => {
    navigation.navigate('JobDetail', {
      id: id,
      username: props.route
    })
  }

  const fetchApi = async () => {

    try
    {
      const res = await axios.get(urlJobs)
      let data = Object.values(res.data)
      setJobs(data)
    } catch (error)
    {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchApi();
  }, [jobs]);

  //map through all job listing in database and show on homepage
  return (
    <View>
      <Header></Header>
      <View>
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
      </View>
    </View>
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