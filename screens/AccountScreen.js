import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Image } from 'react-native';


export default function AccountScreen({ navigation }) {
  return (
    <>
      <View style={styles.container}>
        <Image source={require('./../assets/images/user.png')} style={styles.picture} />
        <View style={styles.heading}>
          <Text style={styles.fullName}> Wilfrido Bonett </Text>
          <Text style={styles.email}> wbonett10@gmail.com </Text>
          <Text style={styles.country}> Colombia</Text>
        </View>
      </View>
      <View style={styles.footerAction}>
        <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
          <View style={styles.customButton}
          >
            <Text style={styles.customButtonText}>Sign out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  footerAction: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  picture: {
    marginBottom: 20,
    width: 80,
    height: 80
  },
  heading: {
    paddingVertical: 10,
    alignItems: 'center'
  },
  fullName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#202634",
  },
  email: {
    fontSize: 14,
    fontWeight: "300",
    color: "#202634"
  },
  country: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: "500",
    color: "#202634"
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
    color: "#fff",
  },
});
