//funciones y componentes

import React, {Component} from "react";
import{ 
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator
} from "react-native";

import index from "./app/index"

export default class formsApp extends Component{
    renderScene(route, Navigator){
        return(
            <index />
        )
    }
    render(){
            return(
                <Navigator 
                renderScene={this.renderScene}/>
            );
        }            
    }

AppRegistry.registerComponent("formsApp", () => formsApp);