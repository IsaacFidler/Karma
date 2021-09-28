import React, {Component} from 'react';
import {
  View, Text, ScrollView, FlatList, StyleSheet, Image, TouchableOpacity,
} from 'react-native';
import {url} from './utils'
const filePath = '../assets/stock.png';
import {useState, useEffect} from 'react';


const Jobs = (props, {navigation}) => {
  const tags = [];
  const pressHandler = (id) => {
    navigation.push('JobDetail');
  };
  useEffect(() => {
    console.log(console.log(url + props.myState.productImage))
  }, []);
  // console.log(url + props.myState.productImage)
  return (
    <View style={styles.container} onPress={() => pressHandler(props.myState._id)}>

      {/* if no image is provided then use the stock image */}
      <View style={styles.picture}>
        {
          props.myState.productImage == undefined

            ? (
              <Image
                style={styles.jobImageSmall}
                source={require(filePath)}
              />
            )
            : (
              <Image
                source={{uri: url + props.myState.productImage}}
                style={styles.jobImageSmall}
              />
            )
        }
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>
          {props.myState.title}
        </Text>
        <Text style={styles.text}>
          {props.myState.createdBy}
        </Text>
        <Text style={styles.text}>
          {props.myState.tags}
        </Text>
        <Text style={styles.text}>
          {props.myState.location}
        </Text>
        <Text style={styles.text}>
          {props.myState.duration}
        </Text>
        <Text style={styles.text}>
          {props.myState.dates}
        </Text>
        <Text style={styles.text}>
          {props.myState.description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderColor: '#dedede',
    borderWidth: 2,
    borderRadius: 2,
    margin: 15,
    marginLeft: 10,
    marginRight: 10,
    height: 200,
    width: 375,
    backgroundColor: '#ebebeb'
  },

  picture: {
    width: 150,
    height: 150,
    marginLeft: 100,
  },

  textContainer: {

    borderColor: '#20232a',
    borderRadius: 4,
    color: '#20232a',
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 'bold',
    width: 390,
    height: 150,
    paddingLeft: 110,
    paddingRight: 90,
    flexDirection: 'row',
    marginBottom: 20,
    flexWrap: 'wrap',
  },

  jobImageSmall: {
    borderRadius: 4,
    width: 150,
    height: 150,
  },

  text: {

  },

  title: {
    fontSize: 20,
    marginBottom: 10
  },
});

export default Jobs;