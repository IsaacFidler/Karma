import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import Header from '../components/Header'
import Header2 from '../components/Header2'
const chatScreen = () => {
  return (
    <View style={styles.container}>
      <Header2 st></Header2>
      <Header></Header>
      <View style={styles.textContainer}>

        <Text style={styles.title}> Inbox </Text>
        <View style={styles.headers}>
          <Text style={styles.head} > Messages </Text>
          <Text style={styles.head2}> Notifications </Text>
        </View>
        <View
          style={{
            borderBottomColor: '#dbdbdb',
            borderBottomWidth: 3,
            marginBottom: 30
          }}
        />
        <Text> You have no unread messages </Text>
        <Text style={{
          marginTop: 30,
          color: '#828282'
        }}> When you contact a charity or apply for a position, you'll see your messages here </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    top: 16,
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: 700
  },
  textContainer: {
    top: 0,
    borderTopWidth: 3,
    borderColor: '#e6e6e6',
    width: '100%',
    padding: 30,
    height: 700,
    backgroundColor: '#fff',
  },
  title: {

    fontSize: 30,
    width: 375,
    marginBottom: 30
  },
  headers: {

    flexDirection: 'row'
  },
  head: {
    marginRight: 10,
    marginBottom: 10,
    fontSize: 15,
    fontWeight: "bold"
  },
  head2: {
    marginRight: 10,
    marginBottom: 10,
    fontSize: 15
  }

})

export default chatScreen;
