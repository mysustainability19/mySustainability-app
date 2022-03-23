import React from 'react';
import {TextInput} from 'react-native';

var padding = window.location.href.toString().includes("Signup") ? 13 : 20;


function Faculty(props) {
  return (
    <TextInput
      required
      label="Faculty"
      placeholder="Faculty"
      placeholderTextColor="black"
      autoComplete=""
      onChangeText={text => props.onChangeText(text)}
      style={props.style}
    />
  );
}
export default Faculty;
