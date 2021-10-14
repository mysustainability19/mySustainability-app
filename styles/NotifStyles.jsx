import styled from "styled-components/native";
import { StyledCard} from './GeneralStyles';

export const NotifInfo = styled.View``;

export const NotifControlDiv = styled.View`
  display: flex;
  flex-direction: row;
`;

// accept / decline
export const NotifControlText = styled.Text`
  text-align: center;
  color: black;
  font-weight: bold;
`;

export const NotifCardContainer = styled(StyledCard)`
  display: flex;
  border-radius: 10px;
  margin-top: 15px;
  background: #eeeeff;
  padding: 0;
  background-color: white;
`;
