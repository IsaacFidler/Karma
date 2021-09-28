import React from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';
import Buttons from './Buttons';

const ApplyBanner = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text > {props.jobInfo.duration}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Buttons label="Apply" style={styles.button} title='Register' onPress={() => {
          console.log(props.jobInfo)
        }
        } />
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderColor: "#dedede",
    borderWidth: 2,
    borderRadius: 2,
    margin: 15,
    marginLeft: 10,
    marginRight: 10,
    height: 100,
    top: 200,
    width: '100%'
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

export default ApplyBanner;