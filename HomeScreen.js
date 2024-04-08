import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Alert, FlatList, KeyboardAvoidingView} from 'react-native';
import React, { useState, useEffect }  from 'react';
import renderIf from './renderIf'
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

// The key to the Google Maps API
const API_KEY = 'AIzaSyBTmDQaUozjWgIJdxM-f-yHMAKQULSixAo';

const HomeScreen = ({ navigation }) => {

// List of addresses of buildings that are a part of the ASU Temp ecampus
pickupLocations = ["Acourtia Hall, 1 E 5th St Tempe AZ 85281", "Adelphi Commons, 739 E Apache Blvd Tempe AZ 85281", "Agave Hall, 720 E Apache Blvd Tempe AZ 85281", "Aquatic Complex, 601 S College Ave Tempe AZ 85281", "Armstrong Hall, 1100 S McAllister Ave Tempe AZ 85281", "Arroyo Hall, 1100 S McAllister Ave Tempe AZ 85281", "Art Building, 900 S Forest Mall Tempe AZ 85287", "Art Warehouse, 851 S Myrtle Ave Tempe AZ 85281", "Best Hall, 1215 S Forest Ave Tempe AZ 85281", "Business Admin., 400 E Lemon St Tempe AZ 85281", "Business Admin. C Wing, 400 E Lemon St Tempe AZ 85281", "Biodsgn. Inst. Bldg. A, 1001 S McAllister Ave Tempe AZ 85281", "Biodsgn. Inst. Bldg. B, 727 E Tyler St Tempe AZ 85281", "Biodsgn. Inst. Bldg. C, 797 E Tyler St Tempe AZ 85281", "Bookstore, 525 E Orange St. Tempe AZ 85287", "Brickyard Artisan Crtyrd., 30 E 7th St Tempe AZ 85281", "Brickyard Engnr., 699 S Mill Ave Tempe AZ 85281", "Campus Chldrn's Cntr., 910 S Terrace Rd Tempe AZ 85281", "Carson Stdnt Ath Cntr., 500 E Veterans Way Tempe AZ 85287", "Centerpoint, 660 S Mill Ave Tempe AZ 85281", "Cereus Hall, 820 E Apache Blvd Tempe AZ 85281", "Center for Fam. Studies, 851 S Forest Mall Tempe AZ 85281", "Central Plant, 452 E Orange St. Tempe AZ 85281", "Central Plant South, 1601 S McAllister Ave Tempe AZ 85281", "Cholla Apartments, 909 S Terrace Rd Tempe AZ 85281", "College Ave. Market, 660 S College Ave Tempe AZ 85281", "College Ave. Commons, 660 S College Ave Tempe AZ 85281", "Cmb'd Heat & Pwr. Fac., 800 E Lemon St Tempe AZ 85281", "Computing Commons, 501 E Orange St. Tempe AZ 85281", "Coor Hall, 976 S Forest Mall Tempe AZ 85281", "Cottonwood Hall, 850 E Apache Blvd Tempe AZ 85281", "Cowden Fam. Rsrcs., 850 Cady Mall Tempe AZ 85281", "Danforth Chapel, 1050 Cady Mall Tempe AZ 85281", "Design Annex, 660 S College Ave Tempe AZ 85281", "Design North, 810 S Forest Mall Tempe AZ 85281", "Design South, 850 S Forest Mall Tempe AZ 85281", "Discovery Hall, 250 E Lemon St Tempe AZ 85281", "Dixie Gammage Hall, 1001 S Forest Mall Tempe AZ 85281", "Education Lecture Hall, 100 E Gammage Pkwy Tempe AZ 85281", "Engineering Center, 1031 Palm Walk Tempe AZ 85281", "Engin. Research Cntr., 551 E Tyler Mall Tempe AZ 85281", "Farmer Education Bldg., 1050 S Forest Mall Tempe AZ 85281", "Fulton Center, 300 E University Dr Tempe AZ 85281", "Gammage Auditorium, 1200 S Forest Ave Tempe AZ 85281", "Goldwater Center, 650 E Tyler Mall Tempe AZ 85281", "Greek Ldrsp. Vlg. A-D, 975 S Rural Rd Tempe AZ 85281", "Greek Ldrsp. Vlg. CC., 975 S Rural Rd Tempe AZ 85281", "Grounds Maint. Facility, 1551 S Rural Rd Tempe AZ 85281", "Harrington-Birchett House, 208 E 7th St Tempe AZ 85281", "Hassayampa Academic Village, 1201 S McAllister Ave Tempe AZ 85281", "Hayden Hall, 1260 S College Ave Tempe AZ 85281", "Hayden Library, 300 E Orange St. Tempe AZ 85281", "Health Service, 451 E University Dr Tempe AZ 85281", "Honors Hall, 821 East Lemon Mall Tempe AZ 85281", "Interdisciplin. A/B, 1120 Cady Mall Tempe AZ 85281", "Intrdiscip. Sc. & Tech. 1, 550 E Orange St. Tempe AZ 85281", "Intrdiscip. Sc. & Tech. 2, 850 S McAllister Ave Tempe AZ 85281", "Intrdiscip. Sc. & Tech. 4, 781 S Terrace Rd Tempe AZ 85287", "Intrdiscip. Sc. & Tech. 5, 600 E Tyler Mall Tempe AZ 85281", "Intrdiscip. Sc. & Tech. 7, 808 S Rural Rd Tempe AZ 85281", "Irish Hall, 1250 S College Ave Tempe AZ 85281", "Juniper Hall, 1280 S Rural Rd Tempe AZ 85281", "Language & Literature, 851 Cady Mall Tempe AZ 85281", "Life Sciences Center, 451 E Tyler Mall Tempe AZ 85281", "Life Sciences C-wing, 401 E Tyler Mall Tempe AZ 85281", "Life Sciences Tower, 400 E Tyler Mall Tempe AZ 85281", "Lyceum Theatre, 901 S Forest Mall Tempe AZ 85281", "Manzanita Hall, 600 E University Dr Tempe AZ 85281", "Matthews Center, 950 Cady Mall Tempe AZ 85287", "Material Srv. Bldg., 1711 S Rural Rd Tempe AZ 85281", "Matthews Hall, 925 S Forest Mall Tempe AZ 85281", "McClintock Hall, 903 S Forest Ave Tempe AZ 85281", "McCord Hall, 450 E Lemon St Tempe AZ 85281", "Memorial Union, 1290 S Normal Ave Tempe AZ 85281", "Mesquite Hall, 5 W 9th St Tempe AZ 85281", "Moeur Building, 201 Orange Mall Tempe AZ 85281", "Murdock Lecture Hall, 450 E Orange St. Tempe AZ 85287", "Music Building, 50 E Gammage Pkwy Tempe AZ 85281", "Neeb Hall, 920 S Forest Mall Tempe AZ 85281", "Nelson Fine Arts Center, 51 E 10th St Tempe AZ 85281", "Noble Sci. Library, 601 E Tyler Mall Tempe AZ 85281", "Off-Camp. Stdnt. Srv., 915 S Terrace Rd Tempe AZ 85281", "Old Main, 400 E Tyler Mall Tempe AZ 85281", "Orchidhouse (Brckyd.), 21 E 6th St Tempe AZ 85281", "Palo Verde East, 510 E University Dr Tempe AZ 85281", "Palo Verde West, 430 E University Dr Tempe AZ 85281", "Payne Hall, 1000 S Forest Mall Tempe AZ 85281", "Perform. & Media Arts, 950 S Forest Mall Tempe AZ 85281", "Physical Ed. East, 611 E Orange St. Tempe AZ 85281", "Physical Ed. West, 451 Orange Mall Tempe AZ 85281", "Physical Sci. Wings, 550 E Tyler Mall Tempe AZ 85281", "Piper Writers House, 450 E Tyler Mall Tempe AZ 85281", "Police, 325 E Apache Blvd Tempe AZ 85281", "Psychology Building, 950 S McAllister Ave Tempe AZ 85287", "Psychology North, 900 S McAllister Ave Tempe AZ 85281", "Rosewood Hall, 851 E Apache Blvd Tempe AZ 85281", "Ross-Blakley Hall, 1102 S McAllister Ave Tempe AZ 85287", "Sage Hall, 751 East Lemon Mall Tempe AZ 85281", "San Pablo Hall, 555 E Veterans Way Tempe AZ 85281", "Schwada Building, 620 E Orange St. Tempe AZ 85281", "Sch. Hu. Ev. Soc. Chg., 900 Cady Mall Tempe AZ 85281", "Social Sciences, 951 Cady Mall Tempe AZ 85281", "Sonora Center, 1480 S Rural Rd Tempe AZ 85281", "Stauffer Comm., 950 S Forest Mall Tempe AZ 85281", "Sun Devil Fit. Cmplx., 400 E Apache Blvd Tempe AZ 85281", "Student Athlete Facility, 500 E Veterans Way Tempe AZ 85287", "Student Pavilion, 400 E Orange St. Tempe AZ 85287", "Student Services Bldg., 1151 S Forest Ave Tempe AZ 85287", "Sun Angel Clubhouse, 1125 E Rio Salado Pkwy Tempe AZ 85288", "Sun Devil Sports Perf., 650 S Athletes Pl Tempe AZ 85288", "Sun Devil Stadium, 500 E Veterans Way Tempe AZ 85287", "Sun Angel Stadium, 400 S Rural Rd Tempe AZ 85281", "Tempe Center, 3 E 9th St Tempe AZ 85281", "The Annex, 2 E 10th St Tempe AZ 85281", "Tooker House A-D, 500 E University Dr Tempe AZ 85281", "Tower Center, 116 E University Dr Tempe AZ 85281", "University Cntr. A-C, 1130 E University Dr Tempe AZ 85288", "University Club, 425 E University Dr Tempe AZ 85281", "University Services Bldg., 1551 S Rural Rd Tempe AZ 85281", "Urban Systems Engin., 651 E University Dr Tempe AZ 85281", "University Towers, 525 S Forest Ave Tempe AZ 85281", "Verbena Hall, 711 E Lemon St Tempe AZ 85281", "Verde Dickey Dome, 511 S Rural Rd Tempe AZ 85288", "Vista del Sol Cmplx., 701 E Apache Blvd Tempe AZ 85281", "Villas @ Vista del Sol, 551 E Apache Blvd Tempe AZ 85281", "Weatherup Center, 521 S Rural Rd Tempe AZ 85288", "Wells Fargo Arena, 600 E Veterans Way Tempe AZ 85281", "West Hall, 1000 Cady Mall Tempe AZ 85281", "Wexler Hall, 901 Palm Walk Tempe AZ 85281", "Willow Hall, 850 East Lemon Mall Tempe AZ 85281", "Wilson Hall, 240 Orange Mall Tempe AZ 85281", "Womens Gymst. Trng., 401 S Rural Rd Tempe AZ 85288", "Wrestling Training Fac., 391 S Rural Rd Tempe AZ 85288", "Wrigley Hall, 800 Cady Mall Tempe AZ 85281"]
destinationLocations = ["Acourtia Hall, 1 E 5th St Tempe AZ 85281", "Adelphi Commons, 739 E Apache Blvd Tempe AZ 85281", "Agave Hall, 720 E Apache Blvd Tempe AZ 85281", "Aquatic Complex, 601 S College Ave Tempe AZ 85281", "Armstrong Hall, 1100 S McAllister Ave Tempe AZ 85281", "Arroyo Hall, 1100 S McAllister Ave Tempe AZ 85281", "Art Building, 900 S Forest Mall Tempe AZ 85287", "Art Warehouse, 851 S Myrtle Ave Tempe AZ 85281", "Best Hall, 1215 S Forest Ave Tempe AZ 85281", "Business Admin., 400 E Lemon St Tempe AZ 85281", "Business Admin. C Wing, 400 E Lemon St Tempe AZ 85281", "Biodsgn. Inst. Bldg. A, 1001 S McAllister Ave Tempe AZ 85281", "Biodsgn. Inst. Bldg. B, 727 E Tyler St Tempe AZ 85281", "Biodsgn. Inst. Bldg. C, 797 E Tyler St Tempe AZ 85281", "Bookstore, 525 E Orange St. Tempe AZ 85287", "Brickyard Artisan Crtyrd., 30 E 7th St Tempe AZ 85281", "Brickyard Engnr., 699 S Mill Ave Tempe AZ 85281", "Campus Chldrn's Cntr., 910 S Terrace Rd Tempe AZ 85281", "Carson Stdnt Ath Cntr., 500 E Veterans Way Tempe AZ 85287", "Centerpoint, 660 S Mill Ave Tempe AZ 85281", "Cereus Hall, 820 E Apache Blvd Tempe AZ 85281", "Center for Fam. Studies, 851 S Forest Mall Tempe AZ 85281", "Central Plant, 452 E Orange St. Tempe AZ 85281", "Central Plant South, 1601 S McAllister Ave Tempe AZ 85281", "Cholla Apartments, 909 S Terrace Rd Tempe AZ 85281", "College Ave. Market, 660 S College Ave Tempe AZ 85281", "College Ave. Commons, 660 S College Ave Tempe AZ 85281", "Cmb'd Heat & Pwr. Fac., 800 E Lemon St Tempe AZ 85281", "Computing Commons, 501 E Orange St. Tempe AZ 85281", "Coor Hall, 976 S Forest Mall Tempe AZ 85281", "Cottonwood Hall, 850 E Apache Blvd Tempe AZ 85281", "Cowden Fam. Rsrcs., 850 Cady Mall Tempe AZ 85281", "Danforth Chapel, 1050 Cady Mall Tempe AZ 85281", "Design Annex, 660 S College Ave Tempe AZ 85281", "Design North, 810 S Forest Mall Tempe AZ 85281", "Design South, 850 S Forest Mall Tempe AZ 85281", "Discovery Hall, 250 E Lemon St Tempe AZ 85281", "Dixie Gammage Hall, 1001 S Forest Mall Tempe AZ 85281", "Education Lecture Hall, 100 E Gammage Pkwy Tempe AZ 85281", "Engineering Center, 1031 Palm Walk Tempe AZ 85281", "Engin. Research Cntr., 551 E Tyler Mall Tempe AZ 85281", "Farmer Education Bldg., 1050 S Forest Mall Tempe AZ 85281", "Fulton Center, 300 E University Dr Tempe AZ 85281", "Gammage Auditorium, 1200 S Forest Ave Tempe AZ 85281", "Goldwater Center, 650 E Tyler Mall Tempe AZ 85281", "Greek Ldrsp. Vlg. A-D, 975 S Rural Rd Tempe AZ 85281", "Greek Ldrsp. Vlg. CC., 975 S Rural Rd Tempe AZ 85281", "Grounds Maint. Facility, 1551 S Rural Rd Tempe AZ 85281", "Harrington-Birchett House, 208 E 7th St Tempe AZ 85281", "Hassayampa Academic Village, 1201 S McAllister Ave Tempe AZ 85281", "Hayden Hall, 1260 S College Ave Tempe AZ 85281", "Hayden Library, 300 E Orange St. Tempe AZ 85281", "Health Service, 451 E University Dr Tempe AZ 85281", "Honors Hall, 821 East Lemon Mall Tempe AZ 85281", "Interdisciplin. A/B, 1120 Cady Mall Tempe AZ 85281", "Intrdiscip. Sc. & Tech. 1, 550 E Orange St. Tempe AZ 85281", "Intrdiscip. Sc. & Tech. 2, 850 S McAllister Ave Tempe AZ 85281", "Intrdiscip. Sc. & Tech. 4, 781 S Terrace Rd Tempe AZ 85287", "Intrdiscip. Sc. & Tech. 5, 600 E Tyler Mall Tempe AZ 85281", "Intrdiscip. Sc. & Tech. 7, 808 S Rural Rd Tempe AZ 85281", "Irish Hall, 1250 S College Ave Tempe AZ 85281", "Juniper Hall, 1280 S Rural Rd Tempe AZ 85281", "Language & Literature, 851 Cady Mall Tempe AZ 85281", "Life Sciences Center, 451 E Tyler Mall Tempe AZ 85281", "Life Sciences C-wing, 401 E Tyler Mall Tempe AZ 85281", "Life Sciences Tower, 400 E Tyler Mall Tempe AZ 85281", "Lyceum Theatre, 901 S Forest Mall Tempe AZ 85281", "Manzanita Hall, 600 E University Dr Tempe AZ 85281", "Matthews Center, 950 Cady Mall Tempe AZ 85287", "Material Srv. Bldg., 1711 S Rural Rd Tempe AZ 85281", "Matthews Hall, 925 S Forest Mall Tempe AZ 85281", "McClintock Hall, 903 S Forest Ave Tempe AZ 85281", "McCord Hall, 450 E Lemon St Tempe AZ 85281", "Memorial Union, 1290 S Normal Ave Tempe AZ 85281", "Mesquite Hall, 5 W 9th St Tempe AZ 85281", "Moeur Building, 201 Orange Mall Tempe AZ 85281", "Murdock Lecture Hall, 450 E Orange St. Tempe AZ 85287", "Music Building, 50 E Gammage Pkwy Tempe AZ 85281", "Neeb Hall, 920 S Forest Mall Tempe AZ 85281", "Nelson Fine Arts Center, 51 E 10th St Tempe AZ 85281", "Noble Sci. Library, 601 E Tyler Mall Tempe AZ 85281", "Off-Camp. Stdnt. Srv., 915 S Terrace Rd Tempe AZ 85281", "Old Main, 400 E Tyler Mall Tempe AZ 85281", "Orchidhouse (Brckyd.), 21 E 6th St Tempe AZ 85281", "Palo Verde East, 510 E University Dr Tempe AZ 85281", "Palo Verde West, 430 E University Dr Tempe AZ 85281", "Payne Hall, 1000 S Forest Mall Tempe AZ 85281", "Perform. & Media Arts, 950 S Forest Mall Tempe AZ 85281", "Physical Ed. East, 611 E Orange St. Tempe AZ 85281", "Physical Ed. West, 451 Orange Mall Tempe AZ 85281", "Physical Sci. Wings, 550 E Tyler Mall Tempe AZ 85281", "Piper Writers House, 450 E Tyler Mall Tempe AZ 85281", "Police, 325 E Apache Blvd Tempe AZ 85281", "Psychology Building, 950 S McAllister Ave Tempe AZ 85287", "Psychology North, 900 S McAllister Ave Tempe AZ 85281", "Rosewood Hall, 851 E Apache Blvd Tempe AZ 85281", "Ross-Blakley Hall, 1102 S McAllister Ave Tempe AZ 85287", "Sage Hall, 751 East Lemon Mall Tempe AZ 85281", "San Pablo Hall, 555 E Veterans Way Tempe AZ 85281", "Schwada Building, 620 E Orange St. Tempe AZ 85281", "Sch. Hu. Ev. Soc. Chg., 900 Cady Mall Tempe AZ 85281", "Social Sciences, 951 Cady Mall Tempe AZ 85281", "Sonora Center, 1480 S Rural Rd Tempe AZ 85281", "Stauffer Comm., 950 S Forest Mall Tempe AZ 85281", "Sun Devil Fit. Cmplx., 400 E Apache Blvd Tempe AZ 85281", "Student Athlete Facility, 500 E Veterans Way Tempe AZ 85287", "Student Pavilion, 400 E Orange St. Tempe AZ 85287", "Student Services Bldg., 1151 S Forest Ave Tempe AZ 85287", "Sun Angel Clubhouse, 1125 E Rio Salado Pkwy Tempe AZ 85288", "Sun Devil Sports Perf., 650 S Athletes Pl Tempe AZ 85288", "Sun Devil Stadium, 500 E Veterans Way Tempe AZ 85287", "Sun Angel Stadium, 400 S Rural Rd Tempe AZ 85281", "Tempe Center, 3 E 9th St Tempe AZ 85281", "The Annex, 2 E 10th St Tempe AZ 85281", "Tooker House A-D, 500 E University Dr Tempe AZ 85281", "Tower Center, 116 E University Dr Tempe AZ 85281", "University Cntr. A-C, 1130 E University Dr Tempe AZ 85288", "University Club, 425 E University Dr Tempe AZ 85281", "University Services Bldg., 1551 S Rural Rd Tempe AZ 85281", "Urban Systems Engin., 651 E University Dr Tempe AZ 85281", "University Towers, 525 S Forest Ave Tempe AZ 85281", "Verbena Hall, 711 E Lemon St Tempe AZ 85281", "Verde Dickey Dome, 511 S Rural Rd Tempe AZ 85288", "Vista del Sol Cmplx., 701 E Apache Blvd Tempe AZ 85281", "Villas @ Vista del Sol, 551 E Apache Blvd Tempe AZ 85281", "Weatherup Center, 521 S Rural Rd Tempe AZ 85288", "Wells Fargo Arena, 600 E Veterans Way Tempe AZ 85281", "West Hall, 1000 Cady Mall Tempe AZ 85281", "Wexler Hall, 901 Palm Walk Tempe AZ 85281", "Willow Hall, 850 East Lemon Mall Tempe AZ 85281", "Wilson Hall, 240 Orange Mall Tempe AZ 85281", "Womens Gymst. Trng., 401 S Rural Rd Tempe AZ 85288", "Wrestling Training Fac., 391 S Rural Rd Tempe AZ 85288", "Wrigley Hall, 800 Cady Mall Tempe AZ 85281"]
clickFlag = 0;

  // Associating variables with their setter functions
  const onPress = () =>  submitPressed();
  const cancelOnPress = () =>  cancelPressed();
  const [buttonPressed, setButtonPressed] = useState(false);
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [pickupCoordinates, setPickupCoordinates] = useState({ latitude: 0, longitude: 0 });
  const [destinationCoordinates, setDestinationCoordinates] = useState({ latitude: 0, longitude: 0 });
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [routeDuration, setRouteDuration] = useState(null);

  // When the pickup location is changed, generate the list of suggested auto-fill options
  const handlePickupChange = (text) => {
    setPickup(text);
    // Filter your pickup suggestions based on the input text
    // For example, if you have an array of pickup locations called pickupLocations:
    const filteredPickupSuggestions = pickupLocations.filter(location =>
      location.toLowerCase().includes(text.toLowerCase())
    );
    setPickupSuggestions(filteredPickupSuggestions);
  };

  // When the destination location is changed, generate the list of suggested auto-fill options
  const handleDestinationChange = (text) => {
    setDestination(text);
    // Filter your destination suggestions based on the input text
    // For example, if you have an array of destination locations called destinationLocations:
    const filteredDestinationSuggestions = destinationLocations.filter(location =>
      location.toLowerCase().includes(text.toLowerCase())
    );
    setDestinationSuggestions(filteredDestinationSuggestions);
  };

  // When a pickup suggestion is pressed, auto-fill with that suggestion
  const handlePickupSuggestionPress = (suggestion) => {
    setPickup(suggestion);
    setPickupSuggestions([]); // Clear suggestions
  };

  // When a destination suggestion is pressed, auto-fill with that suggestion
  const handleDestinationSuggestionPress = (suggestion) => {
    setDestination(suggestion);
    setDestinationSuggestions([]); // Clear suggestions
  };
  
  // Renders each suggestion as a button
  const renderPickupItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePickupSuggestionPress(item)}>
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  // Renders each suggestion as a button
  const renderDestinationItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleDestinationSuggestionPress(item)}>
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  // Returns whether a given address is valid using Google Maps API
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

  async function fetchNearestAddress(myCoordinates) {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${myCoordinates.latitude},${myCoordinates.longitude}&key=${API_KEY}`
      );
      const address = response.data.results[0].formatted_address;
      return address;
    } catch (error) {
      console.error('Error fetching nearest address:', error);
      return 'ERROR';
    }
  };



  // Determines whether a given address is within the ASU Tempe campus
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
        if(Math.abs(isPickupValid.coordinates["latitude"] - isDestinationValid.coordinates["latitude"]) < .0001 && Math.abs(isPickupValid.coordinates["longitude"] - isDestinationValid.coordinates["longitude"]) < .0001)
        {
          Alert.alert('Invalid Address', 'The destination address cannot be the same as the pickup address.')
        }
        else if(inBounds(isPickupValid.coordinates) && inBounds(isDestinationValid.coordinates))
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

  // Checks that pickup and destination are filled in when submit is pressed
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

  // Reverts the GUI when a request is cancelled
  function cancelPressed()
  {
    setButtonPressed(false);
    setEditablePickup(true);
    setEditableDestination(true);
  }

  async function handleMapPress(event){
    const { coordinate } = event.nativeEvent;
    if(editablePickup)
    {
      if(clickFlag == 0)
      {
        setPickupCoordinates(coordinate);
        const address = await fetchNearestAddress(coordinate);
        setPickup(address);
      }
      else
      {
        setDestinationCoordinates(coordinate);
        setDestination(await fetchNearestAddress(coordinate));
      }
    }
    
  };

  const handleMarkerTypeChange = (event) => {
    if(event=='pickup')
    {
      clickFlag = 0;
    }
    else
    {
      clickFlag = 1;
    }
    
  };

  async function getRouteDuration()
  {
    try {
      // Call a routing service to get route information
      const routeResponse = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${pickupCoordinates.latitude},${pickupCoordinates.longitude}&destination=${destinationCoordinates.latitude},${destinationCoordinates.longitude}&key=${API_KEY}`);
      const routeResult = await routeResponse.json();
      

      // Extract duration in minutes from the route response
      var durationInMinutes = 0;
      if(routeResult.routes[0])
      {
        durationInMinutes = routeResult.routes[0].legs[0].duration.text;
      }
      setRouteDuration(durationInMinutes);
    } catch (error) {
      console.error('Error fetching route duration:', error);
    }
  }

  function getArrivalTime()
  {
    if(!pickup || !destination)
    {
      return "N/A";
    }
    getRouteDuration();
    if (!routeDuration) return ''; // Return empty string if route duration is not available yet
    const routeDurationInMinutes = parseInt(routeDuration.split(' ')[0]); // Extracting minutes from duration text
    const arrivalTime = new Date(new Date().getTime() + routeDurationInMinutes * 60000).toLocaleTimeString();
    return arrivalTime;
  }

  const [editablePickup, setEditablePickup] = useState(true);
  const [editableDestination, setEditableDestination] = useState(true);

  // The center of the ASU Tempe campus
  const center = {
    lat: 33.418667,
    lng: 111.932861,
  };

  return (
    
    // Contains all GUI elements
    <View style={styles.container}>
      
      <Text style={styles.welcomeText}>Request a Safety Escort</Text>
      <Text style={styles.smallText}>An automated vehicle will be sent to your location.</Text>
      
      <TextInput
      style={styles.input}
      placeholder="Pickup location"
      value={pickup}
      onChangeText={handlePickupChange}
      editable={editablePickup}
      />
      <FlatList
        data={pickupSuggestions}
        renderItem={renderPickupItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput
        style={styles.input}
        placeholder="Destination"
        value={destination}
        onChangeText={handleDestinationChange}
        editable={editableDestination}
      />
      <FlatList
        data={destinationSuggestions}
        renderItem={renderDestinationItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity onPress={() => handleMarkerTypeChange('pickup')}>
          <Text>Select Pickup               </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleMarkerTypeChange('destination')}>
          <Text>Select Destination</Text>
        </TouchableOpacity>
      </View>

      
      <MapView
        style={styles.map}
        initialRegion={{
          // Coordinates of ASU
          latitude: 33.418667,
          longitude: -111.932861,
          latitudeDelta: 0.01922,
          longitudeDelta: 0.01421,
        }}
        onPress={handleMapPress}
        
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
        <TouchableOpacity onPress={buttonPressed ? undefined : onPress}>
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
        <Text style={[styles.buttonText, {color:"black"}]}>Estimated time of arrival: {getArrivalTime()}</Text>
        )}
        {renderIf(!buttonPressed)(
        <Text style={[styles.buttonText, {color:"black"}]}></Text>
        )}
      <StatusBar style="auto" />
    </View>
  );
}

// CSS stylesheet
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
