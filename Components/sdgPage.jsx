import React, {useEffect} from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image, ScrollView, useWindowDimensions, Button} from 'react-native';
import {ScrollBox, ScrollAxes, FastTrack} from 'react-scroll-box'; 
import { Avatar } from 'react-native-paper';
import NavBar from './NavBar';
import Profile from './Profile';
import { PhoneView, BodyContainer, StyledCard} from '../styles/GeneralStyles';
import { 
  TileHeading, RecommendationContainer, RecCard, RecCardText, MeetingCard,
  FriendTile
} from '../styles/HomeStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useParams } from "react-router";
import Modal from 'modal-enhanced-react-native-web';
import { useIsFocused } from "@react-navigation/native";

  
const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if(value !== null) {
            return value
        }else{
            return null
        }
    } catch(e) {
        // error reading value
    }
}

const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      // saving error
    }
}

const styles = StyleSheet.create({
    p: {
        wordBreak: 'break-all',
        whiteSpace: 'normal',
    },
    flexContainer: {
        display:"flex", flexDirection:"column", justifyContent:"flex-start", alignItems:'center', height:"140vh", width:"100vw"
    },
    individualTile: {
        flex:0, width:'100%', borderRadius:10, padding:10, marginBottom:'5%'
    },
    meetingsColumn: {
        flexDirection:"column", justifyContent:"flex-start", alignItems:"center", marginTop:'0', marginBottom:'100px', flex:1
    },
    avatar:{
        margin:5
    },
    navBar: {
        position: 'absolute', left: 0, right: 0, bottom: 0
    },
    viewAllButton: {
        display:"flex", justifyContent:'center',alignSelf:'center',width:'40%', padding:10, borderRadius:10, backgroundColor:"#3E3E3E"
    },
    buttonText: {
        color:"white", textAlign:"center", fontSize:15, fontWeight:'bold'
    },

})

export default function sdgPage ({route, navigation}){
    const [is_focused, set_is_focused] = React.useState(false)
    const isFocused = useIsFocused();

    getData('token')
    .then(token_value => {
        fetch(`https://mysustainability-api-123.herokuapp.com/auth_test/`, {method: 'GET', headers: {'Authorization': `Bearer ${String(token_value)}`}})
        .then(resp => resp.json())
        .then(response => {
          //console.log(response)
          if (response['msg'] === 'Token has expired' ){
            return
          }
          if (!JSON.stringify(response).includes("logged_in")){
            navigation.navigate('Login', { replace: true })
          }
        })
    })

    getData('admin')
    .then(value => {
        if (value === 'true'){
            setAdmin(true)
        }
    })
    //maybe have better admin code here instead of just checking value === 'true'.
    

    const windowHeight = useWindowDimensions().height;
    const isMobile = windowHeight <= 700 ? true : false;
    const [admin, setAdmin] = React.useState(false);
    const [completed, set_completed] = React.useState([]);
    const sdg_names = ['No Poverty', 'Zero Hunger', 'Good Health and Well-Being', 'Quality Education', 
    'Gender Equality', 'Clean Water and Sanitation', 'Affordable and Clean Energy', 'Decent Work and Economic Growth', 
    'Industry, Innovation and Infrastructure', 'Reduce Inequalities', 'Sustainable Cities and Communities', 
    'Responsible Consumption and Production', 'Climate Action', 'Life below Water', 'Life on Land', 'Peace, Justice and Strong Institutions', 
    'Partnership for the Goals']

  
    return (
        <PhoneView>
            <BodyContainer>
                    <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center", flex:1}}>
                        <Text style={[{fontSize:20, color:'black', fontWeight:'bold'}]}> mySustainability </Text>
                        {/*<TouchableOpacity
                            //style={{paddingTop:'3%'}}
                            accessible={true}
                            accessibilityLabel="button to personal profile"
                            onPress={() =>  navigation.navigate('Profile', { replace: true })}>
                            <Image
                                style={[{height:65, width:65}]}
                                source={require('../public/icons/myprofile.png')}
                            />  
                        </TouchableOpacity>*/}
                    </View>
                    <View style={[styles.flexContainer, {flex:4, margin:'auto',  marginLeft:'2%', marginRight:'2%'}]}>
                        <View style={[styles.meetingsColumn]}>                     

                            <ScrollView contentContainerStyle = {{display:"flex", flexDirection:'column', height:'120vh', marginLeft: isMobile ? '5%' : '0%'}}>

                                
                            </ScrollView>
                        </View>
                    </View>
            </BodyContainer>
            <NavBar navigation={navigation} selectedIcon="Learn" admin={admin}/>
        </PhoneView>
    );
};

//all updated