import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import TextInputComponent from '../components/inputs/TextInputComponent';
import TextComponent from '../components/inputs/TextComponent';
import ButtonComponent from '../components/inputs/ButtonComponent';
import { staticText } from '../constants/static';
import serviceHelper from '../helpers/service_helper';
import validatorHelper from '../helpers/validator_helper';
import alertHelper from '../helpers/alert_helper';
import hashHelper from '../helpers/hash_helper';
import { settings } from '../constants/settings';

export default function SignInScreen({ navigation }) {

  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  const getEmail = (value) => {
    onChangeEmail(value);
  }

  const getPassword = (value) => {
    onChangePassword(value);
  }

  const onSignInUser = async () => {

    const emailValidation = validatorHelper.validateEmailFormat(email);

    if (emailValidation) {

      const hashPassword = hashHelper.hiddenPassword(password),
        payload = serviceHelper.signInPayload(email, hashPassword);

      const response = await fetch(`${settings.urlApi}/auth/login`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }),
        data = await response.json();

      if (data.isAuthenticated) {
        navigation.push('Dashboard');
      } else {
        alertHelper.showAlertMessage(data.mensaje);
      }
    } else {
      alertHelper.showAlertMessage(staticText.valid_email);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formGroup}>
          <TextComponent
            value={staticText.sign_in_heading}
            size={30}
            weight={"400"} />
        </View>
        <View style={styles.formGroup}>
          <TextComponent
            value={staticText.sign_in_subheading}
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
          <TouchableOpacity onPress={() => { onSignInUser() }}>
            <ButtonComponent
              value={staticText.continue} main={true} />
          </TouchableOpacity>
        </View>
        <View style={styles.formGroup}>
          <TouchableOpacity onPress={() => { navigation.push('Register') }}>
            <ButtonComponent
              value={staticText.dont_have_account} main={false} />
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
