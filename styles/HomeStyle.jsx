import styled from 'styled-components/native';

export const TileHeading = styled.Text`
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 20px;
`;

export const RecommendationContainer = styled.View`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

export const RecCard = styled.View`
    display: flex;
    justify-content: center;
    width: 45%;
    height: 100px;
    border: 2px solid white;
    border-radius: 10px;
    padding: 5px;
    margin: 2.5%;
    background-color: #555770;
`;

export const RecCardText = styled.Text`
    font-size: 15px; 
    color: white;
    text-align: center;
    font-weight: bold;
    letter-spacing: 1px;
`;

export const MeetingCard = styled.View`
    display: flex;
    align-items: center;
    border: 2px solid #5F5AA2;
    width: 70px;
    height: 70px;
    border-radius: 5px;
`;

export const FriendTile = styled.View`
    display: flex;
    align-items: center;
    width: 80px;
    height: 100px;
    border-radius: 5px;
`;