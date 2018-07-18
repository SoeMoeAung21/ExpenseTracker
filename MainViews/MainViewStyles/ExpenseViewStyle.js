import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighLight, Dimensions} from 'react-native';
var device = Dimensions.get('window');

const styles = StyleSheet.create({
  expenseViewStyle: {
    alignItems: 'center',
    //backgroundColor: 'yellow'
  },
  yearViewStyle:{
    marginTop: 5,
    flexDirection: 'row',
    justifyContent:'center',
  },
  yearFontStyle:{
    fontSize: 20,
    fontFamily: 'Cochin',
    fontWeight: 'bold',
    shadowOffset:{  width: 10,  height: 5},
    shadowColor: '#555555',
    shadowOpacity: 0.45,
  },
  swiperContainer: {
    height: (device.height * 0.25) + 40,
  },
  flatListContainer: {
    //marginTop: 0,
    height: (device.height * 0.75) - 178
  },
  swiperStyle:{
    //backgroundColor:'green'
  },
  flatListStyle:{
    width: device.width,
    // backgroundColor: 'red',

    //borderRadius: 10,
  },
  flatListContentStyle:{

  },
  backgroundImageStyle:{
    position: 'absolute',
    width : device.width,
    height: device.height,
    opacity: 0.45
  },
});

export default styles;
