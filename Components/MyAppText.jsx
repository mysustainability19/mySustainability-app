import React, { useEffect } from "react";
import {globalDebug} from './consoleBlocking';
import { Text, StyleSheet } from "react-native";
globalDebug(false,true);

export default function MyAppText (props){

    return (
        <Text style={[styles.defaultStyle, props.style]}>
          {props.children}
        </Text>
    );
  
}
const styles = StyleSheet.create({
  // ... add your default style here
  defaultStyle: {
    fontFamily: 'Clancy, sans-serif !important'
  },
});
//style={[styles.defaultStyle, props.style]}