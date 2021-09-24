import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const profileScreen = () => {
  return (
    <View style={styles.container}>
      <Text> profileScreen</Text>
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

export default profileScreen;
