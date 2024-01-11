import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to the Automated Safety Escort System App!</Text>
      <Text style={styles.smallText}>Input desired pickup and dropoff locations.</Text>
      <TextInput
      style={styles.input}
      placeholder="Pickup location"
      />
      <Button
        color="#345995"
        title="Submit 1"
        onPress={() => {
          // Handle button press for text 1
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Dropoff location"
      />
      <Button
        color="#345995"
        style={styles.button}
        title="Submit 2"
        onPress={() => {
          // Handle button press for text 2
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#317e33',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  welcomeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 44,
  },
  smallText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
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
});
