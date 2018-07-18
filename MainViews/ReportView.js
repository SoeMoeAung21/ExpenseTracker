import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, ScorllView, Image, TouchableHighlight, Dimensions, AsyncStorage} from 'react-native';
import { Actions, Router, Scene } from 'react-native-router-flux';
import AddButton from '../Components/AddButton.js';
import LabelView from '../Components/LabelView.js'
import { BarChart, Grid, XAxis, YAxis } from 'react-native-svg-charts'
var device = Dimensions.get('window');
import styles from './MainViewStyles/ReportViewStyle.js';

var MONTHS = ['Jan', 'Feb', 'Mar', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

var labelData = [
                  {
                    key : 1,
                    label: 'OverAll',
                  },
                  {
                    key: 2,
                    label: 'Expense'
                  },
                  {
                    key: 3,
                    label: 'Income'
                  }
                ]
export default class ReportView extends React.Component {

  constructor(props){
    super(props);
    var date = new Date();
    this.state={
      selectedLabelKey: 1,
      annualBalance: [],
      annualIncome: [],
      annualExpense: [],
      data: [0,0,0,0,0,0,0,0,0,0,0,0],
      currentYear: date.getFullYear(),
      currentMonth: date.getMonth(),
    }
  }

  componentDidMount(){
    this.receiveAllData()
  }

  render() {
    const data = [{balance: 12}, {balance: 11}, {balance: 10}, {balance: 9}, {balance: 99}, {balance: 0}, {balance: 0}, {balance: 0}, {balance: 0},{balance: 0},{balance: 0},{balance: 0},]
    const contentInset = { top: 20, bottom: 20 }

    return (
        <View style={styles.mainContainerStyle}>
          <View style={styles.labelViewStyle}>
            {this.pickLabel()}
          </View>
          <View style={styles.barChartViewStyle}>
            <View style={styles.secondBarChatViewStyle}>
                <YAxis
                    style={styles.yAxisStyle}
                    data={ this.state.data }
                    contentInset={ contentInset }
                    svg={{
                        fill: 'red',
                        fontSize: 10,
                    }}
                    numberOfTicks={ 10 }
                    formatLabel={ value => `${value}k` }
                />
                <BarChart
                    style={styles.barChatStyle}
                    data={ this.state.data }
                    svg={{ stroke: 'rgb(0, 255, 0)' }}
                    contentInset={ contentInset }
                >
                    <Grid/>
                </BarChart>
              </View>
                <XAxis
                    style={styles.xAsisStyle}
                    data={ this.state.data }
                    formatLabel={ (value, index) => MONTHS[index]}
                    contentInset={{ left: 10, right: 10 }}
                    svg={{ fontSize: 10, fill: 'black' }}
                />
          </View>
        </View>
    );
  }

  pickLabel(){
    return labelData.map((item)=>{
      return (
        <TouchableHighlight onPress={()=>this.pressingLabel(item)} underlayColor= 'transparent'>
        <View style={this.getLabelViewStyle(item.key)}>
          <Text style={this.getLabelTextStyle(item.key)}>{item.label}</Text>
        </View>
        </TouchableHighlight>
      )
    })
  }

  getLabelTextStyle(key){
    var tempColor = 'white';
    var tempFontSize = 20

    if (this.state.selectedLabelKey === key){
      tempColor = 'blue',
      tempFontSize = 22
    }
    return(
      {
        fontWeight: 'bold',
        fontFamily: 'Cochin',
        color: tempColor,
        fontSize: tempFontSize,
      }
    )
  }

  getLabelViewStyle(key){
    var tempWidth= (device.width/3) - 10;
    var tempHeight= 40;
    var tempBGC = 'gray';

    if (this.state.selectedLabelKey === key){
      tempWidth= (device.width/3),
      tempHeight= 45,
      tempBGC= 'black'
    }
    return(
      {
        backgroundColor: tempBGC,
        width: tempWidth,
        height: tempHeight,
        justifyContent:'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        shadowOffset:{  width: 5,  height: 5},
        shadowColor: '#555555',
        shadowOpacity: 0.45,
      }
    )
  }

  pressingLabel(item){
    this.setState({
      selectedLabelKey : item.key
    })
    if(item.key === 1){
      this.setState({
        data : this.state.annualBalance
      })
      console.log(this.state.data);
    }else if(item.key === 2){
      this.setState({
        data : this.state.annualExpense
      })
    }else {
      this.setState({
        data : this.state.annualIncome
      })
    }

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

            testBalance.push((monthlyIncome - monthlyExpense)/100000)
            testExp.push((monthlyExpense)/100000)
            testIncome.push((monthlyIncome)/100000)
            console.log(monthlyExpense);
          }//end of for loop

          service.setState({
            annualBalance: testBalance,
            annualIncome: testIncome,
            annualExpense: testExp,
          })
          console.log('&&&&&&&&&&oneYearData&&&&&&&&&');
          console.log(testBalance);
          console.log(testIncome);
          console.log(testExp);
          console.log(this.state.annualBalance);
          console.log(this.state.annualIncome);
          console.log(this.state.annualExpense);
          service.pressingLabel({key: 1})

        })

      })
  }

}//End of Class
