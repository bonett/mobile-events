import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';

export default function SignInScreen({ navigation }) {

  const [email, onChangeEmail] = useState('wilfrido@gmail.com');
  const [password, onChangePassword] = useState('123456');

  const loginUser = async () => {

    const payload = {
      email: email,
      password: password
    };

    const response = await fetch(`http://localhost:8080/auth/login`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }),
      data = await response.json();

    if (data.isAuthenticated) {
      navigation.push('Dashboard', { session: data.id });
    } else {
      alert('You are not authorized')
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.headingText}> Hello ! </Text>
        <Text style={styles.descriptionText}> Sign in to continue </Text>
        <TextInput placeholder='Email' style={styles.inputText} onChangeText={email => onChangeEmail(email)} value={email} autoCapitalize="none" />
        <TextInput placeholder='Password' secureTextEntry={true} style={styles.inputText} onChangeText={password => onChangePassword(password)} value={password} autoCapitalize="none" />
        <TouchableOpacity onPress={() => { loginUser() }}>
          <View style={styles.customButton}>
            <Text style={styles.customButtonText}>Continue</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.push('Register') }}>
          <View style={styles.customLink}>
            <Text style={styles.customLinkText}>Don't have account</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    color: "#fff",
    fontWeight: '400',
    textTransform: "uppercase"
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
