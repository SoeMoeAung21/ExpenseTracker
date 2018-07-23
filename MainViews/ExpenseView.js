import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, ScorllView, Image, TouchableHighlight, Dimensions, AsyncStorage } from 'react-native';
import { Actions, Router, Scene } from 'react-native-router-flux';
import Swiper from 'react-native-swiper';

import SwiperView from '../Components/SwiperView';
import RenderListView from '../Components/RenderListView';
import Images from '../Theme/Images';


var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

import styles from './MainViewStyles/ExpenseViewStyle';

const instructions = Platform.select({

});


export default class Expense extends React.Component {

  constructor(props){
    super(props);
    var date = new Date();
    this.state={
      oneYearExpenseData: [],
      expenseData : [],
      currentYear: date.getFullYear(),
      currentMonth: date.getMonth(),
      monthlyExpense: 0,
      height: 80,
      bigCardValue: false
    }
  }

  componentDidMount(){
    Actions.refresh({onRight : () => this.addExpense()})
    this.retrieveAllExpenseTransaction()
  }

  swiperScrollEnd(e, state, context) {
    this.setState({
      currentMonth : state.index,
      expenseData: this.state.oneYearExpenseData[state.index].monthlyData
    })
  }

  render() {
    return (
      <View style={styles.expenseViewStyle}>
        <Image style={styles.backgroundImageStyle} source={Images.backgroundImage2} resizeMode='cover'/>
          <View style={styles.yearViewStyle}>
            <TouchableHighlight onPress={()=>this.decrease1Year()} underlayColor='transparent'>
              <Text style={styles.yearFontStyle}> - </Text>
            </TouchableHighlight>
              <Text style={styles.yearFontStyle}>{this.state.currentYear}</Text>
            <TouchableHighlight onPress={()=>this.increase1Year()} underlayColor='transparent'>
              <Text style={styles.yearFontStyle}> + </Text>
            </TouchableHighlight>
          </View>
        <View style={styles.swiperContainer}>
          <Swiper style={styles.swiperStyle} showsPagination={false} showsButtons={false} index={this.state.currentMonth} loop={false}
          onMomentumScrollEnd={(e, state, context)=>this.swiperScrollEnd(e, state, context)}>
            {this.renderCarouselItem()}
          </Swiper>
        </View>
        <View style={styles.flatListContainer}>
          <FlatList style={styles.flatListStyle} contentContainerStyle={styles.flatListContentStyle}
            data={this.state.expenseData}
            renderItem={({item})=>this.renderListItem(item)}
            keyExtractor={(item, index) => index}
            horizonal={true}
          />
        </View>
      </View>
    );
  }

  renderCarouselItem(item){
    return this.state.oneYearExpenseData.map((item)=> {
        return(
          <SwiperView customColor= '#CF3721' balanceText='Total Expense' balance={item.total} month={MONTHS[item.month - 1]} percent='50%'/>
        )
    })
  }

  renderListItem(item){

    var percentLabel = (item.amount/this.state.monthlyExpense) * 100
    percentLabel = percentLabel.toFixed(2);
  
    return(
      <TouchableHighlight onPress={()=>this.detailView(item)} underlayColor='transparent'>
        <RenderListView  item={item} date={item.date} category={item.category} amount={item.amount} percent ={percentLabel + '%'} bigCard={item.bigCard}/>
      </TouchableHighlight>
    )
  }

  retrieveAllExpenseTransaction(){
    var tempEachYearExpenseData =[];

    var tempOneYearExpenseData =[];

    var tempExpense = [];
    var service = this
      AsyncStorage.getAllKeys((err, keys)=>{
        AsyncStorage.multiGet(keys,(err, stores)=>{
          stores.map((result, i, store)=>{
            var key = store[i][0];
            var value = JSON.parse(store[i][1])
            if(value.year === this.state.currentYear){
              tempOneYearExpenseData.push(value)
            }
          })

          var tempMonthIndex;
          var tempTotalSavedItem = []
          for(tempMonthIndex=1; tempMonthIndex <= 12; tempMonthIndex++){
            var tempMonthlyExpenseData = [];
            var monthlyTotalExpense = 0
            var keyId = 0
            tempOneYearExpenseData.map((item) => {
              if(item.month === tempMonthIndex && item.type === 'expense'){
                item.bigCard = false
                item.keyId = keyId
                keyId++;
                tempMonthlyExpenseData.push(item)
                monthlyTotalExpense = monthlyTotalExpense + parseInt(item.amount)
              }
            })

            var eachMonthTotal = {
              total : monthlyTotalExpense,
              month : tempMonthIndex,
              monthlyData : tempMonthlyExpenseData
            }

            tempTotalSavedItem.push(eachMonthTotal)

          }//end of for loop

          service.setState({
            expenseData : tempTotalSavedItem[this.state.currentMonth].monthlyData,
            monthlyExpense : tempTotalSavedItem[this.state.currentMonth].total,
            oneYearExpenseData : tempTotalSavedItem
          })

        })
      })
  }

  detailView(item){

    // var TempMonthlyToEdit = this.state.expenseData
    // TempMonthlyToEdit.map((oneItem)=>{
    //   if(oneItem.keyId === item.keyId){
    //     oneItem.bigCard = true
    //   }else{
    //     oneItem.bigCard = false
    //   }
    // })
    //
    // this.setState({
    //   expenseData : TempMonthlyToEdit
    // })
    this.setState({
      bigCardValue: !this.state.bigCardValue
    })

    item.bigCard = this.state.bigCardValue


  }

  decrease1Year(){
    this.setState({
      currentYear: this.state.currentYear - 1
    })
    this.retrieveAllExpenseTransaction()
  }

  increase1Year(){
    this.setState({
      currentYear: this.state.currentYear + 1
    })
    this.retrieveAllExpenseTransaction()
  }

  refreshData(){
    this.setState({
      expenseData : []
    })
    this.retrieveAllExpenseTransaction()
  }

  addExpense(){
    Actions.addExpense({refreshData: () => this.refreshData(), categoryType: "expense"})
  }


}//End of Class
