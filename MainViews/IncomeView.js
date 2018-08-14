import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, ScorllView, Image, TouchableHighlight, Dimensions, AsyncStorage } from 'react-native';
import { Actions, Router, Scene } from 'react-native-router-flux';
import Swiper from 'react-native-swiper';

import SwiperView from '../Components/SwiperView';
import RenderListView from '../Components/RenderListView';

var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
import Images from '../Theme/Images';


import styles from './MainViewStyles/ExpenseViewStyle';

const instructions = Platform.select({

});


export default class Income extends React.Component {

  constructor(props){
    super(props);
    var date = new Date();
    this.state={
      oneYearIncomeData : [],
      incomeData :[],
      currentYear: date.getFullYear(),
      currentMonth: date.getMonth(),
      monthlyIncome: 0,
      height: 80,
      bigCardValue: false
    }
  }

  componentDidMount(){
    Actions.refresh({onRight : () => this.addIncome()})
    this.retrieveAllIncomeTransaction()
    var date = new Date()
  }

  swiperScrollEnd(e, state, context) {
    this.setState({
      currentMonth : state.index,
      incomeData: null,
      monthRefreshing: true,
    })
    var service = this
    setTimeout(function(){
      service.changeMonthlyData(state.index)
    }, 0)

  }

  changeMonthlyData(index){
    this.setState({
      monthRefreshing: false,
      incomeData: this.state.oneYearIncomeData[index].monthlyData,
      monthlyIncome: this.state.oneYearIncomeData[index].total
    })
  }

  render() {
    return (
      <View style={styles.expenseViewStyle}>
        <Image style={styles.backgroundImageStyle} source={Images.backgroundImage3} resizeMode='cover'/>
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
          {this.state.monthRefreshing ? this.renderLoading() : this.renderFlatListView()}

        </View>
      </View>
    );
  }
  
  renderLoading(){
    return(
      <View>
      </View>
    )
  }

  renderFlatListView(){
    return(
      <FlatList style={styles.flatListStyle} contentContainerStyle={styles.flatListContentStyle}
        data={this.state.incomeData}
        renderItem={({item})=>this.renderListItem(item)}
        keyExtractor={(item, index) => index}
        horizonal={true}
        extraData={this.state}
      />
    )
  }

  renderCarouselItem(){


    return this.state.oneYearIncomeData.map((item)=> {

        return(
          <SwiperView customColor= '#258039' balanceText='Total Income' balance={item.total} month={MONTHS[item.month - 1]} percent=''/>
        )
    })

  }

  renderListItem(item){
    var percentLabel = (item.amount/this.state.monthlyIncome) * 100
    percentLabel = percentLabel.toFixed(2);


    return(
      <TouchableHighlight onPress={()=>this.detailView(item)} underlayColor='transparent'>
        <RenderListView  item={item} date={item.date} category={item.category} amount={item.amount} percent ={percentLabel + '%'} bigCard={item.bigCard}/>
      </TouchableHighlight>

    )
  }

  retrieveAllIncomeTransaction(){
    var tempEachYearIncomeData =[];

    var tempOneYearIncomeData =[];

    var tempIncome = [];
    var service = this
      AsyncStorage.getAllKeys((err, keys)=>{
        AsyncStorage.multiGet(keys,(err, stores)=>{
          stores.map((result, i, store)=>{
            var key = store[i][0];
            var value = JSON.parse(store[i][1])
            if(value.year === this.state.currentYear){
              tempOneYearIncomeData.push(value)
            }
          })

          var tempMonthIndex;
          var tempTotalSavedItem = []
          for(tempMonthIndex=1; tempMonthIndex <= 12; tempMonthIndex++){
            var tempMonthlyIncomeData = [];
            var monthlyTotalIncome = 0
            var keyId = 0
            tempOneYearIncomeData.map((item) => {
              if(item.month === tempMonthIndex && item.type === 'income'){
                item.bigCard = false
                item.keyId = keyId
                keyId++;
                tempMonthlyIncomeData.push(item)
                monthlyTotalIncome = monthlyTotalIncome + parseInt(item.amount)
              }
            })

            var eachMonthTotal = {
              total : monthlyTotalIncome,
              month : tempMonthIndex,
              monthlyData : tempMonthlyIncomeData
            }

            tempTotalSavedItem.push(eachMonthTotal)

          }//end of for loop

          service.setState({
            incomeData : tempTotalSavedItem[this.state.currentMonth].monthlyData,
            monthlyIncome : tempTotalSavedItem[this.state.currentMonth].total,
            oneYearIncomeData : tempTotalSavedItem
          })

        })
      })
  }


  detailView(item){

    this.setState({
      bigCardValue: !this.state.bigCardValue
    })

    item.bigCard = this.state.bigCardValue


  }
  decrease1Year(){
    this.setState({
      currentYear: this.state.currentYear - 1
    })
    this.retrieveAllIncomeTransaction()
  }

  increase1Year(){
    this.setState({
      currentYear: this.state.currentYear + 1
    })
    this.retrieveAllIncomeTransaction()
  }


  refreshData(){
    this.setState({
      incomeData : []
    })
    this.retrieveAllIncomeTransaction()
  }


addIncome(){
  Actions.addExpense({refreshData: ()=> this.refreshData(), categoryType: "income"})
}

}//End of Class
