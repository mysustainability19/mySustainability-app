import React from 'react';
import {TextInput} from 'react-native';

var padding = window.location.href.toString().includes("Signup") ? 13 : 20;

function School(props) {
  return (
    <TextInput
      required
      label="School"
      placeholder="School"
      placeholderTextColor="black"
      autoComplete=""
      onChangeText={text => props.onChangeText(text)}
      style={props.style}
    />
  );
}
export default School;
