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
      style = {{ width: 310, padding:20, marginBottom:10, backgroundColor:"#ebecff", borderRadius:10 }}
    />
  );
}
export default FullName;
