import * as React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';

export default function SignUpScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text
        style={styles.headingText}>
        Create an account,
                </Text>
      <Text
        style={styles.descriptionText}>
        Sign up to continue
                </Text>
      <TextInput placeholder='Name' style={styles.inputText} />
      <TextInput placeholder='Email' style={styles.inputText} />
      <TextInput placeholder='Country' style={styles.inputText} />
      <TextInput placeholder='Username' style={styles.inputText} />
      <TextInput placeholder='Password' style={styles.inputText} />
      <TouchableOpacity onPress={() => {/* do this */ }}>
        <View style={styles.customButton}
        >
          <Text style={styles.customButtonText}>Continue</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
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
