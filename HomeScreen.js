import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Alert} from 'react-native';
import React, { useState }  from 'react';
import renderIf from './renderIf'
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

const API_KEY = 'AIzaSyBTmDQaUozjWgIJdxM-f-yHMAKQULSixAo';

const HomeScreen = ({ navigation }) => {
  const images = [
    { url: 'https://i.imgur.com/AVtkuWA.png' }, // Replace with the actual URL of your image
  ];

  const onPress = () =>  submitPressed();
  const cancelOnPress = () =>  cancelPressed();
  const [buttonPressed, setButtonPressed] = useState(false);
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [pickupCoordinates, setPickupCoordinates] = useState({ latitude: 0, longitude: 0 });
  const [destinationCoordinates, setDestinationCoordinates] = useState({ latitude: 0, longitude: 0 });


  const validateAddress = async (address) => {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`);
      const { results } = response.data;
      if (results && results.length > 0) 
      {
        const location = results[0].geometry.location;
        return {
          isValid: true,
          coordinates: {
            latitude: location.lat,
            longitude: location.lng
          }};
      } 
      else 
      {
        return { isValid: false }; // Address is not valid
      }
    } catch (error) {
      console.error('Error validating address:', error);
      return { isValid: false }; // Error occurred while validating address
    }
  };


  function inBounds(myAddress)
  {
    if(myAddress.latitude > 33.41 && myAddress.latitude < 33.432 && myAddress.longitude > -111.943 && myAddress.longitude < -111.925)
    {
      return true;
    }
    return false;
  }

    const [address, setAddress] = useState('');
  
    const handleValidation = async () => {
      const isPickupValid = await validateAddress(pickup);
      const isDestinationValid = await validateAddress(destination);
      if (isPickupValid.isValid && isDestinationValid.isValid) {
        if(inBounds(isPickupValid.coordinates) && inBounds(isDestinationValid.coordinates))
        {
          Alert.alert('Request Submitted', 'A safety escort vehicle is on its way.');
          setButtonPressed(true);
          setEditablePickup(false);
          setEditableDestination(false);
          setPickupCoordinates(isPickupValid.coordinates);
          setDestinationCoordinates(isDestinationValid.coordinates);
          //TODO: Send pickup and destination to back-end
        }
        else if(inBounds(isDestinationValid.coordinates))
        {
          Alert.alert('Out of bounds', 'The provided pickup address is not within our service area.')
        }
        else if(inBounds(isPickupValid.coordinates))
        {
          Alert.alert('Out of bounds', 'The provided destination address is not within our service area.')
        }
        else
        {
          Alert.alert('Out of bounds', 'The provided pickup and destination addresses are not within our service area.')
        }
      } else if (isDestinationValid.isValid) {
        Alert.alert('Invalid Address', 'The pickup address is not valid.');
        return false;
      }
      else if (isPickupValid.isValid) {
        Alert.alert('Invalid Address', 'The destination address is not valid.');
        return false;
      }
      else {
        Alert.alert('Invalid Address', 'The pickup and destination addresses are not valid.');
        return false;
      }
      
    };

  function submitPressed()
  {
    if(pickup ? destination: null)
    {
      handleValidation()
    }
    else {
      Alert.alert('Missing Addresses', 'Please provide both pickup and destination addresses.');
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
          latitudeDelta: 0.01922,
          longitudeDelta: 0.01421,
        }}
        
      >
        <Marker
          coordinate={pickupCoordinates}
          title="Pickup"
        />
        <Marker
          coordinate={destinationCoordinates}
          title="Destination"
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
