import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighLight, Dimensions} from 'react-native';
var device = Dimensions.get('window');

const styles = StyleSheet.create({
  allViewStyle:{
    flex: 1,
    backgroundColor: 'gray'
  },
  backgroundImageStyle:{
    position: 'absolute',
    opacity: 0.45
  },
  firstContainerStyle:{
    backgroundColor: '#C4C4C4',
    borderTopWidth: 0.3,
    marginTop: 30,

    borderBottomWidth: 0.3,
    alignItems: 'center'
  },
  dateViewStyle:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 30,
    borderBottomWidth: 0.3,
    width: device.width - 20

  },
  dateLabelStyle:{
    fontFamily: 'Cochin',
    fontSize: 18,
  },
  selectedDateStyle:{
    fontFamily: 'Cochin',
    fontSize: 18,
    marginRight: 10
  },
  amountViewStyle:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 30,
    width: device.width - 20,
  },
  noteViewStyle:{
    marginTop: 30,
    backgroundColor: '#C4C4C4',
  },
  noteLabelStyle:{
    fontSize: 20,
    fontFamily:'Cochin',
    fontWeight: 'bold',
    marginLeft: 5
  },
  noteTextInputStyle:{
    height: 200,
    width: device.width - 50,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10
  }
});

export default styles;
