import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import TextInputComponent from '../components/inputs/TextInputComponent';
import TextComponent from '../components/inputs/TextComponent';
import ButtonComponent from '../components/inputs/ButtonComponent';
import helpers from './../helpers/validations';


export default function SignInScreen({ navigation }) {

  const [email, onChangeEmail] = useState('wilfrido@gmail.com');
  const [password, onChangePassword] = useState('123456');

  const _userSignIn = async () => {

    const emailValidation = helpers.validateEmail(email);

    if (emailValidation) {
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
    } else {
      alert('Please enter a valid email');
    }
  }

  const getEmail = (value) => {
    onChangeEmail(value);
  }

  const getPassword = (value) => {
    onChangePassword(value);
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formGroup}>
          <TextComponent
            value={'Hello !'}
            size={30}
            weight={"400"} />
        </View>
        <View style={styles.formGroup}>
          <TextComponent
            value={'Sign in to continue'}
            size={36}
            weight={"200"} />
        </View>
        <View style={styles.formGroup}>
          <TextInputComponent
            value={email}
            placeholder={'Email'}
            setValue={getEmail}
            secureTextEntry={false}
          />
        </View>
        <View style={styles.formGroup}>
          <TextInputComponent
            value={password}
            placeholder={'Password'}
            setValue={getPassword}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.formGroup}>
          <TouchableOpacity onPress={() => { _userSignIn() }}>
            <ButtonComponent
              value={'Continue'} main={true} />
          </TouchableOpacity>
        </View>
        <View style={styles.formGroup}>
          <TouchableOpacity onPress={() => { navigation.push('Register') }}>
            <ButtonComponent
              value={"Don't have account"} main={false} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingVertical: 40
  },
  scrollContainer: {
    flex: 1,
    paddingTop: 40,
    paddingStart: 20,
    paddingEnd: 20,
  },
  formGroup: {
    marginVertical: 4,
    paddingVertical: 4
  }
});
