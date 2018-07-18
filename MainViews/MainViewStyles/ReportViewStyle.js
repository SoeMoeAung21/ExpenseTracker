import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighLight, Dimensions} from 'react-native';
var device = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainerStyle:{

  },
  labelViewStyle:{
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  eachTextLabelStyle:{
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Cochin'
  },
  barChartViewStyle:{
    padding: 10
  },
  secondBarChatViewStyle:{
    height: 400,
    flexDirection: 'row'
  },
  yAxisStyle:{
    width: 22
  },
  barChatStyle:{
    flex: 1,
    marginLeft: 16
  },
  xAsisStyle:{
    marginLeft: 31,
    marginHorizontal: 0,
  }
});

export default styles;
