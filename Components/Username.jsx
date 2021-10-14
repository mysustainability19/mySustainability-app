import React from 'react';
import {TextInput} from 'react-native';

function UserName() {
  return (
    <TextInput
      label="Username"
      //autoFocus
      placeholder="Username"
      placeholderTextColor="black"
      style = {{ width: 310, padding:20, marginBottom:10, backgroundColor:"#ebecff", borderRadius:10 }}
    />
  );
}
export default UserName;
