import React from 'react';
import {TextInput} from 'react-native';


function Email(props) {
  return (
    <TextInput
      required
      label="Email"
      placeholder="Email"
      placeholderTextColor="black"
      autoComplete="new-password"
      onChangeText={text => props.onChangeText(text)}
      style={props.style}
    />
  );
}
export default Email;
