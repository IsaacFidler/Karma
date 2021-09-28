import * as React from 'react';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {useState, useEffect} from 'react';

const Map = (props) => {
  console.log(props)
  return (
    < View style={styles.container} >
      <View style={styles.page}>

        {
          props.job.lat ? <Text> no events </Text> :
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: props.job.latitude,
                longitude: props.job.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{latitude: props.job.latitude, longitude: props.job.longitude}}
              />

            </MapView>
        }
        <View style={styles.gap} />

      </View>


    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300
  },
  map: {
    width: 300,
    height: 300,
  },
});

export default Map
