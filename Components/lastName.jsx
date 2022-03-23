import React from 'react';
import {TextInput} from 'react-native';

var padding = window.location.href.toString().includes("Signup") ? 13 : 20;

function LastName() {
  return (
    <TextInput
      label="Last Name"
      //autoFocus
      placeholder="Last Name"
      placeholderTextColor="black"
      style={props.style}
    />
  );
}
export default LastName;
