import React from 'react';
import {TextInput} from 'react-native';


function ChallengeField(props) {
  return (
    <TextInput
      required
      placeholderTextColor="black"
      autoComplete="new-password"
      onChangeText={text => props.onChangeText(text)}
      style = {{ width: '150%', padding:20, marginBottom:10, backgroundColor:"white", outline: 'none' }}
    />
  );
}
export default ChallengeField;
