import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighLight, Dimensions} from 'react-native';
var device = Dimensions.get('window');

const styles = StyleSheet.create({
  overAllFlatlistStyle:{
    backgroundColor:'green'
  },
  flatListStyle:{
    backgroundColor: 'blue',
    borderWidth: 1,
    alignItems: 'center',
  },
  renderItemStyle:{
    width: device.width - 40,
    height: device.height * 0.07,
    borderRadius: ((device.width/ 3)- 20)* 0.5,
    backgroundColor: 'yellow',
    alignItems : 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginLeft: 14,
    marginBottom: 10,

  }
});

export default styles;
