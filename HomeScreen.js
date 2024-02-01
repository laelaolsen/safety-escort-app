import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import React, { useState }  from 'react';
import renderIf from './renderIf'

const HomeScreen = ({ navigation }) => {
  const images = [
    { url: 'https://i.imgur.com/AVtkuWA.png' }, // Replace with the actual URL of your image
  ];

  const onPress = () =>  setButtonPressed(true);
  const cancelOnPress = () =>  setButtonPressed(false);
  const [buttonPressed, setButtonPressed] = useState(false);

  return (
    <View style={styles.container}>
   
      
      <Text style={styles.welcomeText}>Request a Safety Escort</Text>
      <Text style={styles.smallText}>An automated vehicle will be sent to your location.</Text>
      <TextInput
      style={styles.input}
      placeholder="Pickup location"
      />
      <TextInput
        style={styles.input}
        placeholder="Destination"
      />

      <ImageViewer
        style={{ width: 350, height: 200, paddingVertical:0 }}
        backgroundColor="#92b695"
        imageUrls={images}
        renderIndicator={() => null}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onPress}>
          <View style={[styles.button, {backgroundColor: buttonPressed ? '#707070' : '#496448' }]}>
            <Text style={styles.buttonText}>SUBMIT REQUEST</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={cancelOnPress}>
          <View style={[styles.cancelButton, {backgroundColor: buttonPressed ? '#ce6155' : '#707070' }]}>
            <Text style={styles.buttonText}>CANCEL</Text>
          </View>
        </TouchableOpacity>
        </View>
        {renderIf(buttonPressed)(
        <Text style={[styles.buttonText, {color:"black"}]}>Estimated time of arrival: {(new Date()).toLocaleTimeString()}</Text>
        )}
        {renderIf(!buttonPressed)(
        <Text style={[styles.buttonText, {color:"black"}]}></Text>
        )}
      <StatusBar style="auto" />
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
  welcomeText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 36,
    paddingVertical: 20,
  },
  smallText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 22,
    paddingVertical: 20,
  },
  input: {
    height: 40,
    width: 400,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 0,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
  button: {
    alignItems: 'center',    
    padding:10,
  },
  cancelButton: {
    alignItems: 'center',
    padding:10,
  },
  buttonText: {
    color:"white",
    fontSize:16
  },
});

export default HomeScreen;
