import React, {useEffect} from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image, ScrollView, useWindowDimensions, Button} from 'react-native';
import {ScrollBox, ScrollAxes, FastTrack} from 'react-scroll-box'; 
import { Avatar } from 'react-native-paper';
import NavBar from './NavBar';
import Profile from './Profile';
import { PhoneView, BodyContainer, StyledCard} from '../styles/GeneralStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';

  
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

    const windowHeight = useWindowDimensions().height;
    const windowWidth = useWindowDimensions().width;
    const isMobile_v2 = windowHeight <= 700 || windowWidth <= 700 ? true : false;
    const [admin, setAdmin] = React.useState(false);
    const [completed, set_completed] = React.useState(false);
    const [selectedAnswers, set_selectedAnswers] = React.useState([]);
    const { sdg_index } = route.params;

    const sdg_names = ['No Poverty', 'Zero Hunger', 'Good Health and Well-Being', 'Quality Education', 
    'Gender Equality', 'Clean Water and Sanitation', 'Affordable and Clean Energy', 'Decent Work and Economic Growth', 
    'Industry, Innovation and Infrastructure', 'Reduce Inequalities', 'Sustainable Cities and Communities', 
    'Responsible Consumption and Production', 'Climate Action', 'Life below Water', 'Life on Land', 'Peace, Justice and Strong Institutions', 
    'Partnership for the Goals'];
    
    const sdg_data = [

        {
            'heading': 'SDG 1 - No Poverty', 
            'link': 'https://www.youtube.com/embed/WYGIpP2Nal0',
            'targets': [

                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/1.1.svg', 'TARGET 1.1 ERADICATE EXTREME POVERTY', 'By 2030, eradicate extreme poverty for all people everywhere, currently measured as people living on less than $1.25 a day.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/1.2.svg', 'TARGET 1.2 REDUCE POVERTY BY AT LEAST 50%' , 'By 2030, reduce at least by half the proportion of men, women and children of all ages living in poverty in all its dimensions according to national definitions.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/1.3.svg', 'TARGET 1.3 IMPLEMENT SOCIAL PROTECTION SYSTEMS', 'Implement nationally appropriate social protection systems and measures for all, including floors, and by 2030 achieve substantial coverage of the poor and the vulnerable.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/1.4.svg', 'TARGET 1.4 EQUAL RIGHTS TO OWNERSHIP, BASIC SERVICES, TECHNOLOGY AND ECONOMIC RESOURCES', 'By 2030, ensure that all men and women, in particular the poor and the vulnerable, have equal rights to economic resources, as well as access to basic services, ownership and control over land and other forms of property, inheritance, natural resources, appropriate new technology and financial services, including microfinance.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/1.5.svg', 'TARGET 1.5 BUILD RESILIENCE TO ENVIRONMENTAL, ECONOMIC AND SOCIAL DISASTERS', 'By 2030, build the resilience of the poor and those in vulnerable situations and reduce their exposure and vulnerability to climate-related extreme events and other economic, social and environmental shocks and disasters.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/1.a.svg', 'TARGET 1.A MOBILIZE RESOURCES TO IMPLEMENT POLICIES TO END POVERTY', 'Ensure significant mobilization of resources from a variety of sources, including through enhanced development cooperation, in order to provide adequate and predictable means for developing countries, in particular least developed countries, to implement programmes and policies to end poverty in all its dimensions.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/1.b.svg', 'TARGET 1.B CREATE PRO-POOR AND GENDER-SENSITIVE POLICY FRAMEWORKS' , 'Create sound policy frameworks at the national, regional and international levels, based on pro-poor and gender-sensitive development strategies, to support accelerated investment in poverty eradication actions.'],

            ],
            'questions': [
                ['What is the definition of extreme poverty?','Select an answer', 'Earning less than $1.90 a day', 'Not having access to a car', 'Not having access to free healthcare', 'Not having a job'],
                ['How much will it cost to end extreme poverty?','Select an answer','$175 billion dollars per year', '$1 trillion dollars per year', '$100 million dollars per year', '$5 million dollars per year'],
                ['How many people live in poverty worldwide?','Select an answer','Thousands of people', 'Millions of people', 'Billions of people'],
                ['Who is responsible for poverty the most?','Select an answer','Governments', 'Charities', 'Local councils', 'The people in poverty themselves'],
                ['What is the best thing you can do to help end poverty?','Select an answer','Support programs and innovations that benefit those suffering from poverty', 'Hope for the best', 'Feel cynical about billionaires who do not donate all their wealth to those living in poverty'],

            ],
            'answers': ['Earning less than $1.90 a day', '$175 billion dollars per year', 'Millions of people', 'Governments', 'Support programs and innovations that benefit those suffering from poverty']
        },
        {
            'heading': 'SDG 2 - Zero Hunger', 
            'link': 'https://www.youtube.com/embed/DNCL-1ASmNc',
            'targets': [

                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/2.1.svg', 'TARGET 2.1 UNIVERSAL ACCESS TO SAFE AND NUTRITIOUS FOOD', 'By 2030, end hunger and ensure access by all people, in particular the poor and people in vulnerable situations, including infants, to safe, nutritious and sufficient food all year round.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/2.2.svg', 'TARGET 2.2 END ALL FORMS OF MALNUTRITION' , 'By 2030, end all forms of malnutrition, including achieving, by 2025, the internationally agreed targets on stunting and wasting in children under 5 years of age, and address the nutritional needs of adolescent girls, pregnant and lactating women and older persons.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/2.3.svg', 'TARGET 2.3 DOUBLE THE PRODUCTIVITY AND INCOMES OF SMALL-SCALE FOOD PRODUCERS', 'By 2030, double the agricultural productivity and incomes of small-scale food producers, in particular women, indigenous peoples, family farmers, pastoralists and fishers, including through secure and equal access to land, other productive resources and inputs, knowledge, financial services, markets and opportunities for value addition and non-farm employment.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/2.4.svg', 'TARGET 2.4 SUSTAINABLE FOOD PRODUCTION AND RESILIENT AGRICULTURAL PRACTICES', 'By 2030, ensure sustainable food production systems and implement resilient agricultural practices that increase productivity and production, that help maintain ecosystems, that strengthen capacity for adaptation to climate change, extreme weather, drought, flooding and other disasters and that progressively improve land and soil quality.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/2.5.svg', 'TARGET 2.5 MAINTAIN THE GENETIC DIVERSITY IN FOOD PRODUCTION', 'By 2020, maintain the genetic diversity of seeds, cultivated plants and farmed and domesticated animals and their related wild species, including through soundly managed and diversified seed and plant banks at the national, regional and international levels, and promote access to and fair and equitable sharing of benefits arising from the utilization of genetic resources and associated traditional knowledge, as internationally agreed.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/2.a.svg', 'TARGET 2.A INVEST IN RURAL INFRASTRUCTURE, AGRICULTURAL RESEARCH, TECHNOLOGY AND GENE BANKS', 'Increase investment, including through enhanced international cooperation, in rural infrastructure, agricultural research and extension services, technology development and plant and livestock gene banks in order to enhance agricultural productive capacity in developing countries, in particular least developed countries.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/2.b.svg', 'TARGET 2.B PREVENT AGRICULTURAL TRADE RESTRICTIONS, MARKET DISTORTIONS AND EXPORT SUBSIDIES' , 'Correct and prevent trade restrictions and distortions in world agricultural markets, including through the parallel elimination of all forms of agricultural export subsidies and all export measures with equivalent effect, in accordance with the mandate of the Doha Development Round.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/2.c.svg', 'TARGET 2.C ENSURE STABLE FOOD COMMODITY MARKETS AND TIMELY ACCESS TO INFORMATION' , 'Adopt measures to ensure the proper functioning of food commodity markets and their derivatives and facilitate timely access to market information, including on food reserves, in order to help limit extreme food price volatility.'],
            ],
            'questions': [
                ['As of 2019, how many people suffer from hunger worldwide?','Select an answer', '1 billion', '650 million', '1 million', '820 million'],
                ['If a child is undernourished since birth, up until they are a young child, what are they most likely to suffer from?','Select an answer','Improved immunity', 'Obesity', 'Cognitive and other physical impairments that are permanent and irreversible'],
                ['What is food fortification?','Select an answer','The growing of organic food in farms', 'The distribution of food packs to the needy', 'Food that has extra nutrients added to it. It can be used to solve hunger in many parts of the world'],
                ['Which group of people are more likely to suffer from hunger?','Select an answer','People with low or no income', 'The homeless', 'Aboriginal and Torres Strait Islanders', 'All of these groups'],
                ['What can you do to help those suffering from hunger?','Select an answer','Helping food banks', 'Volunteering at community food gardens', 'Checking up on vulnerable family, friends and neighbours', 'All of these actions'],

            ],
            'answers': ['820 million', 'Cognitive and other physical impairments that are permanent and irreversible', 'Food that has extra nutrients added to it. It can be used to solve hunger in many parts of the world', 'All of these groups', 'All of these actions']
        },
        {
            'heading': 'SDG 3 - Good Health and Well Being', 
            'link': 'https://www.youtube.com/embed/ZVqSC_hN2lk',
            'targets': [

                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/3.1.svg', 'TARGET 3.1 REDUCE MATERNAL MORTALITY', 'By 2030, reduce the global maternal mortality ratio to less than 70 per 100,000 live births.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/3.2.svg', 'TARGET 3.2 END ALL PREVENTABLE DEATHS UNDER 5 YEARS OF AGE' , 'By 2030, end preventable deaths of newborns and children under 5 years of age, with all countries aiming to reduce neonatal mortality to at least as low as 12 per 1,000 live births and under‑5 mortality to at least as low as 25 per 1,000 live births.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/3.3.svg', 'TARGET 3.3 FIGHT COMMUNICABLE DISEASES', 'By 2030, end the epidemics of AIDS, tuberculosis, malaria and neglected tropical diseases and combat hepatitis, water-borne diseases and other communicable diseases.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/3.4.svg', 'TARGET 3.4 REDUCE MORTALITY FROM NON-COMMUNICABLE DISEASES AND PROMOTE MENTAL HEALTH', 'By 2030, reduce by one third premature mortality from non-communicable diseases through prevention and treatment and promote mental health and well-being.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/3.5.svg', 'TARGET 3.5 PREVENT AND TREAT SUBSTANCE ABUSE', 'Strengthen the prevention and treatment of substance abuse, including narcotic drug abuse and harmful use of alcohol.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/3.6.svg', 'TARGET 3.6 REDUCE ROAD INJURIES AND DEATHS', 'By 2020, halve the number of global deaths and injuries from road traffic accidents.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/3.7.svg', 'TARGET 3.7 UNIVERSAL ACCESS TO SEXUAL AND REPRODUCTIVE CARE, FAMILY PLANNING AND EDUCATION', 'By 2030, ensure universal access to sexual and reproductive health-care services, including for family planning, information and education, and the integration of reproductive health into national strategies and programmes.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/3.8.svg', 'TARGET 3.8 ACHIEVE UNIVERSAL HEALTH COVERAGE', 'Achieve universal health coverage, including financial risk protection, access to quality essential health-care services and access to safe, effective, quality and affordable essential medicines and vaccines for all.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/3.9.svg', 'TARGET 3.9 REDUCE ILLNESSES AND DEATH FROM HAZARDOUS CHEMICALS AND POLLUTION', 'By 2030, substantially reduce the number of deaths and illnesses from hazardous chemicals and air, water and soil pollution and contamination.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/3.a.svg', 'TARGET 3.A IMPLEMENT THE WHO FRAMEWORK CONVENTION ON TOBACCO CONTROL', 'Strengthen the implementation of the World Health Organization Framework Convention on Tobacco Control in all countries, as appropriate.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/3.b.svg', 'TARGET 3.B SUPPORT RESEARCH, DEVELOPMENT AND UNIVERSAL ACCESS TO AFFORDABLE VACCINES AND MEDICINES' , 'Support the research and development of vaccines and medicines for the communicable and non-communicable diseases that primarily affect developing countries, provide access to affordable essential medicines and vaccines, in accordance with the Doha Declaration on the TRIPS Agreement and Public Health, which affirms the right of developing countries to use to the full the provisions in the Agreement on Trade-Related Aspects of Intellectual Property Rights regarding flexibilities to protect public health, and, in particular, provide access to medicines for all.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/3.c.svg', 'TARGET 3.C INCREASE HEALTH FINANCING AND SUPPORT HEALTH WORKFORCE IN DEVELOPING COUNTRIES' , 'Substantially increase health financing and the recruitment, development, training and retention of the health workforce in developing countries, especially in least developed countries and small island developing States.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/3.d.svg', 'TARGET 3.D IMPROVE EARLY WARNING SYSTEMS FOR GLOBAL HEALTH RISKS' , 'Strengthen the capacity of all countries, in particular developing countries, for early warning, risk reduction and management of national and global health risks.'],
            ],
            'questions': [
                ['Which of the following is NOT a target of SDG 3?','Select an answer', 'Reduce maternal mortality', 'Fight communicable diseases', 'End all preventable deaths under 5 years of age', 'Reduce deaths from plane crashes'],
                ['Over the years, which of the following types of death have INCREASED?','Select an answer', 'Maternal-related deaths', 'Chronic-disease related deaths e.g. cancer', 'Both of the above options'],
                ['How can we best achieve SDG 3?','Select an answer', 'Distributing health resources equally', 'Distributing health resources based on the principle of equity', 'Distributing health resources only to those who can afford it'],
                ['How can you best promote equity in health?','Select an answer', 'Donations to organisations that help disadvantaged people', 'Lowering your pollution output', 'Calling out unsafe, unfair or unjust practices', 'All of these options'],
            ],
            'answers': ['Reduce deaths from plane crashes', 'Chronic-disease related deaths e.g. cancer', 'Distributing health resources based on the principle of equity','All of these options']
        },

        {
            'heading': 'SDG 4 - Quality Education', 
            'link': 'https://www.youtube.com/embed/tlhp3K1veoQ',
            'targets': [

                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/4.1.svg', 'TARGET 4.1 FREE PRIMARY AND SECONDARY EDUCATION', 'By 2030, ensure that all girls and boys complete free, equitable and quality primary and secondary education leading to relevant and effective learning outcomes.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/4.2.svg', 'TARGET 4.2 EQUAL ACCESS TO QUALITY PRE-PRIMARY EDUCATION' , 'By 2030, ensure that all girls and boys have access to quality early childhood development, care and pre-primary education so that they are ready for primary education.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/4.3.svg', 'TARGET 4.3 EQUAL ACCESS TO AFFORDABLE TECHNICAL, VOCATIONAL AND HIGHER EDUCATION', 'By 2030, ensure equal access for all women and men to affordable and quality technical, vocational and tertiary education, including university.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/4.4.svg', 'TARGET 4.4 INCREASE THE NUMBER OF PEOPLE WITH RELEVANT SKILLS FOR FINANCIAL SUCCESS', 'By 2030, substantially increase the number of youth and adults who have relevant skills, including technical and vocational skills, for employment, decent jobs and entrepreneurship.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/4.5.svg', 'TARGET 4.5 ELIMINATE ALL DISCRIMINATION IN EDUCATION', 'By 2030, eliminate gender disparities in education and ensure equal access to all levels of education and vocational training for the vulnerable, including persons with disabilities, indigenous peoples and children in vulnerable situations.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/4.6.svg', 'TARGET 4.6 UNIVERSAL LITERACY AND NUMERACY', 'By 2030, ensure that all youth and a substantial proportion of adults, both men and women, achieve literacy and numeracy.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/4.7.svg', 'TARGET 4.7 EDUCATION FOR SUSTAINABLE DEVELOPMENT AND GLOBAL CITIZENSHIP', 'By 2030, ensure that all learners acquire the knowledge and skills needed to promote sustainable development, including, among others, through education for sustainable development and sustainable lifestyles, human rights, gender equality, promotion of a culture of peace and non-violence, global citizenship and appreciation of cultural diversity and of culture’s contribution to sustainable development'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/4.a.svg', 'TARGET 4.A BUILD AND UPGRADE INCLUSIVE AND SAFE SCHOOLS', 'Build and upgrade education facilities that are child, disability and gender sensitive and provide safe, non-violent, inclusive and effective learning environments for all.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/4.b.svg', 'TARGET 4.B EXPAND HIGHER EDUCATION SCHOLARSHIPS FOR DEVELOPING COUNTRIES' , 'By 2020, substantially expand globally the number of scholarships available to developing countries, in particular least developed countries, small island developing States and African countries, for enrolment in higher education, including vocational training and information and communications technology, technical, engineering and scientific programmes, in developed countries and other developing countries.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/4.c.svg', 'TARGET 4.C INCREASE THE SUPPLY OF QUALIFIED TEACHERS IN DEVELOPING COUNTRIES' , 'By 2030, substantially increase the supply of qualified teachers, including through international cooperation for teacher training in developing countries, especially least developed countries and small island developing States.'],
            ],
            'questions': [
                ['How many children did not attend school in 2017?','Select an answer', '50 thousand', '1 million', ' 1 billion', '262 million'],
                ['What major issues can education potentially resolve?','Select an answer', 'Modern slavery', 'Exploitation and abuse', 'Poverty', 'All of the above'],
                ['Which group of people in Australia are disadvantaged when it comes to receiving a quality education?','Select an answer', 'Those living in cities', 'Those living in rural areas', 'Both groups mentioned above'],
            ],
            'answers': ['262 million', 'All of the above', 'Those living in rural areas']
        }

    ]

    React.useEffect(() => {

        console.log('the selected answers are:', selectedAnswers)
        console.log('the actual answers are:', sdg_data[sdg_index-1]['answers'])

        console.log('finished:', completed)

        if (arraysEqual(sdg_data[sdg_index-1]['answers'],selectedAnswers)){
            set_completed(true)
        }

    },[selectedAnswers])

    function arraysEqual(a1,a2) {
        /* WARNING: arrays must not contain {objects} or behavior may be undefined */
        return JSON.stringify(a1)==JSON.stringify(a2);
    }


    function handleModuleSubmission(){

    }

    function handleQuizChange(a){
        console.log(a.value)
    }

    function updateAnswers (answer, index){

        const temp = Array.from(selectedAnswers);
        temp[index] = answer;
        set_selectedAnswers(temp);
    }

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
                    <View style={[styles.flexContainer, {flex:4, margin:'2px', marginRight:'5%', paddingRight: '15px !important'}]}>
                        <View style={[styles.meetingsColumn]}>                     

                            <ScrollView contentContainerStyle = {{display:"flex", alignItems: 'center', flexDirection:'column', height:'120vh', width: '100vw'}}>
                                <Text style={{fontSize:25, fontWeight:'bold'}}>{sdg_data[sdg_index-1]['heading']}</Text>
                                <p/>

                                <div>

                                    <iframe width={isMobile_v2 ? "350" : "600"} height={isMobile_v2 ? "250" : "300"} src={sdg_data[sdg_index-1]['link']}></iframe>

                                </div>

                                <p/>
                                <View style={{display:'flex', justifyContent:'center', alignItems: 'center', width:'90%'}}>
                                    {/*<Image source={{uri: "https://i.imgur.com/fBKHn4J.png"}} style={[{width:'753px', height:'4686px'}]} resizeMode={'contain'}/>*/}
                                    {
                                        sdg_data[sdg_index-1]['targets'].map(target => {
                                            return (
                                                <>
                                                    <Image source={{uri: target[0]}} style={[{width:'126px', height:'126px'}]} resizeMode={'contain'}/>
                                                    <p/>
                                                    <Text style={{fontSize:20, fontWeight:'bold', textAlign:'center'}}>{target[1]}</Text>
                                                    <p/>
                                                    <Text style={{fontSize:20, textAlign:'center'}}>{target[2]}</Text>
                                                    <p/><p/>
                                                </>   
                                            )
                                        })
                                    }
                                </View>
                                
                                {/* when  */}
                                                            
                                <Text style={{fontSize:18, textAlign:'center'}}>Watch the video about this particular SDG then answer the questions below. </Text> 
                                <Text style={{fontSize:18, textAlign:'center'}}> When all of your answers are correct, you will be able to submit the module and earn 5 green XP!</Text>
                                <p/>
                                {
                                    sdg_data[sdg_index-1]['questions'].map((question, index) => {
                                        return (
                                            <>
                                                <Text style={{fontSize:18, textAlign:'center'}}> {question[0]} </Text>
                                                <p/>
                                                    <Picker 
                                                        style={{width:'90vw', fontSize:18, maxWidth:'400px'}} 
                                                        onValueChange={(itemValue, itemPosition) => updateAnswers(itemValue, index)}
                                                    >
                                                        {
                                                                question.slice(1).map(option_ => {
                                                                    return (<Picker.Item value={option_} label={option_}/>)
                                                                })
                                                        }
                                                    </Picker> 
                                                    {/*

                                                    {console.log('jejejeje')}

                                                    <RNPickerSelect
                                                        style={{width:'90vw', fontSize:18, maxWidth:'400px !important'}} 
                                                        onValueChange={(value) => console.log(value)}
                                                        items={                                                     
                                                            question.slice(1).map(option_ => (
                                                                { 
                                                                    label: option_, value: option_,
                                                                }
                                                            ))
                                                        }
                                                    />
                                                    */}
                                                <p/>
                                            </>   
                                        )
                                    })

                                } 

                                <TouchableOpacity
                                    style={{display:'flex', justifyContent:'center', alignItems: 'center', padding:'3%',backgroundColor: completed ? '#7d83ff' : 'grey', border:'2px solid', width:'50%', height:'100%', maxHeight: '30px', borderRadius:'10px', maxWidth: '200px', fontSize:20}}
                                    accessible={true}
                                    disabled={completed ? false : true}
                                    accessibilityLabel="button to submit questions"
                                    onPress={() =>  handleModuleSubmission()}>
                                        <Text style={{fontSize:21, textAlign:'center'}}>Submit</Text>
                                </TouchableOpacity>                                          
                                
                            </ScrollView>
                        </View>
                    </View>
            </BodyContainer>
            <NavBar navigation={navigation} selectedIcon="Learn" admin={admin}/>
        </PhoneView>
    );
};

//all updated