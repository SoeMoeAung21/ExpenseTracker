import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, ScorllView, Image, TouchableHighlight } from 'react-native';
import { Actions, Router, Scene } from 'react-native-router-flux';



const instructions = Platform.select({

});


export default class AddButton extends React.Component {

  constructor(props){
    super(props);
    this.state={
      nameOfButton : this.props.buttonName,

    }
  }

  componentDidMount(){

  }



  render() {
    return (
      <TouchableHighlight onPress={()=>this.button()} underlayColor='transparent'>
        <View style={styles.buttonViewStyle}>
          <Text style={styles.buttonTextStyle}>{this.state.nameOfButton}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  button(){
    Actions.addTransaction()
  }
}
const styles = StyleSheet.create({
buttonViewStyle:{
  alignItems: 'center',
  justifyContent: 'center',
  width: 100,
  height: 40,
  borderWidth: 1,
  borderRadius: 10,
  marginLeft: 30,
},
buttonTextStyle:{
  fontSize: 14,
  fontWeight: 'bold'
}

});
