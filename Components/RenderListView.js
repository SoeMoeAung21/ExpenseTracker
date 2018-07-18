import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, ScorllView, Image, TouchableHighlight, Dimensions } from 'react-native';
import { Actions, Router, Scene } from 'react-native-router-flux';
var device = Dimensions.get('window');

import styles from './ComponentStyle/RenderListViewStyle';

const instructions = Platform.select({

});


export default class RenderListView extends React.Component {

  constructor(props){
    super(props);
    this.state={
      category : this.props.category,
      amount: this.props.amount,
      percent: this.props.percent

    }
  }

  componentDidMount(){

  }



  render() {
    return (

        <View style={styles.renderTableViewStyle}>
          <Text style={styles.categoryLabelStyle}>{this.state.category}</Text>
          <View style={styles.secondView}>
            <Text style={styles.percentLabelStyle}>{this.state.percent}</Text>
            <Text style={styles.amountLabelStyle}>{this.state.amount}</Text>
          </View>
        </View>

    );
  }

  
}
