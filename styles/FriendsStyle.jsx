import React from 'react';
import styled from 'styled-components/native';
import {StyledCard} from './GeneralStyles';

export const ResultsContainer = styled(StyledCard)`
    border-radius: 5px;
    display: flex; 
    flex-direction: column;
    height:70%;
    background-color: white;
    margin-top: 0;
    padding: 0;
`;
export const Tab = styled.View`
    border: 1px solid black;
    width: 100%;
    height:100%;
    flex: 1;
    padding:5px;
`;

export const TabTitle = styled.Text`
    font-size: 17px;
    font-weight: bold;
`;

export const TabContainer = styled.View`
    display:flex;
    flex-direction: row;
`;

export const ResultContent = styled.ScrollView`
    height: 76%;
    display: flex; 
    flex-direction: column;
`;

export const FriendsListCard = styled.View`
    border: 2px solid #5F5AA2;
    margin: 10px;
    padding-left: 15px;
    padding-right: 15px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
`;

export const ProfileImg = styled.Image`
    width: 60px;
    height: 60px;
`;
