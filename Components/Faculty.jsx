import React from 'react';
import {TextInput} from 'react-native';


function Faculty(props) {
  return (
    <Faculty
      required
      label="Faculty"
      placeholder="Faculty"
      placeholderTextColor="black"
      autoComplete=""
      onChangeText={text => props.onChangeText(text)}
      style = {{ width: 310, padding:20, marginBottom:10, backgroundColor:"#ebecff", borderRadius:10 }}
    />
  );
}
export default Faculty;
