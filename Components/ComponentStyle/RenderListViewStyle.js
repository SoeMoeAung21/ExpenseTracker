import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighLight, Dimensions} from 'react-native';
var device = Dimensions.get('window');

const styles = StyleSheet.create({
  renderTableViewStyle:{
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#F5BE41',
    borderRadius: 15,
    width: device.width - 40,
    alignSelf:'center',
    shadowOffset:{  width: 10,  height: 5},
    shadowColor: '#555555',
    shadowOpacity: 0.45,
  },
  categoryLabelStyle:{
    fontFamily:'Cochin',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 5
  },
  secondView:{
    flexDirection:'row'
  },
  percentLabelStyle:{
    fontFamily: 'Cochin',
    fontSize: 16,
    marginLeft: 5,
    width: 100
  },
  amountLabelStyle:{
    fontFamily: 'Cochin',
    fontSize: 16,
    textAlign: 'right',
    width: 100,

    marginLeft: device.width - 270
  },
  bigCardLabelViewStyle:{
    flexDirection: 'row',
  },
  flatListItemStyle:{
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: 'orange',
    borderRadius: 15,
    width: device.width - 40,
    alignSelf:'center',
    shadowOffset:{  width: 10,  height: 5},
    shadowColor: '#555555',
    shadowOpacity: 0.45,
  },
  categoryLabelStyle:{
    fontFamily:'Cochin',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 5
  },
  valueViewStyle:{
    marginLeft: 30
  }
});

export default styles;
