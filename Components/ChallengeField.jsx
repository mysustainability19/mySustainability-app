import React from 'react';
import {TextInput} from 'react-native';


function ChallengeField(props) {
  return (
    <TextInput
      required
      placeholderTextColor="black"
      autoComplete="new-password"
      onChangeText={text => props.onChangeText(text)}
      style = {{  lineHeight: 23, textAlignVertical: "top", width: '80vw', maxWidth:'700px', height:'10vh', padding:'5vh', marginBottom:10, backgroundColor:"white", outline: 'none' }}
    />
  );
}
export default ChallengeField;
