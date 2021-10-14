import styled from 'styled-components/native';
import { Card } from "react-native-paper";
export const PhoneView = styled.SafeAreaView`
    width: 100%;
    height: 100%;
    background-color: #ECF0F1;
    margin: 0 0;
`;

export const BodyContainer = styled.View`
    padding: 3% 3%;
    height: 100%;
`;


export const Heading = styled.Text`
    font-size: 25px;
    color: #7D83FF;
    text-align: left;
    font-weight: bold;
`;

export const StyledCard = styled(Card)`
    border-radius: 8px;
    width: 90%;
    background-color: white;
    align-self: center;
    border-color: #808080;
    elevation: 10;
    padding: 20px;
    margin-top: 5%;
`;
