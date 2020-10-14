import styled from 'styled-components/native';


export const Container = styled.View`
  flex: 1;
  padding: 20px;
  justify-content: center;
  background-color: #103379;
`;

export const Title = styled.Text`
  font-size: 36px;
  color: #fff;
`;

export const Input = styled.TextInput`
  flex: 1;
  height: 40px;
  background-color: #fff;
  padding: 0 20px;
  border-radius: 5px;
`;

export const Button = styled.TouchableOpacity`
  width: 100px;
  height: 40px;
  background-color: #bcdeff;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
`;

export const ButtonText = styled.Text`
  color: #1b1b1b;
  font-size: 18px;
  font-weight: bold;
`;

export const BtnDetalhes = styled.TouchableOpacity`
  width: 65px;
  height: 30px;
  background-color: #103379;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
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
  margin-top: 20px;
`;

export const Tasks = styled.View`
  flex: 1;
  margin-top: 20px;
`;

export const Task = styled.View`
  background-color: #fff;
  margin-bottom: 10px;
  border-radius: 5px;
  padding: 10px;
  padding-right: 20px;
  justify-content: space-between;
  flex-direction: row;
`;

export const TaskText = styled.Text`
  font-size: 18px;
  color: #1b1b1b;
  width: 80%;
  padding: 2px;
  
`;

export const TaskAction = styled.View`
  flex-direction: row;
  align-items: center;
  
`;

export const ErroMessage = styled.Text`
  color: #ffff00;
  font-size: 14px;
  margin-top: 5px;
`;