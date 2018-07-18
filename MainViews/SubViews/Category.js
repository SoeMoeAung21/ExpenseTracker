import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, View, FlatList, ScorllView, Image, TouchableHighlight, KeyboardAvoidingView, Picker, AsyncStorage } from 'react-native';
import { Actions, Router, Scene } from 'react-native-router-flux';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';



import styles from './SubViewStyles/CategoryStyle';
var IncomeCategory =[
                      {
                        catName: 'Salary'
                      },
                      {
                        catName: 'Bonus'
                      },
                      {
                        catName: 'Incentive'
                      },
                      {
                        catName: 'Other Incomes'
                      }
                    ];

var ExpenseCategory =[
                      {
                        catName: 'Food'
                      },
                      {
                        catName: 'Leisure'
                      },
                      {
                        catName: 'Clothing'
                      },
                      {
                        catName: 'Household Items'
                      },
                      {
                        catName: 'Bill'
                      }
                    ]


export default class PickDate extends React.Component {

  constructor(props){
    super(props);
    this.state={
      categoryType: this.props.categoryType,
      mainCategory: []
    }
  }

  componentDidMount(){
    this.choosingMainCategory()
  }

  render() {
    return (
      <FlatList
        style={styles.overAllFlatlistStyle}
        contentContainerStyle={styles.flatListStyle}
        data={this.state.mainCategory}
        renderItem={({item})=>this.renderListItem(item)}
        horizontal={false}
        keyExtractor={(item, index) => index}
      />
    );
  }

  renderListItem(item){
    return(
      <TouchableHighlight onPress={()=>this.pickingCategory(item)} underlayColor='transparent'>
      <View style={styles.renderItemStyle}>
        <Text style={styles.catNameStyle}>{item.catName}</Text>
      </View>
      </TouchableHighlight>
    )
  }

  pickingCategory(item){
      Actions.pop()
        this.props.choosingCategory(item.catName)
      }

    renderPickerItem(){
    return Category.map((item) => {
      return(
        <Picker.Item label={item.catName} value={item.catName} />
      )
    })
  }


  choosingMainCategory(){
    var service = this

    if (this.state.categoryType === 'income'){
      service.setState({
        mainCategory: IncomeCategory
      })
    }else{
      service.setState({
        mainCategory: ExpenseCategory
      })
    }
  }


}//End of Class
