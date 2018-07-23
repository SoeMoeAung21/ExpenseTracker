import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, ScorllView, Image, TouchableHighlight, Dimensions, AsyncStorage } from 'react-native';
import { Actions, Router, Scene } from 'react-native-router-flux';
import AddButton from '../Components/AddButton';
import Swiper from 'react-native-swiper';
import Carousel from 'react-native-snap-carousel';
var device = Dimensions.get('window');

import SwiperView from '../Components/SwiperView';

import styles from './MainViewStyles/OverAllViewStyle';

var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
var OLDINDEX;

import Images from '../Theme/Images';

export default class OverAllView extends Component {

  constructor(props){
    super(props);
    var date = new Date();
    this.state={
      monthlyExpense: 0,
      monthlyIncome: 0,
      incomeData: [],
      expenseData: [],
      currentYear: date.getFullYear(),
      currentMonth: date.getMonth(),
      oldIndex: null,
      newIndex: null,
      oneYearData : []
    }
  }

  componentWillReceiveProps(nextProps){
    this.receiveAllData()
  }

  componentDidMount(){
    this.receiveAllData()
    var date = new Date()
    console.log(date.getFullYear());
    console.log(date.getMonth());
  }

  swiperScrollEnd(e, state, context) {
    this.setState({
      currentMonth : state.index
    })
  }

  render() {
    return (
      <View style={styles.overAllViewStyle}>
        <Image style={styles.backgroundImageStyle} source={Images.backgroundImage1} resizeMode='cover'/>
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
          <Swiper style={styles.swiperStyle} showsPagination={false} index={this.state.currentMonth} loop={false}
          onMomentumScrollEnd={(e, state, context)=>this.swiperScrollEnd(e, state, context)}>
            {this.renderCarouselItem()}
          </Swiper>

        </View>
        <View style={styles.containerViewStyle}>
          <TouchableHighlight onPress={()=>this.goToIncome()} underlayColor='transparent'>
            <View style={styles.incomeViewStyle}>
              <Text style={styles.incomeLabelStyle}>My Income</Text>
              <Text style={styles.incomeAmountLabelStyle}>{this.state.oneYearData.length ? this.state.oneYearData[this.state.currentMonth].income : ''}</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={()=>this.goToExpense()} underlayColor='transparent'>
            <View style={styles.expenseViewStyle}>
            <Text style={styles.incomeLabelStyle}>My Expense</Text>
            <Text style={styles.incomeAmountLabelStyle}>{this.state.oneYearData.length ? this.state.oneYearData[this.state.currentMonth].expense : ''}</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  renderCarouselItem(item){
    return this.state.oneYearData.map((item)=> {
        return(
          <SwiperView customColor= '#31A9B8' balanceText='My Balance' balance={item.balance} month={MONTHS[item.month - 1]} percent='50%'/>
        )
    })
  }

  receiveAllData(){
    var tempEachYearData=[]
    var tempOneYearData=[]
    var testBalance=[], testExp=[], testIncome = []
    var service = this;


      AsyncStorage.getAllKeys((err, keys)=>{
        AsyncStorage.multiGet(keys,(err, stores)=>{

          stores.map((result, i, store)=>{
            var key = store[i][0];
            var value = JSON.parse(store[i][1])
            if(value.year === this.state.currentYear){
              tempOneYearData.push(value)
            }
          })//end of stores loop

          var tempMonthIndex;
          for(tempMonthIndex=1; tempMonthIndex <= 12; tempMonthIndex++){
            var monthlyData=[]
            var monthlyIncome =0;
            var monthlyExpense=0

            tempOneYearData.map((item) => {
              if(item.month === tempMonthIndex){
                monthlyData.push(item)
              }

            })

            monthlyData.map((result) =>{
              if(result.type === 'expense'){
                monthlyExpense = monthlyExpense + parseInt(result.amount);
              }else{
                monthlyIncome = monthlyIncome + parseInt(result.amount);
              }
            })

            var tempObj ={
              'expense' : monthlyExpense,
              'income' : monthlyIncome,
              'balance' : monthlyIncome - monthlyExpense,
              'month' : tempMonthIndex
            };
            tempEachYearData.push(tempObj)

            testBalance.push(monthlyIncome - monthlyExpense)
            testExp.push(monthlyExpense)
            testIncome.push(monthlyIncome)
            console.log(monthlyExpense);
          }//end of for loop

          service.setState({
            oneYearData: tempEachYearData
          })
          console.log('&&&&&&&&&&oneYearData&&&&&&&&&');
          console.log(testExp);
        })

      })
  }

  decrease1Year(){
    this.setState({
      currentYear: this.state.currentYear - 1
    })
    this.receiveAllData()
  }

  increase1Year(){
    this.setState({
      currentYear: this.state.currentYear + 1
    })
    this.receiveAllData()
  }

  addIncomeData(){

  }

  goToIncome(){
    Actions.replace('income',{getIncomeData: (incomeData)=> this.getIncomeData(incomeData)})
  }
  goToExpense(){
    Actions.replace('expense')
  }

}//End of Class
