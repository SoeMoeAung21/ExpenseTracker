import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighLight, Dimensions} from 'react-native';
var device = Dimensions.get('window');

const styles = StyleSheet.create({

  swiperContainer:{
    height: (device.height * 0.25) + 20,
    alignItems:'center',
    justifyContent:'center'
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
  carouselStyle:{
    width: device.width,
    height: (device.height * 0.25) + 40,
    backgroundColor: 'yellow'
  },
  renderCarouselItemStyle:{
    width: device.width - 60,
    height: (device.height * 0.25),
    backgroundColor: '#31A9B8',
    borderRadius: 10,
    shadowOffset:{  width: 10,  height: 10},
    shadowColor: '#555555',
    shadowOpacity: 0.45,
  },
  containerViewStyle:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent : 'space-between',
    marginTop: 30
  },
  backgroundImageStyle:{
    position: 'absolute',
    width : device.width,
    height: device.height,
    opacity: 0.45
  },
  incomeViewStyle:{
    backgroundColor: '#258039',
    width: (device.width / 2) - 15,
    height: (device.height * 0.45),
    alignItems: 'center',
    justifyContent : 'center',
    marginLeft: 10,
    shadowOffset:{  width: 10,  height: 10},
    shadowColor: '#555555',
    shadowOpacity: 0.45,
    borderRadius: 10
  },
  incomeLabelStyle:{
    fontSize: 35,
    bottom: 30,
    fontFamily: 'Cochin',
    fontWeight: 'bold',
    color: 'white'
  },
  incomeAmountLabelStyle:{
    fontSize: 24,
    top: 30,
    fontFamily: 'Cochin',
    color: 'white',
    fontWeight:'bold',
  },
  expenseViewStyle:{
    backgroundColor: '#CF3721',
    width: (device.width / 2) - 15,
    height: (device.height * 0.45),
    alignItems: 'center',
    justifyContent : 'center',
    marginRight: 10,
    shadowOffset:{  width: 10,  height: 10},
    shadowColor: '#555555',
    shadowOpacity: 0.45,
    borderRadius: 10
  },


});

export default styles;
