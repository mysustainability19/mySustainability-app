import React from "react";
import { Divider } from 'react-native-paper';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { useWindowDimensions } from 'react-native';

const styles = StyleSheet.create({
    navBar: {
        position: 'absolute', bottom: 2, backgroundColor:"white", width:"100vw"
    },
    icon: {
        height:33, width:33
    },
    learn_icon: {
        height:38, width: 33
    },
    innerBar: {
        display:"flex", flexDirection:"row", width: '100%', marginTop:'3%', marginBottom:20,justifyContent:"space-evenly", alignItems:"center",
    }
})


export default function NavBar({ navigation, selectedIcon, admin }){

    const home = selectedIcon === "Home" ? require("../icons/selected_home.png"): require("../icons/home.png");
    const friends = selectedIcon === "Leaderboard" ? require("../icons/selected_friends.png"): require("../icons/friends.png");
    const learn = selectedIcon === "Learn" ? require("../icons/selected_learn.png"): require("../icons/learn.png");
    const add = selectedIcon === "Add" ? require("../icons/selected_add.png"): require("../icons/add.png");
    const windowHeight = useWindowDimensions().height;
    const isMobile = windowHeight <= 300 ? true : false;

    return (
        <View style={styles.navBar}>
            <Divider style={{backgroundColor: "#77767B"}}/>
            <View style={[styles.innerBar]}>
                <TouchableOpacity onPress={() => {navigation.navigate('Home', {replace: true, newUser:false})}}>
                    <Image alt="home page button" source={home} style={styles.icon}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {navigation.navigate('Learn'), {replace: true}}}>
                    <Image alt="learn" source={learn} style={styles.learn_icon}/>
                </TouchableOpacity>
                {admin ? 
                    <TouchableOpacity onPress={() => {navigation.navigate('Add', {replace: true})}}>
                        <Image alt="create new challenge"  source={add} style={styles.icon}/>
                    </TouchableOpacity>
                    : ''
                }
                <TouchableOpacity onPress={() => {navigation.navigate('Leaderboard'), {replace: true}}}>
                    <Image alt="leaderboard" source={friends} style={styles.icon}/>
                </TouchableOpacity>
                {/*<TouchableOpacity onPress={() => {navigation.navigate('Redeem'), {replace: true}}}>
                    <Image alt="redeem" source={redeem} style={styles.icon}/>
                </TouchableOpacity>*/}
            </View>
        </View>
    );
}