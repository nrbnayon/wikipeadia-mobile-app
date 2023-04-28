import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image } from 'react-native';

const Login = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View  className="flex-row justify-center">
          <Image source={require('../../../assets/images/login.png')} 
          style={{width: 200, height: 200}} />
        </View>
      <View style={styles.formContainer}>
        <Text style={{
              fontWeight: 500,
              color: "#383838",
              fontSize: 22,
              marginTop: 15,
            }}>Email</Text>
        <TextInput
          placeholder="Enter your Email"
          style={styles.input}
        />
        <Text style={{
              fontWeight: 500,
              color: "#383838",
              fontSize: 22,
              marginTop: 15,
            }}>Password</Text>
        <TextInput
          placeholder="Enter Your Password"
          style={styles.input}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={() => navigation.navigate("Home")}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
              navigation.navigate("ForgetPassword")}}>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.signupLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={styles.skipLink}>Skip</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  input: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#2196F3',
    textAlign: 'right',
  },
  signupContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    color: '#555',
  },
  signupLink: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  skipLink: {
    color: '#2196F3',
    marginTop: 20,
  },
});

export default Login;
