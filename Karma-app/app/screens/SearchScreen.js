import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
const searchScreen = () => {
  return (
    <View style={styles.container}>
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
