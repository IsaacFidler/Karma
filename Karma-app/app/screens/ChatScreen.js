import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const chatScreen = () => {
  return (
    <View style={styles.container}>
      <Text> chatScreen</Text>
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

export default chatScreen;
