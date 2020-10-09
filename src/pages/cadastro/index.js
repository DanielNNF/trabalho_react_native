import React,{useState} from 'react';
import logoImg from '../../assets/logo.png';
import Api from '../../services/api';




 import { Container, Input, Logo, Button, ButtonText } from './style';


  
const cadastro = ({navigation}) => {
//  const [cadastro, setCadastro] = useState([]);
  const [email, setEmail] = useState('');
 // const [nome, setNome] = useState('');
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  

  const handleSubmit = async() =>{
    if(!email && !password && !usuario) return;
   
    const params = {
      email:email, 
      password: password,
      usuario:usuario
    }
    await Api.post('usuarios', params)
    navigation.navigate('Login');

  }
  return(
    
    <Container>
      <Logo source={logoImg} />

      <Input 
        value = {email}
        onChangeText={text => setEmail(text)}
        placeholder="E-mail"
      />


      <Input 
        value={password}
        onChangeText={text => setPassword(text)}
        placeholder="Senha"
        secureTextEntry={true}
      />
      <Input 
        value = {usuario}
        onChangeText={text => setUsuario(text)}
        placeholder="Usuário"
      />

      <Button onPress={() => handleSubmit()}>
          <ButtonText>Cadastrar</ButtonText>
      </Button>
      <ButtonText onPress={()=> navigation.navigate("Login")}>Cadastrado? Voltei para Login</ButtonText>
           
    </Container>
  )
 }

export default cadastro;