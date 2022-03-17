import React from 'react';
import {TextInput} from 'react-native';


function ZID(props) {
  return (
    <ZID
      required
      label="ZID"
      placeholder="ZID"
      placeholderTextColor="black"
      autoComplete=""
      onChangeText={text => props.onChangeText(text)}
      style = {{ width: 310, padding:20, marginBottom:10, backgroundColor:"#ebecff", borderRadius:10 }}
    />
  );
}
export default ZID;
