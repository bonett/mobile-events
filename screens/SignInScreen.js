import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';


export default function SignInScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text
          style={styles.headingText}>
          Welcome back,
                </Text>
        <Text
          style={styles.descriptionText}>
          Sign in to continue
                </Text>
        <TextInput placeholder='Email' style={styles.inputText} />
        <TextInput placeholder='Password' style={styles.inputText} />
        <View style={{ margin: 7 }} />
        <TouchableOpacity onPress={() => {/* do this */ }}>
          <View style={styles.customButton}
          >
            <Text style={styles.customButtonText}>Continue</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

SignInScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    paddingTop: 40,
    paddingStart: 20,
    paddingEnd: 20,
  },
  headingText: {
    fontSize: 22,
    fontWeight: "300"
  },
  descriptionText: {
    fontSize: 30,
    fontWeight: "200",
    paddingBottom: 10
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
    color: "#fff",
  },
});
