import React from 'react';
// const headerPic = '/assets/Group.png'

import {Image, StyleSheet, View} from 'react-native';

const Header = () => {
  return (
    <View style={styles.headerStyle} />
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    width: '100%',
    height: 30,
    backgroundColor: '#6354E4'
  }
})

export default Header;