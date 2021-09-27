import React from 'react';
import {
  View, Text, Button, StyleSheet,
} from 'react-native';
import Buttons from '../components/Buttons';
import { AuthContext } from '../components/utils';

const profileScreen = (props) => {
  const { signOut } = React.useContext(AuthContext);
  const user = props.route.params.params
  return (
    <View style={styles.container}>
      {console.log(user)}
      {/* {console.log(this.props)} */}
      <Text> {user} </Text>
      <Buttons label="LOGOUT" title="Sign out" onPress={signOut} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ebebeb',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#fc2803',
  },
});

export default profileScreen;
