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
    const { sdg_index, modules_completed } = route.params;


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
        },

        {
            'heading': 'SDG 5 - Gender Equality', 
            'link': 'https://www.youtube.com/embed/vNv4WAGZAak',
            'targets': [

                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/5.1.svg', 'TARGET 5.1 END DISCRIMINATION AGAINST WOMEN AND GIRLS', 'End all forms of discrimination against all women and girls everywhere.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/5.2.svg', 'TARGET 5.2 END ALL VIOLENCE AGAINST AND EXPLOITATION OF WOMEN AND GIRLS' , 'Eliminate all forms of violence against all women and girls in the public and private spheres, including trafficking and sexual and other types of exploitation.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/5.3.svg', 'TARGET 5.3 ELIMINATE FORCED MARRIAGES AND GENITAL MUTILATION', 'Eliminate all harmful practices, such as child, early and forced marriage and female genital mutilation.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/5.4.svg', 'TARGET 5.4 VALUE UNPAID CARE AND PROMOTE SHARED DOMESTIC RESPONSIBILITIES', 'Recognize and value unpaid care and domestic work through the provision of public services, infrastructure and social protection policies and the promotion of shared responsibility within the household and the family as nationally appropriate.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/5.5.svg', 'TARGET 5.5 ENSURE FULL PARTICIPATION IN LEADERSHIP AND DECISION-MAKING', 'Ensure women’s full and effective participation and equal opportunities for leadership at all levels of decision-making in political, economic and public life.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/5.6.svg', 'TARGET 5.6 UNIVERSAL ACCESS TO REPRODUCTIVE HEALTH AND RIGHTS', 'Ensure universal access to sexual and reproductive health and reproductive rights as agreed in accordance with the Programme of Action of the International Conference on Population and Development and the Beijing Platform for Action and the outcome documents of their review conferences.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/5.a.svg', 'TARGET 5.A EQUAL RIGHTS TO ECONOMIC RESOURCES, PROPERTY OWNERSHIP AND FINANCIAL SERVICES', 'Undertake reforms to give women equal rights to economic resources, as well as access to ownership and control over land and other forms of property, financial services, inheritance and natural resources, in accordance with national laws.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/5.b.svg', 'TARGET 5.B PROMOTE EMPOWERMENT OF WOMEN THROUGH TECHNOLOGY' , 'Enhance the use of enabling technology, in particular information and communications technology, to promote the empowerment of women.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/5.c.svg', 'TARGET 5.C ADOPT AND STRENGTHEN POLICIES AND ENFORCEABLE LEGISLATION FOR GENDER EQUALITY' , 'Adopt and strengthen sound policies and enforceable legislation for the promotion of gender equality and the empowerment of all women and girls at all levels.'],
            ],
            'questions': [
                ['What is this SDG about?','Select an answer', 'Providing women and girls with equal access to education, health care and decent work', 'Providing women with equal rights to economic resources such as land and property', 'All of the above', 'Favouring men over women'],
                ['How is this SDG best achieved?','Select an answer', 'By addressing structural issues such as unfair social norms and attitudes', 'By developing progressive legal frameworks that promote equality between women and men', 'All of the above', 'By allowing women to fight for their own rights and freedoms, giving them no help whatsoever'],
                ['Which other SDGs does SDG 5, Gender Equality, further/help make progress in?','Select an answer', 'SDG 4 - Quality Education', 'SDG 8 - Decent Work and Economic Growth', 'SDG 16 - Peace, Justice and Strong Institutions', 'All of the above'],
                ['What can you do to help promote gender equality?','Select an answer', 'Call out sexism in your school, university or workplace', 'Join `He for She`, an organisation that stands in solidarity with women', 'All of the above', 'Leave it up to women to stand up for their own rights'],   
            ],
            'answers': ['All of the above', 'All of the above', 'All of the above', 'All of the above']
        },

        {
            'heading': 'SDG 6 - Clean Water and Sanitation', 
            'link': '',
            'targets': [

                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/6.1.svg', 'TARGET 6.1 SAFE AND AFFORDABLE DRINKING WATER', 'By 2030, achieve universal and equitable access to safe and affordable drinking water for all.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/6.2.svg', 'TARGET 6.2 END OPEN DEFECATION AND PROVIDE ACCESS TO SANITATION AND HYGIENE' , 'By 2030, achieve access to adequate and equitable sanitation and hygiene for all and end open defecation, paying special attention to the needs of women and girls and those in vulnerable situations.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/6.3.svg', 'TARGET 6.3 IMPROVE WATER QUALITY, WASTEWATER TREATMENT AND SAFE REUSE', 'By 2030, improve water quality by reducing pollution, eliminating dumping and minimizing release of hazardous chemicals and materials, halving the proportion of untreated wastewater and substantially increasing recycling and safe reuse globally.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/6.4.svg', 'TARGET 6.4 INCREASE WATER-USE EFFICIENCY AND ENSURE FRESHWATER SUPPLIES', 'By 2030, substantially increase water-use efficiency across all sectors and ensure sustainable withdrawals and supply of freshwater to address water scarcity and substantially reduce the number of people suffering from water scarcity.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/6.5.svg', 'TARGET 6.5 IMPLEMENT INTEGRATED WATER RESOURCES MANAGEMENT', 'By 2030, implement integrated water resources management at all levels, including through transboundary cooperation as appropriate.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/6.6.svg', 'TARGET 6.6 PROTECT AND RESTORE WATER-RELATED ECOSYSTEMS', 'By 2020, protect and restore water-related ecosystems, including mountains, forests, wetlands, rivers, aquifers and lakes.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/6.a.svg', 'TARGET 6.A EXPAND WATER AND SANITATION SUPPORT TO DEVELOPING COUNTRIES', 'By 2030, expand international cooperation and capacity-building support to developing countries in water- and sanitation-related activities and programmes, including water harvesting, desalination, water efficiency, wastewater treatment, recycling and reuse technologies.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/6.b.svg', 'TARGET 6.B SUPPORT LOCAL ENGAGEMENT IN WATER AND SANITATION MANAGEMENT' , 'Support and strengthen the participation of local communities in improving water and sanitation management.'],
            ],
            'questions': [
                ['What does this SDG aim to achieve?','Select an answer', 'Equitable access to safe and affordable drinking water for all', 'Equitable sanitation and hygiene for all', 'Improved water quality by reducing pollution, eliminating dumping and minimizing release of hazardous chemicals (into bodies of water) ', 'All of the above'],
                ['What can you do to help achieve this SDG?','Select an answer', 'Use water more efficiently e.g. taking shorter showers, turning down the tap etc.', 'Just leave it to the government to sort out', 'Push billionaires to build more wells'],
            ],
            'answers': ['All of the above', 'Use water more efficiently e.g. taking shorter showers, turning down the tap etc.']
        },

        {
            'heading': 'SDG 7 - Affordable and Clean Energy', 
            'link': 'https://www.youtube.com/embed/HyjNKnjpRvU',
            'targets': [

                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/7.1.svg', 'TARGET 7.1 UNIVERSAL ACCESS TO MODERN ENERGY', 'By 2030, ensure universal access to affordable, reliable and modern energy services.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/7.2.svg', 'TARGET 7.2 INCREASE GLOBAL PERCENTAGE OF RENEWABLE ENERGY' , 'By 2030, increase substantially the share of renewable energy in the global energy mix.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/7.3.svg', 'TARGET 7.3 DOUBLE THE IMPROVEMENT IN ENERGY EFFICIENCY', 'By 2030, double the global rate of improvement in energy efficiency.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/7.a.svg', 'TARGET 7.A PROMOTE ACCESS TO RESEARCH, TECHNOLOGY AND INVESTMENTS IN CLEAN ENERGY', 'By 2030, enhance international cooperation to facilitate access to clean energy research and technology, including renewable energy, energy efficiency and advanced and cleaner fossil-fuel technology, and promote investment in energy infrastructure and clean energy technology.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/7.b.svg', 'TARGET 7.B EXPAND AND UPGRADE ENERGY SERVICES FOR DEVELOPING COUNTRIES', 'By 2030, expand infrastructure and upgrade technology for supplying modern and sustainable energy services for all in developing countries, in particular least developed countries, small island developing States and landlocked developing countries, in accordance with their respective programmes of support.'],
            ],
            'questions': [
                ['Is it true that around 1 billion people worldwide, do not have access to electricity?','Select an answer', 'True', 'False'],
                ['Is it true that photovoltaics are about 1/3 of the cost of conventional electricity sources (when it comes to supplying electricity)?','Select an answer', 'True', 'False'],
                ['What can you do to help achieve this SDG?','Select an answer', 'Only buy appliances that are energy-efficient ', 'Change your electricity plan to one that includes a renewable energy source', 'All of the above'], 
            ],
            'answers': ['True', 'True', 'All of the above']
        },

        {
            'heading': 'SDG 8 - Decent Work and Economic Growth', 
            'link': 'https://www.youtube.com/embed/dylOM3GY9PY',
            'targets': [

                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/8.1.svg', 'TARGET 8.1 SUSTAINABLE ECONOMIC GROWTH', 'Sustain per capita economic growth in accordance with national circumstances and, in particular, at least 7 per cent gross domestic product growth per annum in the least developed countries.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/8.2.svg', 'TARGET 8.2 DIVERSIFY, INNOVATE AND UPGRADE FOR ECONOMIC PRODUCTIVITY' , 'Achieve higher levels of economic productivity through diversification, technological upgrading and innovation, including through a focus on high-value added and labour-intensive sectors.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/8.3.svg', 'TARGET 8.3 PROMOTE POLICIES TO SUPPORT JOB CREATION AND GROWING ENTERPRISES', 'Promote development-oriented policies that support productive activities, decent job creation, entrepreneurship, creativity and innovation, and encourage the formalization and growth of micro-, small- and medium-sized enterprises, including through access to financial services.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/8.4.svg', 'TARGET 8.4 IMPROVE RESOURCE EFFICIENCY IN CONSUMPTION AND PRODUCTION', 'Improve progressively, through 2030, global resource efficiency in consumption and production and endeavour to decouple economic growth from environmental degradation, in accordance with the 10‑Year Framework of Programmes on Sustainable Consumption and Production, with developed countries taking the lead.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/8.5.svg', 'TARGET 8.5 FULL EMPLOYMENT AND DECENT WORK WITH EQUAL PAY', 'By 2030, achieve full and productive employment and decent work for all women and men, including for young people and persons with disabilities, and equal pay for work of equal value.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/8.6.svg', 'TARGET 8.6 PROMOTE YOUTH EMPLOYMENT, EDUCATION AND TRAINING', 'By 2020, substantially reduce the proportion of youth not in employment, education or training.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/8.7.svg', 'TARGET 8.7 END MODERN SLAVERY, TRAFFICKING AND CHILD LABOUR', 'Take immediate and effective measures to eradicate forced labour, end modern slavery and human trafficking and secure the prohibition and elimination of the worst forms of child labour, including recruitment and use of child soldiers, and by 2025 end child labour in all its forms.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/8.8.svg', 'TARGET 8.8 PROTECT LABOUR RIGHTS AND PROMOTE SAFE WORKING ENVIRONMENTS' , 'Protect labour rights and promote safe and secure working environments for all workers, including migrant workers, in particular women migrants, and those in precarious employment.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/8.9.svg', 'TARGET 8.9 PROMOTE BENEFICIAL AND SUSTAINABLE TOURISM' , 'By 2030, devise and implement policies to promote sustainable tourism that creates jobs and promotes local culture and products.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/8.10.svg', 'TARGET 8.10 UNIVERSAL ACCESS TO BANKING, INSURANCE AND FINANCIAL SERVICES' , 'Strengthen the capacity of domestic financial institutions to encourage and expand access to banking, insurance and financial services for all.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/8.a.svg', 'TARGET 8.A INCREASE AID FOR TRADE SUPPORT' , 'Increase Aid for Trade support for developing countries, in particular least developed countries, including through the Enhanced Integrated Framework for Trade-related Technical Assistance to Least Developed Countries.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/8.b.svg', 'TARGET 8.B DEVELOP A GLOBAL YOUTH EMPLOYMENT STRATEGY' , 'By 2020, develop and operationalize a global strategy for youth employment and implement the Global Jobs Pact of the International Labour Organization.'],
            ],
            'questions': [
                ['Which of the following are a result of increased entrepreneurship and job creation?','Select an answer', 'Eradication of slavery', 'Eradication of human trafficking', 'Exploitation of workers', 'All of the above'],
                ['What is microfinance and why is it important to help achieve this SDG?','Select an answer', 'Mirofinance is a type of financial service where small loans are made accessible to the poor to help them get on their feet e.g. by starting a business. These people would otherwise be refused by the big banks to borrow money/get a loan.', 'Microfinance involves investing in the stock exchange, but in small amounts', 'All of the above', 'Microfinance is about saving money by making small changes to your spending'],
                ['What needs to be done to help achieve this SDG?','Select an answer', 'Better investment in training and education to help people transition into decent jobs', 'Equal employment `playing-field` i.e. regardless of ethnicity, gender, race', 'All of the above', 'People need to help themselves'],
            ],
            'answers': ['All of the above', 'Mirofinance is a type of financial service where small loans are made accessible to the poor to help them get on their feet e.g. by starting a business. These people would otherwise be refused by the big banks to borrow money/get a loan.', 'All of the above']
        },

        {
            'heading': 'SDG 9 - Industry, Innovation and Infrastructure', 
            'link': 'https://www.youtube.com/embed/NU6rc_vm9rs',
            'targets': [

                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/9.1.svg', 'TARGET 9.1 DEVELOP SUSTAINABLE, RESILIENT AND INCLUSIVE INFRASTRUCTURES', 'Develop quality, reliable, sustainable and resilient infrastructure, including regional and transborder infrastructure, to support economic development and human well-being, with a focus on affordable and equitable access for all.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/9.2.svg', 'TARGET 9.2 PROMOTE INCLUSIVE AND SUSTAINABLE INDUSTRIALIZATION' , 'Promote inclusive and sustainable industrialization and, by 2030, significantly raise industry’s share of employment and gross domestic product, in line with national circumstances, and double its share in least developed countries.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/9.3.svg', 'TARGET 9.3 INCREASE ACCESS TO FINANCIAL SERVICES AND MARKETS', 'Increase the access of small-scale industrial and other enterprises, in particular in developing countries, to financial services, including affordable credit, and their integration into value chains and markets.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/9.4.svg', 'TARGET 9.4 UPGRADE ALL INDUSTRIES AND INFRASTRUCTURES FOR SUSTAINABILITY', 'By 2030, upgrade infrastructure and retrofit industries to make them sustainable, with increased resource-use efficiency and greater adoption of clean and environmentally sound technologies and industrial processes, with all countries taking action in accordance with their respective capabilities.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/9.5.svg', 'TARGET 9.5 ENHANCE RESEARCH AND UPGRADE INDUSTRIAL TECHNOLOGIES', 'Enhance scientific research, upgrade the technological capabilities of industrial sectors in all countries, in particular developing countries, including, by 2030, encouraging innovation and substantially increasing the number of research and development workers per 1 million people and public and private research and development spending.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/9.a.svg', 'TARGET 9.A FACILITATE SUSTAINABLE INFRASTRUCTURE DEVELOPMENT FOR DEVELOPING COUNTRIES', 'Facilitate sustainable and resilient infrastructure development in developing countries through enhanced financial, technological and technical support to African countries, least developed countries, landlocked developing countries and small island developing States.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/9.b.svg', 'TARGET 9.B SUPPORT DOMESTIC TECHNOLOGY DEVELOPMENT AND INDUSTRIAL DIVERSIFICATION', 'Support domestic technology development, research and innovation in developing countries, including by ensuring a conducive policy environment for, inter alia, industrial diversification and value addition to commodities.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/9.c.svg', 'TARGET 9.C UNIVERSAL ACCESS TO INFORMATION AND COMMUNICATIONS TECHNOLOGY' , 'Significantly increase access to information and communications technology and strive to provide universal and affordable access to the Internet in least developed countries by 2020.'],
            ],
            'questions': [
                ['What are the key factors to achieving this SDG?','Select an answer', 'Building/maintaining resilient infastructure and sustainable industrialisation, as well as encouraging innovation', 'Leaving it up to entrepreneurs to solve the problem', 'Leaving existing infastructure the way it is'],
                ['What systems/networks are most important for this SDG?','Select an answer', 'Quality water and electricity systems', 'Effective road networks', 'Advancements in the manufacturing sector', 'All of the above', 'WI-FI networks'],
                ['Which other SDG does SDG-9 relate to/benefit the most?','Select an answer', 'SDG - 13 Climate Action', 'SDG 12 - Responsible Consumption', 'SDG 16 - Peace, Justice and Strong Institutions'],
                ['What can you do to help achieve this SDG?','Select an answer', 'Purchasing groceries that are sustainably-sourced', 'Advocate for better transport options such as cycling networks and public transport', 'All of the above', 'Leave it up to the government'],   
            ],
            'answers': ['Building/maintaining resilient infastructure and sustainable industrialisation, as well as encouraging innovation', 'All of the above', 'SDG - 13 Climate Action', 'All of the above']
        },

        {
            'heading': 'SDG 10 - Reduce Inequalities', 
            'link': 'https://www.youtube.com/embed/UXZcLINRGw0',
            'targets': [

                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/10.1.svg', 'TARGET 10.1 REDUCE INCOME INEQUALITIES', 'By 2030, progressively achieve and sustain income growth of the bottom 40 per cent of the population at a rate higher than the national average.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/10.2.svg', 'TARGET 10.2 PROMOTE UNIVERSAL SOCIAL, ECONOMIC AND POLITICAL INCLUSION' , 'By 2030, empower and promote the social, economic and political inclusion of all, irrespective of age, sex, disability, race, ethnicity, origin, religion or economic or other status.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/10.3.svg', 'TARGET 10.3 ENSURE EQUAL OPPORTUNITIES AND END DISCRIMINATION', 'Ensure equal opportunity and reduce inequalities of outcome, including by eliminating discriminatory laws, policies and practices and promoting appropriate legislation, policies and action in this regard.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/10.4.svg', 'TARGET 10.4 ADOPT FISCAL AND SOCIAL POLICIES THAT PROMOTES EQUALITY', 'Adopt policies, especially fiscal, wage and social protection policies, and progressively achieve greater equality.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/10.5.svg', 'TARGET 10.5 IMPROVED REGULATION OF GLOBAL FINANCIAL MARKETS AND INSTITUTIONS', 'Improve the regulation and monitoring of global financial markets and institutions and strengthen the implementation of such regulations.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/10.6.svg', 'TARGET 10.6 ENHANCED REPRESENTATION FOR DEVELOPING COUNTRIES IN FINANCIAL INSTITUTIONS', 'Ensure enhanced representation and voice for developing countries in decision-making in global international economic and financial institutions in order to deliver more effective, credible, accountable and legitimate institutions.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/10.7.svg', 'TARGET 10.7 RESPONSIBLE AND WELL-MANAGED MIGRATION POLICIES', 'Facilitate orderly, safe, regular and responsible migration and mobility of people, including through the implementation of planned and well-managed migration policies.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/10.a.svg', 'TARGET 10.A SPECIAL AND DIFFERENTIAL TREATMENT FOR DEVELOPING COUNTRIES', 'Implement the principle of special and differential treatment for developing countries, in particular least developed countries, in accordance with World Trade Organization agreements.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/10.b.svg', 'TARGET 10.B ENCOURAGE DEVELOPMENT ASSISTANCE AND INVESTMENT IN LEAST DEVELOPED COUNTRIES', 'Encourage official development assistance and financial flows, including foreign direct investment, to States where the need is greatest, in particular least developed countries, African countries, small island developing States and landlocked developing countries, in accordance with their national plans and programmes.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/10.c.svg', 'TARGET 10.C REDUCE TRANSACTION COSTS FOR MIGRANT REMITTANCES' , 'By 2030, reduce to less than 3 per cent the transaction costs of migrant remittances and eliminate remittance corridors with costs higher than 5 per cent.'],
            ],
            'questions': [
                ['What is inequality?','Select an answer', 'An unfair distribution of wealth and resources', 'A fair distribution of wealth and resources', 'Neither of the above'],
                ['Changes to which fields will help reduce inequality?','Select an answer', 'Policies/Laws', 'Institutions', 'Social-cultural norms and practices', 'All of the above'],
                ['What further actions can be taken to help reduce inequality?','Select an answer', 'Improved healthcare and education', 'Equal pay', 'All of the above', 'Higher taxes on small business']
            ],
            'answers': ['An unfair distribution of wealth and resources', 'All of the above', 'All of the above']
        },

        {
            'heading': 'SDG 11 - Sustainable Cities and Communities', 
            'link': 'https://www.youtube.com/embed/Awu3JJC3A0k',
            'targets': [

                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/11.1.svg', 'TARGET 11.1 SAFE AND AFFORDABLE HOUSING', 'By 2030, ensure access for all to adequate, safe and affordable housing and basic services and upgrade slums.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/11.2.svg', 'TARGET 11.2 AFFORDABLE AND SUSTAINABLE TRANSPORT SYSTEMS' , 'By 2030, provide access to safe, affordable, accessible and sustainable transport systems for all, improving road safety, notably by expanding public transport, with special attention to the needs of those in vulnerable situations, women, children, persons with disabilities and older persons.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/11.3.svg', 'TARGET 11.3 INCLUSIVE AND SUSTAINABLE URBANIZATION', 'By 2030, enhance inclusive and sustainable urbanization and capacity for participatory, integrated and sustainable human settlement planning and management in all countries.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/11.4.svg', 'TARGET 11.4 PROTECT THE WORLD’S CULTURAL AND NATURAL HERITAGE', 'Strengthen efforts to protect and safeguard the world’s cultural and natural heritage.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/11.5.svg', 'TARGET 11.5 REDUCE THE ADVERSE EFFECTS OF NATURAL DISASTERS', 'By 2030, significantly reduce the number of deaths and the number of people affected and substantially decrease the direct economic losses relative to global gross domestic product caused by disasters, including water-related disasters, with a focus on protecting the poor and people in vulnerable situations.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/11.6.svg', 'TARGET 11.6 REDUCE THE ENVIRONMENTAL IMPACT OF CITIES', 'By 2030, reduce the adverse per capita environmental impact of cities, including by paying special attention to air quality and municipal and other waste management.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/11.7.svg', 'TARGET 11.7 PROVIDE ACCESS TO SAFE AND INCLUSIVE GREEN AND PUBLIC SPACES', 'By 2030, provide universal access to safe, inclusive and accessible, green and public spaces, in particular for women and children, older persons and persons with disabilities.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/11.a.svg', 'TARGET 11.A STRONG NATIONAL AND REGIONAL DEVELOPMENT PLANNING', 'Support positive economic, social and environmental links between urban, peri-urban and rural areas by strengthening national and regional development planning.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/11.b.svg', 'TARGET 11.B IMPLEMENT POLICIES FOR INCLUSION, RESOURCE EFFICIENCY AND DISASTER RISK REDUCTION' , 'By 2020, substantially increase the number of cities and human settlements adopting and implementing integrated policies and plans towards inclusion, resource efficiency, mitigation and adaptation to climate change, resilience to disasters, and develop and implement, in line with the Sendai Framework for Disaster Risk Reduction 2015–2030, holistic disaster risk management at all levels.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/11.c.svg', 'TARGET 11.C SUPPORT LEAST DEVELOPED COUNTRIES IN SUSTAINABLE AND RESILIENT BUILDING' , 'Support least developed countries, including through financial and technical assistance, in building sustainable and resilient buildings utilizing local materials.'],
            ],

            'questions': [
                ['What should a sustainable city be?','Select an answer', 'Inclusive', 'Safe and resilient', 'Environmentally sustainable', 'All of the above'],
                ['What else should a sustainable city have?','Select an answer', 'Employment, access to public transport, and green spaces', 'Dependence on non-renewable energy sources', 'Minimal walking/cycling paths'],
                ['What can you do to help achieve this SDG?','Select an answer', 'Reduce your car emissions by riding your bike more often', 'Reduce the number of new clothing items you buy', 'All of the above', 'Continue living the way you are. Everything is going just fine!'],
            ],
            'answers': ['All of the above', 'Employment, access to public transport, and green spaces', 'All of the above']
        },

        {
            'heading': 'SDG 12 - Responsible Consumption', 
            'link': 'https://www.youtube.com/embed/RX2elsVjY-c',
            'targets': [

                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/12.1.svg', 'TARGET 12.1 IMPLEMENT THE 10-YEAR SUSTAINABLE CONSUMPTION AND PRODUCTION FRAMEWORK', 'Implement the 10‑Year Framework of Programmes on Sustainable Consumption and Production Patterns, all countries taking action, with developed countries taking the lead, taking into account the development and capabilities of developing countries.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/12.2.svg', 'TARGET 12.2 SUSTAINABLE MANAGEMENT AND USE OF NATURAL RESOURCES' , 'By 2030, achieve the sustainable management and efficient use of natural resources.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/12.3.svg', 'TARGET 12.3 HALVE GLOBAL PER CAPITA FOOD WASTE', 'By 2030, halve per capita global food waste at the retail and consumer levels and reduce food losses along production and supply chains, including post-harvest losses.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/12.4.svg', 'TARGET 12.4 RESPONSIBLE MANAGEMENT OF CHEMICALS AND WASTE', 'By 2020, achieve the environmentally sound management of chemicals and all wastes throughout their life cycle, in accordance with agreed international frameworks, and significantly reduce their release to air, water and soil in order to minimize their adverse impacts on human health and the environment.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/12.5.svg', 'TARGET 12.5 SUBSTANTIALLY REDUCE WASTE GENERATION', 'By 2030, substantially reduce waste generation through prevention, reduction, recycling and reuse.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/12.6.svg', 'TARGET 12.6 ENCOURAGE COMPANIES TO ADOPT SUSTAINABLE PRACTICES AND SUSTAINABILITY REPORTING', 'Encourage companies, especially large and transnational companies, to adopt sustainable practices and to integrate sustainability information into their reporting cycle.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/12.7.svg', 'TARGET 12.7 PROMOTE SUSTAINABLE PUBLIC PROCUREMENT PRACTICES', 'Promote Sustainable Public Procurement Practices'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/12.8.svg', 'TARGET 12.8 PROMOTE UNIVERSAL UNDERSTANDING OF SUSTAINABLE LIFESTYLES', 'By 2030, ensure that people everywhere have the relevant information and awareness for sustainable development and lifestyles in harmony with nature.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/12.a.svg', 'TARGET 12.A SUPPORT DEVELOPING COUNTRIES SCIENTIFIC AND TECHNOLOGICAL CAPACITY FOR SUSTAINABLE CONSUMPTION AND PRODUCTION', 'Support developing countries to strengthen their scientific and technological capacity to move towards more sustainable patterns of consumption and production.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/12.b.svg', 'TARGET 12.B DEVELOP AND IMPLEMENT TOOLS TO MONITOR SUSTAINABLE TOURISM' , 'Develop and implement tools to monitor sustainable development impacts for sustainable tourism that creates jobs and promotes local culture and products.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/12.c.svg', 'TARGET 12.C REMOVE MARKET DISTORTIONS THAT ENCOURAGE WASTEFUL CONSUMPTION' , 'Rationalize inefficient fossil-fuel subsidies that encourage wasteful consumption by removing market distortions, in accordance with national circumstances, including by restructuring taxation and phasing out those harmful subsidies, where they exist, to reflect their environmental impacts, taking fully into account the specific needs and conditions of developing countries and minimizing the possible adverse impacts on their development in a manner that protects the poor and the affected communities.'],
            ],


            'questions': [
                ['We must reduce our current CO2 emissions by 70% before 2050, in order to prevent a further global temperature rise. Is this statement true or false?','Select an answer', 'True', 'False'],
                ['Which of the following is NOT a target this SDG aims to achieve?','Select an answer', 'Achieve the sustainable management and efficient use of natural resources', 'By 2030, halve per capita global food waste', 'Substantially reduce waste generation through prevention, reduction, recycling and reuse.', 'By 2030, all cars must be electric.'],
                ['Managing chemical waste in an envrionmentally-friendly way i.e. reducing their release into the air, water and soil is a target of this SDG. True or False?','Select an answer', 'True', 'False'], 
            ],
            'answers': ['True', 'By 2030, all cars must be electric.', 'True']
        },

        {
            'heading': 'SDG 13 - Climate Action', 
            'link': 'https://www.youtube.com/embed/xznlCuhqfOI',
            'targets': [

                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/13.1.svg', 'TARGET 13.1 STRENGTHEN RESILIENCE AND ADAPTIVE CAPACITY TO CLIMATE RELATED DISASTERS', 'Strengthen resilience and adaptive capacity to climate-related hazards and natural disasters in all countries.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/13.2.svg', 'TARGET 13.2 INTEGRATE CLIMATE CHANGE MEASURES INTO POLICIES AND PLANNING' , 'Integrate climate change measures into national policies, strategies and planning.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/13.3.svg', 'TARGET 13.3 BUILD KNOWLEDGE AND CAPACITY TO MEET CLIMATE CHANGE', 'Improve education, awareness-raising and human and institutional capacity on climate change mitigation, adaptation, impact reduction and early warning.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/13.a.svg', 'TARGET 13.A IMPLEMENT THE UN FRAMEWORK CONVENTION ON CLIMATE CHANGE' , 'Implement the commitment undertaken by developed-country parties to the United Nations Framework Convention on Climate Change to a goal of mobilizing jointly $100 billion annually by 2020 from all sources to address the needs of developing countries in the context of meaningful mitigation actions and transparency on implementation and fully operationalize the Green Climate Fund through its capitalization as soon as possible.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/13.b.svg', 'TARGET 13.B PROMOTE MECHANISMS TO RAISE CAPACITY FOR PLANNING AND MANAGEMENT' , 'Promote mechanisms for raising capacity for effective climate change-related planning and management in least developed countries and small island developing States, including focusing on women, youth and local and marginalized communities.'],
            ],


            'questions': [
                ['What important actions must be taken to address climate change?','Select an answer', 'Integrating climate change measures into national policies, strategies and planning.', 'Strengthening resilience and adaptive capacity to climate-related natural disasters around the world.', 'All of the above', 'Increased dependence on non-renewable energy sources'],
                ['What can you do to help achieve this SDG?','Select an answer', 'Reduce car use', 'Reduce food waste', 'Eliminate meat from your diet', 'All of the above'],
                ['Climate action is the responsibility of governments and policy-makers, and NOT the average person. Is this statement True or False?','Select an answer', 'True', 'False'], 
            ],
            'answers': ['All of the above', 'All of the above', 'False']
        },

        {
            'heading': 'SDG 14 - Life below Water', 
            'link': 'https://www.youtube.com/embed/u75w751uzoQ',
            'targets': [

                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/14.1.svg', 'TARGET 14.1 REDUCE MARINE POLLUTION', 'By 2025, prevent and significantly reduce marine pollution of all kinds, in particular from land-based activities, including marine debris and nutrient pollution.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/14.2.svg', 'TARGET 14.2 PROTECT AND RESTORE ECOSYSTEMS' , 'By 2020, sustainably manage and protect marine and coastal ecosystems to avoid significant adverse impacts, including by strengthening their resilience, and take action for their restoration in order to achieve healthy and productive oceans.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/14.3.svg', 'TARGET 14.3 REDUCE OCEAN ACIDIFICATION', 'Minimize and address the impacts of ocean acidification, including through enhanced scientific cooperation at all levels.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/14.4.svg', 'TARGET 14.4 SUSTAINABLE FISHING', 'By 2020, effectively regulate harvesting and end overfishing, illegal, unreported and unregulated fishing and destructive fishing practices and implement science-based management plans, in order to restore fish stocks in the shortest time feasible, at least to levels that can produce maximum sustainable yield as determined by their biological characteristics.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/14.5.svg', 'TARGET 14.5 CONSERVE COASTAL AND MARINE AREAS', 'By 2020, conserve at least 10 per cent of coastal and marine areas, consistent with national and international law and based on the best available scientific information.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/14.6.svg', 'TARGET 14.6 END SUBSIDIES CONTRIBUTING TO OVERFISHING', 'By 2020, prohibit certain forms of fisheries subsidies which contribute to overcapacity and overfishing, eliminate subsidies that contribute to illegal, unreported and unregulated fishing and refrain from introducing new such subsidies, recognizing that appropriate and effective special and differential treatment for developing and least developed countries should be an integral part of the World Trade Organization fisheries subsidies negotiation.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/14.7.svg', 'TARGET 14.7 INCREASE THE ECONOMIC BENEFITS FROM SUSTAINABLE USE OF MARINE RESOURCES', 'By 2030, increase the economic benefits to small island developing States and least developed countries from the sustainable use of marine resources, including through sustainable management of fisheries, aquaculture and tourism.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/14.a.svg', 'TARGET 14.A INCREASE SCIENTIFIC KNOWLEDGE, RESEARCH AND TECHNOLOGY FOR OCEAN HEALTH', 'Increase scientific knowledge, develop research capacity and transfer marine technology, taking into account the Intergovernmental Oceanographic Commission Criteria and Guidelines on the Transfer of Marine Technology, in order to improve ocean health and to enhance the contribution of marine biodiversity to the development of developing countries, in particular small island developing States and least developed countries.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/14.b.svg', 'TARGET 14.B SUPPORT SMALL SCALE FISHERS' , 'Provide access for small-scale artisanal fishers to marine resources and markets.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/14.c.svg', 'TARGET 14.C IMPLEMENT AND ENFORCE INTERNATIONAL SEA LAW' , 'Enhance the conservation and sustainable use of oceans and their resources by implementing international law as reflected in the United Nations Convention on the Law of the Sea, which provides the legal framework for the conservation and sustainable use of oceans and their resources, as recalled in paragraph 158 of “The future we want”.'],
            ],


            'questions': [
                ['What type of marine pollution is most common in waterways and needs to be reduced?','Select an answer', 'Oil', 'Sulfur', 'Plastic', 'None of the above'],
                ['Overfishing and unregulated/destructive fishing practices are harmful to life below water. Is this statement True or False','Select an answer', 'True', 'False'],
                ['What can you do to help achieve the targets of this SDG?','Select an answer', 'Substitute single-use plastic bags for re-usable ones', 'Replace single-use bottles with a re-usable one', 'All of the above'],  
            ],

            'answers': ['Plastic', 'True', 'All of the above']
        },

        {
            'heading': 'SDG 15 - Life on Land', 
            'link': 'https://www.youtube.com/embed/N5YR2GMhYcI',
            'targets': [

                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/15.1.svg', 'TARGET 15.1 CONSERVE AND RESTORE TERRESTRIAL AND FRESHWATER ECOSYSTEMS', 'By 2020, ensure the conservation, restoration and sustainable use of terrestrial and inland freshwater ecosystems and their services, in particular forests, wetlands, mountains and drylands, in line with obligations under international agreements.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/15.2.svg', 'TARGET 15.2 END DEFORESTATION AND RESTORE DEGRADED FORESTS' , 'By 2020, promote the implementation of sustainable management of all types of forests, halt deforestation, restore degraded forests and substantially increase afforestation and reforestation globally.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/15.3.svg', 'TARGET 15.3 END DESERTIFICATION AND RESTORE DEGRADED LAND', 'By 2030, combat desertification, restore degraded land and soil, including land affected by desertification, drought and floods, and strive to achieve a land degradation-neutral world.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/15.4.svg', 'TARGET 15.4 ENSURE CONSERVATION OF MOUNTAIN ECOSYSTEMS', 'By 2030, ensure the conservation of mountain ecosystems, including their biodiversity, in order to enhance their capacity to provide benefits that are essential for sustainable development.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/15.5.svg', 'TARGET 15.5 PROTECT BIODIVERSITY AND NATURAL HABITATS', 'Take urgent and significant action to reduce the degradation of natural habitats, halt the loss of biodiversity and, by 2020, protect and prevent the extinction of threatened species.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/15.6.svg', 'TARGET 15.6 PROMOTE ACCESS TO GENETIC RESOURCES AND FAIR SHARING OF THE BENEFITS', 'Promote fair and equitable sharing of the benefits arising from the utilization of genetic resources and promote appropriate access to such resources, as internationally agreed.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/15.7.svg', 'TARGET 15.7 ELIMINATE POACHING AND TRAFFICKING OF PROTECTED SPECIES', 'Take urgent action to end poaching and trafficking of protected species of flora and fauna and address both demand and supply of illegal wildlife products.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/15.8.svg', 'TARGET 15.8 PREVENT INVASIVE ALIEN SPECIES ON LAND AND IN WATER ECOSYSTEMS', 'By 2020, introduce measures to prevent the introduction and significantly reduce the impact of invasive alien species on land and water ecosystems and control or eradicate the priority species.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/15.9.svg', 'TARGET 15.9 INTEGRATE ECOSYSTEM AND BIODIVERSITY IN GOVERNMENTAL PLANNING', 'By 2020, integrate ecosystem and biodiversity values into national and local planning, development processes, poverty reduction strategies and accounts.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/15.a.svg', 'TARGET 15.A TIINCREASE FINANCIAL RESOURCES TO CONSERVE AND SUSTAINABLY USE ECOSYSTEM AND BIODIVERSITYTLE', 'Mobilize and significantly increase financial resources from all sources to conserve and sustainably use biodiversity and ecosystems.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/15.b.svg', 'TARGET 15.B FINANCE AND INCENTIVIZE SUSTAINABLE FOREST MANAGEMENT' , 'Mobilize significant resources from all sources and at all levels to finance sustainable forest management and provide adequate incentives to developing countries to advance such management, including for conservation and reforestation.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/15.c.svg', 'TARGET 15.C COMBAT GLOBAL POACHING AND TRAFFICKING' , 'Enhance global support for efforts to combat poaching and trafficking of protected species, including by increasing the capacity of local communities to pursue sustainable livelihood opportunities.'],
            ],


            'questions': [
                ['What is deforestation and why is it important to stop?','Select an answer', 'It is the process of clearing forested land. It needs to stop as the ecosystems of living animals is being destroyed, giving them no place to live. It also reduced the number of trees that remove harmful CO2 from the air', 'It is the process of converting a forest into a city', 'It is the process of planting more trees.', 'None of the above'],
                ['Ending the poaching/killing of animals is NOT a target of this SDG. Is this statement True or False?','Select an answer', 'True', 'False'],
                ['The conservation of mountain ecosystems is an important target of this SDG. Is this statement True or False?','Select an answer', 'True', 'False'],
                ['Deforestation occurs due to demands for meat i.e. cattle needing to eat grass, have space to live etc. Is this statement True or False?','Select an answer', 'True', 'False'],   
            ],

            'answers': ['It is the process of clearing forested land. It needs to stop as the ecosystems of living animals is being destroyed, giving them no place to live. It also reduced the number of trees that remove harmful CO2 from the air', 'False', 'True', 'True']
        },
        
        {
            'heading': 'SDG 16 - Peace, Justice and Strong Institutions', 
            'link': '',
            'targets': [

                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/16.1.svg', 'TARGET 16.1 REDUCE VIOLENCE EVERYWHERE', 'Significantly reduce all forms of violence and related death rates everywhere.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/16.2.svg', 'TARGET 16.2 PROTECT CHILDREN FROM ABUSE, EXPLOITATION, TRAFFICKING AND VIOLENCE' , 'End abuse, exploitation, trafficking and all forms of violence against and torture of children.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/16.3.svg', 'TARGET 16.3 PROMOTE THE RULE OF LAW AND ENSURE EQUAL ACCESS TO JUSTICE', 'Promote the rule of law at the national and international levels and ensure equal access to justice for all.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/16.4.svg', 'TARGET 16.4 COMBAT ORGANIZED CRIME AND ILLICIT FINANCIAL AND ARMS FLOWS', 'By 2030, significantly reduce illicit financial and arms flows, strengthen the recovery and return of stolen assets and combat all forms of organized crime.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/16.5.svg', 'TARGET 16.5 SUBSTANTIALLY REDUCE CORRUPTION AND BRIBERY', 'Substantially Reduce Corruption and Bribery'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/16.6.svg', 'TARGET 16.6 DEVELOP EFFECTIVE, ACCOUNTABLE AND TRANSPARENT INSTITUTIONS', 'Develop effective, accountable and transparent institutions at all levels.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/16.7.svg', 'TARGET 16.7 ENSURE RESPONSIVE, INCLUSIVE AND REPRESENTATIVE DECISION-MAKING', 'Ensure responsive, inclusive, participatory and representative decision-making at all levels.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/16.8.svg', 'TARGET 16.8 STRENGTHEN THE PARTICIPATION IN GLOBAL GOVERNANCE', 'Broaden and strengthen the participation of developing countries in the institutions of global governance.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/16.9.svg', 'TARGET 16.9 PROVIDE UNIVERSAL LEGAL IDENTITY', 'By 2030, provide legal identity for all, including birth registration.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/16.10.svg', 'TARGET 16.10 ENSURE PUBLIC ACCESS TO INFORMATION AND PROTECT FUNDAMENTAL FREEDOMS', 'Ensure public access to information and protect fundamental freedoms, in accordance with national legislation and international agreements.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/16.a.svg', 'TARGET 16.A STRENGTHEN NATIONAL INSTITUTIONS TO PREVENT VIOLENCE AND COMBAT TERRORISM AND CRIME', 'Strengthen relevant national institutions, including through international cooperation, for building capacity at all levels, in particular in developing countries, to prevent violence and combat terrorism and crime.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/16.b.svg', 'TARGET 16.B PROMOTE AND ENFORCE NON-DISCRIMINATORY LAWS AND POLICIES' , 'Promote and enforce non-discriminatory laws and policies for sustainable development.'],
            ],


            'questions': [
                ['A key target of this SDG is to reduce violence in general, as well as abuse, exploitation and trafficking of children. Is this statement True or False?','Select an answer', 'True', 'False'],
                ['A key target of this SDG is to reduce organized crime, corruption and bribery. Is this statement True or False ?','Select an answer', 'True', 'False'],
                ['A key target of this SDG is to provide access to legal identity for all, including birth registration. Is this statement True or False ?','Select an answer', 'True', 'False'],  
            ],

            'answers': ['True', 'True', 'True']
        },

        
        {
            'heading': 'SDG 17 - Peace, Justice and Strong Institutions', 
            'link': '',
            'targets': [

                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/17.1.svg', 'TARGET 17.1 MOBILIZE RESOURCES TO IMPROVE DOMESTIC REVENUE COLLECTION', 'Strengthen domestic resource mobilization, including through international support to developing countries, to improve domestic capacity for tax and other revenue collection.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/17.2.svg', 'TARGET 17.2 IMPLEMENT ALL DEVELOPMENT ASSISTANCE COMMITMENTS' , 'Developed countries to implement fully their official development assistance commitments, including the commitment by many developed countries to achieve the target of 0.7 per cent of gross national income for official development assistance (ODA/GNI) to developing countries and 0.15 to 0.20 per cent of ODA/GNI to least developed countries; ODA providers are encouraged to consider setting a target to provide at least 0.20 per cent of ODA/GNI to least developed countries.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/17.3.svg', 'TARGET 17.3 MOBILIZE FINANCIAL RESOURCES FOR DEVELOPING COUNTRIES', 'Mobilize additional financial resources for developing countries from multiple sources.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/17.4.svg', 'TARGET 17.4 ASSIST DEVELOPING COUNTRIES IN ATTAINING DEBT SUSTAINABILITY', 'Assist developing countries in attaining long-term debt sustainability through coordinated policies aimed at fostering debt financing, debt relief and debt restructuring, as appropriate, and address the external debt of highly indebted poor countries to reduce debt distress.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/17.5.svg', 'TARGET 17.5 INVEST IN LEAST DEVELOPED COUNTRIES', 'Adopt and implement investment promotion regimes for least developed countries.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/17.6.svg', 'TARGET 17.6 KNOWLEDGE SHARING AND COOPERATION FOR ACCESS TO SCIENCE, TECHNOLOGY AND INNOVATION', 'Enhance North-South, South-South and triangular regional and international cooperation on and access to science, technology and innovation and enhance knowledge sharing on mutually agreed terms, including through improved coordination among existing mechanisms, in particular at the United Nations level, and through a global technology facilitation mechanism.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/17.7.svg', 'TARGET 17.7 PROMOTE SUSTAINABLE TECHNOLOGIES TO DEVELOPING COUNTRIES', 'Promote the development, transfer, dissemination and diffusion of environmentally sound technologies to developing countries on favourable terms, including on concessional and preferential terms, as mutually agreed.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/17.8.svg', 'TARGET 17.8 STRENGTHEN THE SCIENCE, TECHNOLOGY AND INNOVATION CAPACITY FOR LEAST DEVELOPED COUNTRIES' , 'Fully operationalize the technology bank and science, technology and innovation capacity-building mechanism for least developed countries by 2017 and enhance the use of enabling technology, in particular information and communications technology.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/17.9.svg', 'TARGET 17.9 ENHANCE SDG CAPACITY IN DEVELOPING COUNTRIES', 'Enhance international support for implementing effective and targeted capacity-building in developing countries to support national plans to implement all the Sustainable Development Goals, including through North-South, South-South and triangular cooperation.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/17.10.svg', 'TARGET 17.10 PROMOTE A UNIVERSAL TRADING SYSTEM UNDER THE WTO' , 'Promote a universal, rules-based, open, non-discriminatory and equitable multilateral trading system under the World Trade Organization, including through the conclusion of negotiations under its Doha Development Agenda.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/17.11.svg', 'TARGET 17.11 INCREASE THE EXPORTS OF DEVELOPING COUNTRIES', 'Significantly increase the exports of developing countries, in particular with a view to doubling the least developed countries’ share of global exports by 2020.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/17.12.svg', 'TARGET 17.12 REMOVE TRADE BARRIERS FOR LEAST DEVELOPED COUNTRIES', 'Realize timely implementation of duty-free and quota-free market access on a lasting basis for all least developed countries, consistent with World Trade Organization decisions, including by ensuring that preferential rules of origin applicable to imports from least developed countries are transparent and simple, and contribute to facilitating market access.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/17.13.svg', 'TARGET 17.13 ENHANCE GLOBAL MACROECONOMIC STABILITY', 'Enhance global macroeconomic stability, including through policy coordination and policy coherence.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/17.14.svg', 'TARGET 17.14 ENHANCE POLICY COHERENCE FOR SUSTAINABLE DEVELOPMENT', 'Enhance policy coherence for sustainable development.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/17.15.svg', 'TARGET 17.15 RESPECT NATIONAL LEADERSHIP TO IMPLEMENT POLICIES FOR THE SUSTAINABLE DEVELOPMENT GOALS', 'Respect each country’s policy space and leadership to establish and implement policies for poverty eradication and sustainable development.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/17.16.svg', 'TARGET 17.16 ENHANCE THE GLOBAL PARTNERSHIP FOR SUSTAINABLE DEVELOPMENT' , 'Enhance the Global Partnership for Sustainable Development, complemented by multi-stakeholder partnerships that mobilize and share knowledge, expertise, technology and financial resources, to support the achievement of the Sustainable Development Goals in all countries, in particular developing countries.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/17.17.svg', 'TARGET 17.17 ENCOURAGE EFFECTIVE PARTNERSHIPS', 'Encourage and promote effective public, public-private and civil society partnerships, building on the experience and resourcing strategies of partnerships.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/17.18.svg', 'TARGET 17.18 ENHANCE AVAILABILITY OF RELIABLE DATA' , 'By 2020, enhance capacity-building support to developing countries, including for least developed countries and small island developing States, to increase significantly the availability of high-quality, timely and reliable data disaggregated by income, gender, age, race, ethnicity, migratory status, disability, geographic location and other characteristics relevant in national contexts.'],
                ['https://cdt-static-content.s3-ap-southeast-2.amazonaws.com/SDG+Toolkit/17.19.svg', 'TARGET 17.19 FURTHER DEVELOP MEASUREMENTS OF PROGRESS' , 'By 2030, build on existing initiatives to develop measurements of progress on sustainable development that complement gross domestic product, and support statistical capacity-building in developing countries.'],
            ],

            'questions': [
                ['Making financial resources more accessible for developing countries is a key target of this SDG. Is this statement True or False?','Select an answer', 'True', 'False'],
                ['Strengthening developing countries in the areas of science, technology and innovation is a key target of this SDG. Is this statement True or False?','Select an answer', 'True', 'False'],
                ['Increasing the exports of developing countries, as well as removing trade barriers, is a key target of this SDG. Is this statement True or False?','Select an answer', 'True', 'False'], 
            ],

            'answers': ['True', 'True', 'True']
        },
    ]

    React.useEffect(() => {

        if (arraysEqual(sdg_data[sdg_index-1]['answers'],selectedAnswers)){
            set_completed(true)
        }

    },[selectedAnswers])

    function arraysEqual(a1,a2) {
        /* WARNING: arrays must not contain {objects} or behavior may be undefined */
        return JSON.stringify(a1)==JSON.stringify(a2);
    }


    function handleModuleSubmission(){

        //call the API and update user stats to indicate they completed the module
        //give user 5 points

        getData('user_id')
        .then (token_value => {
            fetch(`https://mysustainability-api-123.herokuapp.com/updateModuleProgress/?userEmail=${token_value}&sdg=${String(sdg_index)}`, {method: 'POST'})
            .then(res => res.json())
            .then(res_JSON => {
                //console.log(res_JSON)
                fetch(`https://mysustainability-api-123.herokuapp.com/updatePoints/?points=${'5'}&userEmail=${token_value}`, {method: 'POST'})
                    .then(response => response.json())
                    .then(finalResp => {
                        if (finalResp['message'] === 'user stats successfully updated'){
                            navigation.navigate('Learn', { replace: true })
                        }
                    })
            })      
        })
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
                                <Text style={{fontSize:22, fontWeight:'bold', textAlign:'center'}}>{sdg_data[sdg_index-1]['heading']}</Text>
                                <p/>

                                {sdg_data[sdg_index-1]['link'].length > 0 ? 
                                    <div>

                                        <iframe width={isMobile_v2 ? "350" : "600"} height={isMobile_v2 ? "250" : "300"} src={sdg_data[sdg_index-1]['link']}></iframe>

                                    </div>
                                    : ''
                                }

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
                                
                                {modules_completed.includes(String(sdg_index)) ?     
                                    ''
                                    :
                                    <>
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
                                    
                                    </>
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