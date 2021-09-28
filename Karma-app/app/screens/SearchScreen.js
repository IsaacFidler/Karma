import React from 'react';
import Header from '../components/Header'
import {useState, useEffect} from 'react';
import axios from 'axios';
import {urlJobs} from '../components/utils';
import Jobs from '../components/Jobs'
import {SearchBar} from 'react-native-elements';
import Header2 from '../components/Header2'
import {
  View, Text, Image, StyleSheet, FlatList, ScrollView, TouchableOpacity
} from 'react-native';


const searchScreen = (props) => {
  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [search, setSearch] = useState('')

  const navigation = props.navigation

  const pressHandler = (id) => {
    navigation.navigate('JobDetail', {
      id: id,
      username: props.route
    })
  }
  const searchFilter = (text) => {
    if (text)
    {
      const newData = jobs.filter((item) => {
        const itemData = item.title ?
          item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;

      });
      setFilteredJobs(newData)
      setSearch(text)
    } else
    {
      setFilteredJobs(jobs)
      setSearch(text)
    }
  }

  const fetchApi = async () => {

    try
    {
      const res = await axios.get(urlJobs)
      let data = Object.values(res.data)
      setJobs(data)
      setFilteredJobs(data)
    } catch (error)
    {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchApi();
  }, [jobs]);
  return (
    <View>
      <Header2 />
      <SearchBar
        round
        searchIcon={{size: 24}}
        onChangeText={(text) => searchFilter(text)}
        // onClear={text => this.SearchFilterFunction('')}
        placeholder="Type Here..."
        value={search}
      />
      <FlatList
        data={jobs}
        renderItem={({item}) => (
          < Jobs
            myState={item}
            key={item._id}
          />
        )}
      />

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


export default searchScreen;
