import React from 'react';
import {TextInput} from 'react-native';


function ChallengeTitle(props) {
  return (
    <TextInput
      required
      placeholderTextColor="black"
      autoComplete="new-password"
      onChangeText={text => props.onChangeText(text)}
      style = {{ width: 310, padding:20, marginBottom:10, backgroundColor:"white", outline: 'none' }}
    />
  );
}
export default ChallengeTitle;
