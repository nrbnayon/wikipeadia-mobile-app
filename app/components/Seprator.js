import { StyleSheet,  View, Dimensions } from 'react-native'
import React from 'react'

const width = Dimensions.get("window").width - 20;

const Seprator = ({width = "100%", height = 1, backgroundColor = "#d3d3d3", style}) => {
  return (
    <View style={[styles.separator, {width, height, backgroundColor, alignSelf: "center" }, style]}/>
  )
}

export default Seprator

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: "#d3d3d3",
  },
});
