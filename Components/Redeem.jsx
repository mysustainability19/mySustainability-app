import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image, ScrollView, useWindowDimensions} from 'react-native';
import { Avatar } from 'react-native-paper';
import NavBar from './NavBar';
import { PhoneView, BodyContainer, StyledCard} from '../styles/GeneralStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
  
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
    flexContainer: {
        display:"flex", flexDirection:"column", justifyContent:"flex-start", alignItems:'center', height:'100%', width:"100%"
    },
    individualTile: {
        flex:0, width:'100%', borderRadius:10, padding:10, marginBottom:'5%'
    },
    meetingsColumn: {
        flexDirection:"column", justifyContent:"space-evenly", alignItems:"center", marginTop:'5%', marginBottom:'5%'
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
    LogOutButton: { 
        display:"flex", justifyContent:'center',alignSelf:'center',width:'95%', padding:20, borderRadius:10, backgroundColor:"#7D83FF", marginBottom:10,
        marginTop:10
    },

})

export default function Redeem ({navigation}){
    getData('token')
    .then(value => {
        if (value === "null"){
            navigation.navigate('Login', { replace: true });
        }else{
            return value
        }
    })

    const windowHeight = useWindowDimensions().height;
    const isMobile = windowHeight <= 700 ? true : false;
    const [info, setInfo] = React.useState({name:"", points:""});    
    const [leaderboard, setLeaderBoard] = React.useState([]); 
    const [userEmail, setUserEmail] = React.useState(""); 
    
    useEffect(() => {
        getData('user_id')
        .then(value => {
            if(value !== null){
                fetch(`https://mysustainability-api-123.herokuapp.com/get_user_info/?userEmail=${value}`, {method: 'GET'})
                .then(response => response.json())
                .then(value => {
                    setInfo({name:value['name'], points:value['points']})
                    
                })
            }
        })
    },[])

    return (
        <PhoneView>
            <BodyContainer>
                <ScrollView style={{display:"flex", flexDirection:'column', }}>
                    <StyledCard>
                        <Text style={{fontSize:23, fontWeight:"bold"}}>Rewards: </Text>
                        <p/>
                        <View style={{height:'20%'}}>
                            <Text style={{fontSize:18}}>Receive a Plastic-Free, reusable bottle</Text>
                            <TouchableOpacity
                                    style={{marginTop:'7%', padding:'20px', backgroundColor:'#7d83ff', border:'2px solid', width:'fit-content', height:'fit-content', borderRadius:'10px'}}
                                    accessible={true}
                                    accessibilityLabel="button to redeem points for reward"
                                    onPress={() =>  console.log("redeemed")}>
                                        <Text style={{fontSize:18, textAlign:'center',}}>Redeem for 20 points</Text>
                            </TouchableOpacity>
                        </View>
                    </StyledCard>
                </ScrollView>
            </BodyContainer>
            <NavBar navigation={navigation} selectedIcon="Redeem"/>
        </PhoneView>
    );
};

//all updated