import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #103379;
`;

export const Input = styled.TextInput`
  width: 290px;
  height: 40px;
  margin-top: 15px;
  background-color: #fff;
  padding: 0 20px;
  border-radius: 5px;
`;
export const Logo = styled.Image`
	width:300px;
	height: 300px;

`;export const Button = styled.TouchableOpacity`
width: 290px;
height: 40px;
margin-top: 15px;
background-color: #bcdeef;
border-radius: 5px;
align-items: center;
justify-content: center;
`;

export const ButtonText = styled.Text`
  color: #1b1b1b;
  font-size: 18px;
  font-weight: bold;
  font-family: sans-serif;
`;