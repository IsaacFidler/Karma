import React from 'react'
import {Text, TouchableOpacity, StyleSheet} from 'react-native'

const FormButton = ({buttonTitle, ...rest}) => {
  return (
    <TouchableOpacity style={styles.buttonContainer}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>

    </TouchableOpacity>


  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    height: 150,
    backgroundColor: '#2e64e5',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'Lato-Regular',
  },
});

export default FormButton;
