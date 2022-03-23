import React from 'react';
import {TextInput} from 'react-native';

var padding = window.location.href.toString().includes("Signup") ? 13 : 20;

function ZID(props) {
  return (
    <TextInput
      required
      label="ZID"
      placeholder="ZID"
      placeholderTextColor="black"
      autoComplete=""
      onChangeText={text => props.onChangeText(text)}
      style={props.style}
    />
  );
}
export default ZID;
