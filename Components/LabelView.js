import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, ScorllView, Image, TouchableHighlight, Dimensions } from 'react-native';
import { Actions, Router, Scene } from 'react-native-router-flux';
var device = Dimensions.get('window');

import styles from './ComponentStyle/LabelViewStyle';

const instructions = Platform.select({

});

export default class SwiperView extends React.Component {

  constructor(props){
    super(props);
    this.state={
      label : this.props.label,


    }
  }

  componentDidMount(){

  }

  render() {
    return (
      <View style={styles.mainContainerStyle}>



      </View>
    );
  }
}
