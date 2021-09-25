import React, {Component} from 'react';
import {View, Text, ScrollView, FlatList, StyleSheet, Image} from 'react-native';
const filePath = '../assets/stock.png'
// const url = 'http://10.10.22.67:3005/';
const url = 'http://192.168.0.6:3005/';

const Jobs = (props) => {
  return (
    <View style={styles.container}>
      {console.log(props.url)}

      <View style={styles.picture}>
        {console.log(url + props.myState.productImage)}
        {
          props.myState.productImage == undefined ?

            <Image
              style={styles.tinyLogo}
              source={require(filePath)}
            />
            :
            <Image source={{uri: url + props.myState.productImage}}
              style={{width: 200, height: 200}}
            />
        }
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>
          {props.myState.title}
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
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderColor: "#dedede",
    borderWidth: 2,
    borderRadius: 2,
    margin: 15,
    marginLeft: 10,
    marginRight: 10,
    height: 300,
  },

  picture: {
    top: -15,
    width: 380,
    height: 150,
    borderWidth: 2,
    borderColor: "#20232a",
    borderRadius: 4,
  },

  textContainer: {
    top: -20,
    borderColor: "#20232a",
    borderRadius: 4,
    color: "#20232a",
    textAlign: "center",
    fontSize: 10,
    fontWeight: "bold",
    width: 390,
    height: 100,
    paddingLeft: 5

  },

  text: {


  },
  title: {
    fontSize: 20
  }



})

export default Jobs;
