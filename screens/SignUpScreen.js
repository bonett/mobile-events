import * as React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';

export default function SignUpScreen({ navigation }) {

  const [name, onChangeName] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [country, onChangeCountry] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const registerUser = () => {
    (name, email, password, country) ? navigation.push('Login') : alert('Invalid Credentials')
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.headingText}>Create an account,</Text>
      <Text style={styles.descriptionText}> Sign up to continue </Text>
      <TextInput placeholder='Name' style={styles.inputText} onChangeText={name => onChangeName(name)} value={name} autoCapitalize="none"/>
      <TextInput placeholder='Email' style={styles.inputText} onChangeText={email => onChangeEmail(email)} value={email} autoCapitalize="none"/>
      <TextInput placeholder='Country' style={styles.inputText} onChangeText={country => onChangeCountry(country)} value={country} autoCapitalize="none"/>
      <TextInput placeholder='Password' style={styles.inputText} onChangeText={password => onChangePassword(password)} value={password} autoCapitalize="none"/>
      <TouchableOpacity onPress={() => { registerUser() }}>
        <View style={styles.customButton}>
          <Text style={styles.customButtonText}>Continue</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { navigation.push('Login') }}>
        <View style={styles.customLink}>
          <Text style={styles.customLinkText}>I have an account</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingVertical: 40
  },
  contentContainer: {
    flex: 1,
    paddingTop: 40,
    paddingStart: 20,
    paddingEnd: 20,
  },
  headingText: {
    fontSize: 30,
    fontWeight: "400"
  },
  descriptionText: {
    fontSize: 36,
    fontWeight: "200",
    paddingVertical: 10
  },
  inputText: {
    height: 48,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ededed",
    borderRadius: 4,
    color: "#20232a",
    fontSize: 20,
    fontWeight: "300",
    paddingStart: 8,
    paddingEnd: 8,
  },
  customButton: {
    backgroundColor: "#2433AC",
    height: 48,
    marginVertical: 8,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: "600"
  },
  customButtonText: {
    fontSize: 18,
    fontWeight: '400',
    textTransform: "uppercase",
    color: "#fff",
  },
  customLink: {
    height: 48,
    marginVertical: 8,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: "600"
  },
  customLinkText: {
    fontSize: 14,
    fontWeight: '300',
    color: "#2433AC",
  },
});
