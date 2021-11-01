import React from 'react';
import {StyleSheet, View, Image, Platform } from 'react-native';


export default function TransitionScreen({navigation}) {
    setTimeout(() => {
      navigation.navigate('Login', { replace: true })
    }, 1100)  

    return(
        <View style={styles.container}>
            <Image
            style={styles.calpalLogo}
            source={require('../icons/logo.PNG')}
            />  
        </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FAFAFA',
      alignItems: 'center',
      justifyContent: 'center',
    },
    calpalLogo: {
      minWidth:400,
      minHeight:400,
      maxWidth:500,
      maxHeight:500,
    }
  });
  