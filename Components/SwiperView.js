import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, ScorllView, Image, TouchableHighlight, Dimensions } from 'react-native';
import { Actions, Router, Scene } from 'react-native-router-flux';
var device = Dimensions.get('window');

import styles from './ComponentStyle/SwiperViewStyle';

const instructions = Platform.select({

});


export default class SwiperView extends React.Component {

  constructor(props){
    super(props);
    this.state={
      balanceText: this.props.balanceText,
      balance : this.props.balance,
      month: this.props.month,
      height: (device.height * 0.25) - 20,
      value: this.props.height
    }
  }

  componentDidMount(){

  }



  render() {
    return (
      <View style={[styles.swiperViewStyle,{backgroundColor: this.props.customColor, height: this.state.value ? this.state.value : this.state.height}]}>
        <Text style={styles.balanceLabelStyle}>{this.props.balanceText}</Text>
        <Text style={styles.balanceValueStyle}>{this.props.balance}</Text>
        <Text style={styles.monthLabelStyle}>{this.props.month}</Text>
      </View>
    );
  }



  button(){
    Actions.addTransaction()
  }
}
