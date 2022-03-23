import React from 'react';
import {TextInput} from 'react-native';

var padding = window.location.href.toString().includes("Signup") ? 13 : 20;

function UserName() {
  return (
    <TextInput
      label="Username"
      //autoFocus
      placeholder="Username"
      placeholderTextColor="black"
      style={props.style}
    />
  );
}
export default UserName;
