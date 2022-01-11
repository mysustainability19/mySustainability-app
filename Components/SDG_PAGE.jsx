import React, {useEffect} from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image, ScrollView, useWindowDimensions, Button} from 'react-native';
import {ScrollBox, ScrollAxes, FastTrack} from 'react-scroll-box'; 
import { Avatar } from 'react-native-paper';
import NavBar from './NavBar';
import Profile from './Profile';
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
    p: {
        wordBreak: 'break-all',
        whiteSpace: 'normal',
    },
    flexContainer: {
        display:"flex", flexDirection:"column", justifyContent:"flex-start", alignItems:'center', height:"140vh", width:"95vw"
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


    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"></link>

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
    const windowWidth = useWindowDimensions().width;
    const iframe_height = windowHeight*0.7;
    const iframe_width = windowWidth*0.7;
    const isMobile = windowHeight <= 700 ? true : false;
    const isMobile_v2 = windowHeight <= 700 || windowWidth <= 700 ? true : false;
    const [admin, setAdmin] = React.useState(false);
    const [completed, set_completed] = React.useState([]);
    const sdg_names = ['No Poverty', 'Zero Hunger', 'Good Health and Well-Being', 'Quality Education', 
    'Gender Equality', 'Clean Water and Sanitation', 'Affordable and Clean Energy', 'Decent Work and Economic Growth', 
    'Industry, Innovation and Infrastructure', 'Reduce Inequalities', 'Sustainable Cities and Communities', 
    'Responsible Consumption and Production', 'Climate Action', 'Life below Water', 'Life on Land', 'Peace, Justice and Strong Institutions', 
    'Partnership for the Goals'];
    const { sdg_index } = route.params;
    
    const sdg_data = [

        {
            'heading': 'SDG 1 - No Poverty', 
            'link': 'https://www.youtube.com/embed/WYGIpP2Nal0',
            'questions': [
                ['What is the definition of extreme poverty?','Earning less than $1.90 a day', 'Not having access to a car', 'Not having access to free healthcare', 'Not having a job'],
                ['How much will it cost to end extreme poverty?','$175 billion dollars per year', '$1 trillion dollars per year', '$100 million dollars per year', '$5 million dollars per year'],
                ['How many people live in poverty worldwide?','Thousands of people', 'Millions of people', 'Billions of people'],
                ['Who is responsible for poverty the most?','Governments', 'Charities', 'Local councils', 'The people in poverty themselves'],
                ['What is the best thing you can do to help end poverty?','Support programs and innovations that benefit those suffering from poverty', 'Hope for the best', 'Feel cynical about billionaires who do not donate all their wealth to those living in poverty'],

            ],
            'answers': ['Earning less than $1.90 a day', '$175 billion dollars per year', 'Millions of people', 'Governments', 'Support programs and innovations that benefit those suffering from poverty']
        }

    ]

  
    return (
        <PhoneView>
            <BodyContainer>
                    <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center", flex:1}}>
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
                    <View style={[styles.flexContainer, {flex:4, margin:'auto', marginRight:'5%', paddingRight: '15px !important'}]}>
                        <View style={[styles.meetingsColumn]}>                     

                            <ScrollView contentContainerStyle = {{display:"flex", alignItems: 'center', flexDirection:'column', height:'120vh', width: '100vw'}}>
                                <Text style={{fontSize:25, fontWeight:'bold'}}>{sdg_data[sdg_index-1]['heading']}</Text>
                                <p/>
                                {console.log(windowHeight)}
                                {console.log(isMobile)}

                                <div>

                                    <iframe width={isMobile_v2 ? "350" : "600"} height={isMobile_v2 ? "250" : "300"} src={sdg_data[sdg_index-1]['link']}></iframe>

                                </div>
                                
                                {/* when  */}
                                                            
                                <p/>
                                <Text style={{fontSize:20, textAlign:'center'}}>Watch the video about this particular SDG then answer the questions below. </Text> 
                                <Text style={{fontSize:20, textAlign:'center'}}> When all of your answers are correct, you will be able to submit the module and earn 5 points!</Text>
                                <p/>
                                {
                                    sdg_data[sdg_index-1]['questions'].map(question => {
                                        return (
                                            <>
                                                <Text style={{fontSize:20, textAlign:'center'}}> {question[0]} </Text>
                                                <p/>
                                                <select name={String(question)} id={String(question)} style={{width:'90vw', fontSize:20, maxWidth:'400px'}}>
                                                    {
                                                            question.slice(1).map(option_ => {
                                                                return (<option value={option_}>{option_}</option>)
                                                            })
                                                    }
                                                </select> 
                                                <p/>
                                            </>   
                                        )
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