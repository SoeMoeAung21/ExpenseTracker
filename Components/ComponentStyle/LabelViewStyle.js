import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighLight, Dimensions} from 'react-native';
var device = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainerStyle:{
    borderRadius: 10,
    padding: 5
  },
  eachLabelViewStyle:{
    width: (device.width/3) - 10,
    height: 40,
    backgroundColor: 'gray',
    justifyContent:'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,

  },
  eachTextLabelStyle:{
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Cochin'
  }
});

export default styles;
