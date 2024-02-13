import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import React, { useState }  from 'react';
import renderIf from './renderIf'
import MapView, { Marker } from 'react-native-maps';

const HomeScreen = ({ navigation }) => {
  const images = [
    { url: 'https://i.imgur.com/AVtkuWA.png' }, // Replace with the actual URL of your image
  ];

  const onPress = () =>  submitPressed();
  const cancelOnPress = () =>  cancelPressed();
  const [buttonPressed, setButtonPressed] = useState(false);
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');

  function submitPressed()
  {
    if(pickup ? destination: null)
    {
      setButtonPressed(true);
      setEditablePickup(false);
      setEditableDestination(false);
      alert("A safety escort vehicle is on its way.")
      //TODO: Send pickup and destination to back-end
    }
  }

  function cancelPressed()
  {
    setButtonPressed(false);
    setEditablePickup(true);
    setEditableDestination(true);
  }

  const [editablePickup, setEditablePickup] = useState(true);
  const [editableDestination, setEditableDestination] = useState(true);

  const center = {
    lat: 33.418667,
    lng: 111.932861,
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.welcomeText}>Request a Safety Escort</Text>
      <Text style={styles.smallText}>An automated vehicle will be sent to your location.</Text>
      <TextInput
      style={styles.input}
      placeholder="Pickup location"
      value={pickup}
      onChangeText={(text) => setPickup(text)}
      editable={editablePickup}
      />
      <TextInput
        style={styles.input}
        placeholder="Destination"
        value={destination}
        onChangeText={(text) => setDestination(text)}
        editable={editableDestination}
      />
      
      <MapView
        style={styles.map}
        initialRegion={{
          // Coordinates of ASU
          latitude: 33.418667,
          longitude: -111.932861,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00421,
        }}
        
      >
        <Marker
          coordinate={{
            latitude: 33.418667,
            longitude: -111.935861,
          }}
          title="Pickup"
        />
        <Marker
          coordinate={{
            latitude: 33.414667,
            longitude: -111.928861,
          }}
          title="Dropoff"
        />
      </MapView>

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
  map: {
    width: '95%',
    height: '40%',
  },
});

export default HomeScreen;
