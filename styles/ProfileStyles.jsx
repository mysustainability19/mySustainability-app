import styled from 'styled-components/native';
import {StyledCard} from './GeneralStyles';

export const ProfileHeader = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
`;

export const SettingsHeader = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const InterestContainer = styled(StyledCard)`
    margin:20px;
    padding: 10px;
    border-radius: 10px;
`;

export const FlexContainer = styled.View`
    display: flex; 
    flex-direction: row;
    background-color: #555770;
    flex-wrap: wrap;
    border-radius: 5px;
    padding: 5px;
`;
export const ChipContainer = styled.View`
    margin: 5px;
`;

export const EditTitle = styled.Text`
    font-weight: bold;
    font-size: 20px;
`;

export const ProfileTitle = styled.Text`
    font-weight: bold;
    font-size: 30px;
    text-align: center;
`;

export const InputDiv = styled.View`
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
`;

export const Banner = styled.Image`
    width:100%;
    height: 150px;
`;

export const CardContainer = styled(StyledCard)`
    margin-top: 10px;
    margin-bottom: 15px;
    border-radius: 10px;
    padding: 0;
`;