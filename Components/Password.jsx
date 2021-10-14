import React from 'react';
import {TextInput} from 'react-native';

function Password(props) {
  return (
    <TextInput
      label="Password"
      secureTextEntry={true} 
      placeholder="Password"
      placeholderTextColor="black"
      autoComplete="new-password"
      onChangeText={text => props.onChangeText(text)}
      style = {{ width: 310, padding:20, marginBottom:10, backgroundColor:"#ebecff", borderRadius:10 }}
    />
  );
}
export default Password;
