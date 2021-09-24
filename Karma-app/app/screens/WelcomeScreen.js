import React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View, Image} from 'react-native';

function WelcomeScreen (props) {
  return (
    <View style={styles.container}>
      <View style={[styles.cover_group, styles.cover_group_layout]}>
        <TouchableWithoutFeedback onPress={() => console.log('tapped image')} >
          {/* <Image
            style={[styles.img, styles.img_layout]}
            source={require('/Users/isaacfidler/Codeworks Main/senior-projects/Karma/Karma-app/app/assets/logo2.png')}
          /> */}
        </TouchableWithoutFeedback>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6354E4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  group_layout: {
    marginTop: 0,
    marginBottom: 0,
    minHeight: 1000,
    marginLeft: 0,
    flexGrow: 1,
    marginRight: 0
  },
  img_layout: {
    marginTop: -200,
    height: 200,
    width: 380,
    borderRadius: 5

  }
});


export default WelcomeScreen;