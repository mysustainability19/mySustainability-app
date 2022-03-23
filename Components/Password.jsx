import React from 'react';
import {TextInput} from 'react-native';

var padding = window.location.href.toString().includes("Signup") ? 13 : 20;

function Password(props) {
  return (
    <TextInput
      label="Password"
      secureTextEntry={true} 
      placeholder="Password"
      placeholderTextColor="black"
      autoComplete="new-password"
      onChangeText={text => props.onChangeText(text)}
      style={props.style}
    />
  );
}
export default Password;
