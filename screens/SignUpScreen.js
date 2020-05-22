import React from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import TextInputComponent from '../components/inputs/TextInputComponent';
import TextComponent from '../components/inputs/TextComponent';
import ButtonComponent from '../components/inputs/ButtonComponent';
import serviceHelper from '../helpers/service_helper';
import validatorHelper from '../helpers/validator_helper';
import alertHelper from '../helpers/alert_helper';

export default function SignUpScreen({ navigation }) {

  const [username, onChangeUserName] = useState('');
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  const onRegisterUser = async () => {

    const emailValidation = validatorHelper.validateEmailFormat(email);

    if (emailValidation) {
      try {
        const payload = serviceHelper.signUpPayload(username, email, password),
          content = serviceHelper.getUrlBase('auth/register', "POST", payload);

        await fetch(content.urlApi, content.headers),
          data = await response.json();

        if (data.status === 'OK') {
          navigation.push('Login');
        } else {
          alertHelper.showAlertMessage(response.message);
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      alertHelper.showAlertMessage(staticText.valid_email);
    }
  }

  const getUsername = (value) => {
    onChangeUserName(value);
  }

  const getEmail = (value) => {
    onChangeEmail(value);
  }

  const getPassword = (value) => {
    onChangePassword(value);
  }

  const _userSignUp = () => {

    const emailValidation = validatorHelper.validateEmailFormat(email);

    if (emailValidation) {
      navigation.push('Login');
    } else {
      alert('Please enter a valid email');
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formGroup}>
          <TextComponent
            value={'Create an account'}
            size={30}
            weight={"400"} />
        </View>
        <View style={styles.formGroup}>
          <TextComponent
            value={'Sign up to continue'}
            size={36}
            weight={"200"} />
        </View>
        <View style={styles.formGroup}>
          <TextInputComponent
            value={username}
            placeholder={'Username'}
            setValue={getUsername}
            secureTextEntry={false}
          />
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
          <TouchableOpacity onPress={() => { onRegisterUser() }}>
            <ButtonComponent
              value={'Continue'} main={true} />
          </TouchableOpacity>
        </View>
        <View style={styles.formGroup}>
          <TouchableOpacity onPress={() => { navigation.push('Login') }}>
            <ButtonComponent
              value={'I have an account'} main={false} />
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
