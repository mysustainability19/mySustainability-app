import React from 'react';
import {TextInput} from 'react-native';

function LastName() {
  return (
    <TextInput
      label="Last Name"
      //autoFocus
      placeholder="Last Name"
      placeholderTextColor="black"
      style = {{ width: 310, padding:20, marginBottom:10, backgroundColor:"#ebecff", borderRadius:10 }}
    />
  );
}
export default LastName;
