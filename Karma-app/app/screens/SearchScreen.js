import React from 'react';
import Header from '../components/Header'
import {View, Text, Button, StyleSheet} from 'react-native';
const searchScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Text> searchScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ebebeb'
  }
})

export default searchScreen;
