import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighLight, Dimensions} from 'react-native';
var device = Dimensions.get('window');

const styles = StyleSheet.create({
  swiperViewStyle:{
    backgroundColor: 'blue',
    width: device.width - 50,
    marginTop: 20,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset:{  width: 10,  height: 10},
    shadowColor: '#555555',
    shadowOpacity: 0.45,
  },
  balanceLabelStyle: {
    fontSize: 35,
    bottom : 35,
    fontFamily: 'Cochin',
    fontWeight: 'bold',
    color: 'white'
  },
  balanceValueStyle:{
    fontSize: 24,
    fontFamily: 'Cochin',
    color: 'white',
    fontWeight:'bold',

  },
  monthLabelStyle:{
    fontSize: 19,
    fontFamily: 'Cochin',
    color: 'white',
    top: 10,
    right: ((device.width - 50)/2)-60
  }
});

export default styles;
