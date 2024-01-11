import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Welcome to the Automated Safety Escort System App!</Text>
      <Text>Input desired pickup and dropoff locations</Text>
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
});
