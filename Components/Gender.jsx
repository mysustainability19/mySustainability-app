import React from 'react';
import {TextInput} from 'react-native';

var padding = window.location.href.toString().includes("Signup") ? 13 : 20;


function Gender(props) {
  return (
    <TextInput
      required
      label="Gender"
      placeholder="Gender"
      placeholderTextColor="black"
      autoComplete=""
      onChangeText={text => props.onChangeText(text)}
      style={props.style}
    />
  );
}
export default Gender;
