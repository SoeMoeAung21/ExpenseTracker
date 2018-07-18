import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Image,  AsyncStorage} from 'react-native';
import { Scene, Router, Actions, Modal, Tabs, Stack, Lightbox} from 'react-native-router-flux';

import OverAllView from './MainViews/OverAllView';
import AddExpense from './MainViews/SubViews/AddExpense';
import Expense from './MainViews/ExpenseView';
import Income from './MainViews/IncomeView';
import Report from './MainViews/ReportView';
import PickDate from './MainViews/SubViews/PickDate';
import Category from './MainViews/SubViews/Category';


import Images from './Theme/Images';

let ALLDATA = null

export default class App extends React.Component {

constructor(props){
  super(props);
  this.state={
    allDataFromApp : null
  }
}

  render() {

    if(!this.state.allDataFromApp){
      return (
        <Router>
          <Scene key='root' hideNavBar={true}>
            <Lightbox>
              <Modal>
                <Tabs activeTintColor='blue'>
                  <Scene key='overAll' initial={true} icon={({ focused })=>this.overAllTabIcon(focused, 1)} component={OverAllView} tabBarOnPress={()=>Actions.overAll({refresh: true})} title='OverAll'/>
                  <Scene key='expense' icon={({ focused })=>this.overAllTabIcon(focused, 2)}  component={Expense} title='Expense' onRight={()=>{}} rightTitle='+'/>
                  <Scene key='income' icon={({ focused })=>this.overAllTabIcon(focused, 3)} component={Income} title='Income' onRight={()=>{}} rightTitle='+'/>
                  <Scene key='report'  icon={({ focused })=>this.overAllTabIcon(focused, 4)} component={Report} title='Report'/>
                </Tabs>
                  <Scene key='addExpense' component={AddExpense} title={'Add New Transaction'} leftTitle='Cancel' onLeft={()=>this.cancel()} rightTitle='Save' onRight={()=>{}}/>
              </Modal>
                  <Scene key='pickDate' component={PickDate}/>
                  <Scene key='category' component={Category}/>
            </Lightbox>
          </Scene>
        </Router>
      );
    }else{
      return(
        <View>
          <Text> LOADING........ </Text>
        </View>
      )
    }
  }

 // onEnterSomeView(){
 //    AsyncStorage.getAllKeys((err, keys)=>{
 //       AsyncStorage.multiGet(keys,(err, stores)=>{
 //         this.setDataToSend(stores)
 //       })
 //     })
 //  }
 //
 //  setDataToSend(data){
 //    // this.setState({
 //    //   allDataFromApp: data
 //    // })
 //  }

  overAllTabIcon(selected, index){

    var color = selected ? 'blue' : 'gray';

    var iconImage;
    if(index === 1){
      iconImage = Images.overAllIcon
    }else if(index === 2){
      iconImage = Images.expenseIcon
    }else if(index === 3){
      iconImage = Images.incomeIcon
    }else{
      iconImage = Images.reportIcon
    }

    return(
      <Image source={iconImage} style={{tintColor: color}}/>
    )
  }


  cancel(){
    Actions.pop()
  }

  save(){
    alert('a')
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
