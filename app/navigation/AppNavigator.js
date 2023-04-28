import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'
import PostDetail from '../screens/PostDetail'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import Signup from "../screens/Signup/Signup"


const Stack = createNativeStackNavigator();


const AppNavigator = () => {
  const navigation = useNavigation();
  return (
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} component={Home} name='Home' />
        <Stack.Screen options={{title: "", headerTransparent: true,
        headerShadowVisible: false,
        headerLeft: (props) => (
          <TouchableWithoutFeedback {...props} >
            <View style={{
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,  
            backgroundColor: "rgba(0,0,0,0.5)",
            }}>
            <Ionicons onPress={navigation.goBack} name="arrow-back" size={25} color="white" />
            </View>
          </TouchableWithoutFeedback>
        )
      }} component={PostDetail} name='PostDetail' />
      <Stack.Screen options={{headerShown: false}} component={Signup} name='Singup' />
      </Stack.Navigator>
  )
}

export default AppNavigator

const styles = StyleSheet.create({})
