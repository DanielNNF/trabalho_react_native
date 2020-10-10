import styled from 'styled-components/native';


export const Container = styled.View`
  flex: 1;
  padding: 20px;
  justify-content: center;
  background-color: #103379;
`;

export const Input = styled.TextInput`
  flex: 1;
  height: 40px;
  background-color: #fff;
  padding: 0 10px;
  border-radius: 5px;
`;

export const Button = styled.TouchableOpacity`
  width: 100px;
  height: 40px;
  background-color: #bcdeff;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
`;

export const ButtonSair = styled.TouchableOpacity`
  width: 100px;
  height: 40px;
  background-color: #bcdeff;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-top: 5px;

`;

export const ButtonText = styled.Text`
  color: #1b1b1b;
  font-size: 18px;
  font-weight: bold;
  font-family: sans-serif;
`;

export const BtnDetalhes = styled.TouchableOpacity`
  width: 70px;
  height: 30px;
  background-color: #103379;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  margin-left: 0px;
  flex-direction: row-reverse;
  margin-top: 5px;
`;

export const BtnText = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: bold;
`;



export const FormAddNewTask = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

export const Tasks = styled.View`
  flex: 1;
  margin-top: 10px;
`;

export const Task = styled.View`
  background-color: #fff;
  margin-bottom: 10px;
  border-radius: 5px;
  padding: 10px 10px;
  justify-content: space-between;
  flex-direction: column;
`;

export const TaskText = styled.Text`
  font-size: 18px;
  font-family: sans-serif;
  color: #1b1b1b;
  text-align: justify;
  
`;



export const TaskAction = styled.View`
  flex-direction: row-reverse;
  margin-top: -30px;
`;

export const ErroMessage = styled.Text`
  color: #ffff00;
  font-size: 14px;
  margin-top: 5px;
`;