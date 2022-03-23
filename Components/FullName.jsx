import React from 'react';
import {TextInput} from 'react-native';


function FullName(props) {
  return (
    <TextInput
      label="Full Name"
      placeholder="Full Name"
      placeholderTextColor="black"
      autoComplete="new-password"
      onChangeText={text => props.onChangeText(text)}
      style={props.style}
    />
  );
}
export default FullName;
