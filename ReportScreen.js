import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';
import React, { useState }  from 'react';

const ReportScreen = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [buttonAvailable, setButtonAvailable] = useState(false);

  const onPress = () =>  checkFields();

  function checkFields()
  {
    if(!email.includes("@") || !email.includes("."))
    {
      alert("Please ensure that your email is entered correctly.")
    }
    else if(email && body)
    {
      alert("Thank you! Your feedback has been received.")
      // TODO: Send the email and feedback to the back-end
      setEmail('');
      setBody('');

    }
  }


  return (
    <View style={styles.container}>
   
    <Text style={styles.titleText}>Comments? Questions? Please enter your email and feedback below, and we'll get back to you.</Text>


    <TextInput name="email"
      style={styles.input}
      placeholder="Enter your email"
      value={email}
      onChangeText={(text) => setEmail(text)}
      />
      <TextInput name="body"
        style={styles.longInput}
        placeholder="Report a bug, suggest an improvement, or ask a question"
        value={body}
        onChangeText={(text) => setBody(text)}
      />

      <TouchableOpacity onPress={onPress}>
        <View style={[styles.button, {backgroundColor: buttonAvailable ? '#707070' : '#496448' }]}>
          <Text style={styles.buttonText}>SUBMIT</Text>
        </View>
      </TouchableOpacity>

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
  longInput: {
    height: 200,
    width: 400,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 0,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white',
  },
  button: {
    alignItems: 'center',    
    padding:10,
  },
  buttonText: {
    color:"white",
    fontSize:16
  },
});

export default ReportScreen;
