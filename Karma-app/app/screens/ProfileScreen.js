import React from 'react';
import {
  View, Text, Image, StyleSheet, ScrollView
} from 'react-native';
import Buttons from '../components/Buttons';
import {AuthContext} from '../components/utils';
import findUser from '../helpers/getSpecificUser';
import {useState, useEffect} from 'react';
const url = 'http://10.10.22.243:3005/jobs/user/';
const url2 = 'http://10.10.22.243:3005/';
import axios from 'axios';
const filePath = '../assets/stock.png';

const profileScreen = (props) => {
  const [user1, setUser1] = useState({})
  const {signOut} = React.useContext(AuthContext);
  const user = props.route.params.params
  console.log(user)

  const findUser = async (username) => {

    try
    {
      const res = await axios.get(url + username)
      let ans = []

      let data = Object.values(res.data)
      for (let i of data)
      {
        ans.push(i)
      }
      setUser1(ans[0])
    } catch (error)
    {
      console.log(error)
    }
  }
  useEffect(() => {
    findUser(user)
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.picture}>
        {
          user1.userImage == undefined ? (
            <Image
              style={styles.jobImageSmall}
              source={require(filePath)}
            />
          )
            : (
              <Image
                source={{uri: url2 + user1.userImage}}
              // style={styles.jobImageSmall}
              />
            )
        }
      </View>
      <ScrollView style={styles.textContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}> {user1.username} </Text>
          <Text style={styles.text}> {user1.location} </Text>
          <Text style={styles.text}> {user1.aboutMe} </Text>
        </View>
        <View style={styles.button}>
          <Buttons label="LOGOUT" title="Sign out" onPress={signOut} style={styles.button} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6354E4',
  },
  textContainer: {
    top: 100,
    backgroundColor: '#ebebeb',
    width: 350,
    borderRadius: 4,
    height: 400
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    paddingBottom: 20
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',

    paddingBottom: 20
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    elevation: 3,
    padding: 10
  },
});

export default profileScreen;
