import React from 'react';
// const headerPic = '/assets/Group.png'
const filePath = '../assets/Group.png';

import {Image, StyleSheet, View} from 'react-native';

const Header = () => {
  return (
    <Image
      style={styles.topLogo}
      source={require('../assets/banner.png')}
    />
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    top: 200,
    height: 100
  },
  headerStyle: {
    backgroundColor: '#000'
  }
})

export default Header;