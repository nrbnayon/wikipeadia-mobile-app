import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    // Implement sign up logic
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          autoCapitalize="words"
          autoCompleteType="name"
          textContentType="name"
          style={styles.input}
        />

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCompleteType="email"
          keyboardType="email-address"
          textContentType="emailAddress"
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCompleteType="password"
          textContentType="password"
          style={styles.input}
        />

        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          autoCompleteType="password"
          textContentType="password"
          style={styles.input}
        />
      </View>
      <TouchableOpacity style={styles.buttonContainer}>
  <Button title="Sign Up" onPress={() => navigation.navigate("Home")} color="" />
</TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <Text style={styles.footerLink}>Sign In</Text>
        <Text style={styles.footerText}> | </Text>
        <Text style={styles.footerLink}>Forgot Password?</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  buttonContainer: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    width: '100%',
    marginBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#333',
  },
  footerLink: {
    fontSize: 16,
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});

export default SignUp;
