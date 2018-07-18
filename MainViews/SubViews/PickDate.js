import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, View, FlatList, ScorllView, Image, TouchableHighlight, KeyboardAvoidingView, Dimensions, AsyncStorage } from 'react-native';
import { Actions, Router, Scene } from 'react-native-router-flux';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
var device = Dimensions.get('window');



// import styles from './SubViewStyles/AddTransactionStyle';




export default class PickDate extends React.Component {

  constructor(props){
    super(props);
    this.state={

    }
  }

  componentDidMount(){

  }

  render() {
    return (
      <Calendar
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          height: device.height * 3/7,
        }}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          arrowColor: 'orange',
          monthTextColor: 'blue',
          textMonthFontWeight: 'bold',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16
        }}
        onDayPress={(day) => this.selectDate(day)}
        hideExtraDays={true}
      />
    );
  }

selectDate(day){
  this.props.choosingDate(day)
  // this.props.saveTransaction(day.timestamp)
  console.log(day);
  Actions.pop()
}

}//End of Class
