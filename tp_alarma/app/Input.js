import React, {Component} from "react"
import{ 
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableHighlight
} from "react-native";

import DatePicker from "react-native-datepicker";

export default class Input extends Component{
   
    render(){
            return(
                <View>
                    <TextInput 
                    placeholder="title"
                    style={styles.Input}
                    onChangeTitle={(title)=>this.props.onChangeTitle(title)}
                    />
                    <DatePicker mode= "datetime"
                    placeholder="date"
                    format= "YYYY-MMM-DD HH:mm"
                    minDate="2020-01-01"
                    maxDate="2050-01-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onChangeDate={(date)=>this.props.onChangeDate(date)}
                    />
                        
                    
                    


                </View>
            )
        }            
    }

const styles = StyleSheet.create({
    Input:{


    }

})
