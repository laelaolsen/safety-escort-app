import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';
import React, { useState }  from 'react';

const PrivacyScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
   
    <Text style={styles.titleText}>Privacy policy coming soon!</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#92b695',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  titleText: {
    color: 'black',
    fontSize: 18,
    paddingVertical: 20,
  },
  
});

export default PrivacyScreen;
