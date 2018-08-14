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
      percent: this.props.percent,
      height : this.props.height,
      subCategory: this.props.subCategory,
      note: this.props.note,
      date: this.props.date,
      bigCard: this.props.bigCard
    }
  }

  componentDidMount(){

  }



  render() {
    if (this.props.item.bigCard === false){
      return (

          <View style={styles.renderTableViewStyle}>
            <Text style={styles.categoryLabelStyle}>{this.state.category}</Text>
            <View style={styles.secondView}>
              <Text style={styles.percentLabelStyle}>{this.state.percent}</Text>
              <Text style={styles.amountLabelStyle}>{this.state.amount}</Text>
            </View>
          </View>

      );
    }else{
      return(
        <View style={styles.flatListItemStyle}>
          <Text style={styles.categoryLabelStyle}>{this.state.category}</Text>
          <View style={styles.bigCardLabelViewStyle}>
            <View>
              <Text>Date :</Text>
              <Text>Amount :</Text>
              <Text>subCategory :</Text>
              <Text>Note :</Text>
            </View>
            <View style={styles.valueViewStyle}>
              <Text>{this.state.date}</Text>
              <Text>{this.state.amount}</Text>
              <Text>{this.props.subCategory ? this.props.subCategory : 'No Entered!'}</Text>
              <Text>{this.props.note ? this.props.note : 'No Entered!'}</Text>
          </View>
          </View>
        </View>
      )
    }
  }


}
