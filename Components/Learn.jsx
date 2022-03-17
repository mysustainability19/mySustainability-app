import React, {useEffect} from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image, ScrollView, useWindowDimensions, Button} from 'react-native';
import NavBar from './NavBar';
import { PhoneView, BodyContainer, StyledCard} from '../styles/GeneralStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import {globalDebug} from './consoleBlocking';
globalDebug(false,true);

  
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
<>
    <link rel="preconnect" href="https://dds.ait.ac.th" />
    <link rel="preconnect" href="https://www.un.org" />
    <link rel="preconnect" href="https://mysustainability-api-123.herokuapp.com" />
    <link rel="preconnect" href="https://cdn2.iconfinder.com" />
    <link rel="preconnect" href="https://upload.wikimedia.org" />
    <link rel="preconnect" href="https://i.imgur.com" />
</>



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

export default function Learn ({route, navigation}){
    const [is_focused, set_is_focused] = React.useState(false)
    const isFocused = useIsFocused();
    const [authorised, set_authorised] = React.useState(false);

    React.useEffect(() => {

        getData('token')
        .then(token_value => {

            fetch(`https://mysustainability-api-123.herokuapp.com/auth_test/`, {method: 'GET', headers: {'Authorization': `Bearer ${String(token_value)}`}})
            .then(resp => resp.json())
            .then(response => {
                console.log(response)
                if (!JSON.stringify(response).includes("logged_in") && !response['msg'].includes('expired')){
                    navigation.navigate('Login', { replace: true })
                
                }else{
                    authorised === false ? set_authorised(true) : ''
                }

            })
        })

    }, [authorised]);

    getData('admin')
    .then(value => {
        if (value === 'true'){
            setAdmin(true)
        }
    })
    //maybe have better admin code here instead of just checking value === 'true'.


    const windowHeight = useWindowDimensions().height;
    const windowWidth = useWindowDimensions().width;
    const isMobile = windowHeight <= 700 ? true : false;
    const [admin, setAdmin] = React.useState(false);
    const [completed, set_completed] = React.useState([]);
    const sdg_names = ['No Poverty', 'Zero Hunger', 'Good Health and Well-Being', 'Quality Education', 
    'Gender Equality', 'Clean Water and Sanitation', 'Affordable and Clean Energy', 'Decent Work and Economic Growth', 
    'Industry, Innovation and Infrastructure', 'Reduce Inequalities', 'Sustainable Cities and Communities', 
    'Responsible Consumption and Production', 'Climate Action', 'Life below Water', 'Life on Land', 'Peace, Justice and Strong Institutions', 
    'Partnership for the Goals']
    
    React.useEffect(() => {

        getData('user_id')
        .then (token_value => {
            fetch(`https://mysustainability-api-123.herokuapp.com/getModuleProgress/?userEmail=${token_value}`, {method: 'GET'})
            .then(progress => progress.json())
            .then(progressJSON => {
                set_completed(progressJSON['res'][0]['modules'])
            })      
        })

    },[isFocused])

    function openSDG_module(sdg_index){
        //console.log(challengeID)
        //{console.log(sdg_index)}
        navigation.navigate('SDG_PAGE', { replace: true, sdg_index: sdg_index + 1, modules_completed: completed })
    }
    

    //console.log('the completed modules are:', completed)

    return (
        <PhoneView>
            <BodyContainer>
                    <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                        <Text style={[{fontSize:20, color:'#7d83ff', fontWeight:'bold'}]}> mySustainability </Text>
                        <TouchableOpacity
                            //style={{paddingTop:'3%'}}
                            accessible={true}
                            accessibilityLabel="button to personal profile"
                            onPress={() =>  navigation.navigate('Profile', { replace: true })}>
                            <Image
                                style={[{height:65, width:65}]}
                                source={require('../public/icons/myprofile.png')}
                            />  
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.flexContainer, {flex:4, margin:'auto',  marginLeft:'2%', marginRight:'2%'}]}>
                        <View style={[styles.meetingsColumn]}>                     

                            <ScrollView contentContainerStyle = {{display:"flex", flexDirection:'column', height:'120vh', marginLeft: isMobile ? '2%' : '0%', marginTop: isMobile ? '40px' : '0'}}>

                                <Text style={{fontSize:23,fontWeight:'bold'}}>Learn about the Sustainability Development Goals (SDGs): </Text>
                                <p/>

                                {

                                    
                                    sdg_names.map((sdg, sdg_index)=> {
                                                                                    
                                        return (

                                            <div style={{marginBottom:'8vh'}}>
                                                <StyledCard style={{marginTop:'0'}}>

                                                    <div style={{display:'flex', flexDirection:'row !important'}}> 
                                                        
                                                        <div style={{width:'fit-content', marginRight:'5%'}}> 
                                                            <Image style={{height:'100px', width:'100px'}} source={{uri: 'https://sustainabledevelopment.un.org/content/sdgsummit/images/E_SDG%20goals_icons-individual-rgb-' +  String(sdg_index + 1 < 10 ? '0' + String(sdg_index+1) : String(sdg_index+1)) + '.png'}}/> 
                                                        </div> 

                                                        <div style={{width:'fit-content'}}> 
                                                            <TouchableOpacity onPress={() => openSDG_module(sdg_index)} >
                                                                <Text style={{textAlign:'center', fontSize:25,fontWeight:'bold'}}>{sdg}</Text>
                                                            </TouchableOpacity>    
                                                        </div>    

                                                        {completed.includes(String(sdg_index+1)) ? <Image style={{height:'20px', width:'20px', display: 'block', position: 'absolute', right: '-10px', bottom: '0px'}} source={{uri: 'https://cdn2.iconfinder.com/data/icons/greenline/512/check-512.png'}}/> : ''}                                                 

                                                    </div>
                                                </StyledCard>
                                            </div>                                                   
                                        );
                                    })                                                   
                                }
                            </ScrollView>
                        </View>
                    </View>
            </BodyContainer>
            <NavBar navigation={navigation} selectedIcon="Learn" admin={admin}/>
        </PhoneView>
    );
};

//all updated