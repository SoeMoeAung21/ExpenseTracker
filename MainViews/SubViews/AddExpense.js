import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, View, FlatList, ScorllView, Image, TouchableHighlight, KeyboardAvoidingView, AsyncStorage, Alert } from 'react-native';
import { Actions, Router, Scene } from 'react-native-router-flux';


import styles from './SubViewStyles/AddTransactionStyle';

import Images from '../../Theme/Images';

export default class AddTransaction extends React.Component {

  constructor(props){
    super(props);
    this.state={
      date: 'Choose date',
      category: 'Choose Category',
      month: null,
      amount : null,
      noteText: null,
      subCategory: null,
      timestamp: null,
      categoryType: this.props.categoryType,
    }
  }

  componentDidMount(){
     Actions.refresh({onRight : () => this.saveTransaction()})

     this.receivingIncomeData()
  }

  render() {
    return (
        <View style={styles.allViewStyle} >
        <Image source={Images.backgroundImage} style={styles.backgroundImageStyle}/>
          <View style={styles.firstContainerStyle}>
            <TouchableHighlight onPress={()=>this.pressDate()} underlayColor='transparent'>
              <View style={styles.dateViewStyle}>
                <Text style={styles.dateLabelStyle}>Date</Text>
                <Text style={styles.selectedDateStyle}>{this.state.date}</Text>
              </View>
            </TouchableHighlight>
            <View style={styles.amountViewStyle}>
              <Text style={styles.dateLabelStyle}>Amount</Text>
              <TextInput style={styles.selectedDateStyle}
                onChangeText={(amount) => this.setState({amount})}
                value={this.state.amount}
                keyboardType='numeric'
                placeholder='Enter Amount'
              />
            </View>
          </View>
          <View style={styles.firstContainerStyle}>
            <TouchableHighlight onPress={()=>this.pressCategory()} underlayColor='transparent'>
              <View style={styles.dateViewStyle}>
                <Text style={styles.dateLabelStyle}>Category</Text>
                <Text style={styles.selectedDateStyle}>{this.state.category}</Text>
              </View>
            </TouchableHighlight>

              <View style={styles.amountViewStyle}>
                <Text style={styles.dateLabelStyle}>Subcategory</Text>
                <TextInput style={styles.selectedDateStyle}
                  onChangeText={(subCategory) => this.setState({subCategory})}
                  value={this.state.subCategory}
                  placeholder='Optional'
                />
              </View>

          </View>
            <View style={styles.noteViewStyle}>
              <Text style={styles.noteLabelStyle}>Note</Text>
              <TextInput
                style={styles.noteTextInputStyle}
                multiline = {true}
                numberOfLines = {4}
                onChangeText={(noteText) => this.setState({noteText})}
                value={this.state.noteText}
                placeholder= 'Add Note'
              />
            </View>
        </View>
    );
  }

  choosingCategory(selectedCategory){
    this.setState({
      category : selectedCategory
    })
  }

  choosingDate(selectedDate){
    var day = new Date(selectedDate.timestamp);
    day = day.toLocaleDateString("en-GB")
    this.setState({
      date : day,
      month: selectedDate.month,
      timestamp : selectedDate.timestamp,
      year: selectedDate.year
    })
  }

  saveTransaction(){
    var expense ={}
    var date = new Date().valueOf();
    expense.keyId = 'id' + date
    expense.date = this.state.date
    expense.month = this.state.month
    expense.year = this.state.year
    expense.amount = this.state.amount
    expense.category = this.state.category
    expense.subCategory = this.state.subCategory
    expense.note = this.state.noteText
    expense.type = this.state.categoryType

    AsyncStorage.setItem(expense.keyId, JSON.stringify(expense), () => {
      Alert.alert(

        'Saved',
        'Your Expense is successfully saved.',
        [
          {text: 'Okay', onPress: () =>  {this.props.refreshData(); Actions.pop();} },
          { cancelable: false }
        ]

      )

    });

  }

receivingIncomeData(){
  this.setState({
    incomeCategory: this.props.incomeData
  })

}

  pressDate(){
    Actions.pickDate({choosingDate: (date)=>this.choosingDate(date)})
  }
  pressCategory(){
    Actions.category({choosingCategory: (category)=>this.choosingCategory(category),categoryType: this.state.categoryType})
  }


}//End of Class
