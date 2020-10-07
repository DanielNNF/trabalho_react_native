import React, {useState} from 'react'

import { useAuth } from '../hooks/auth';
import logoImg from '../../assets/logo.png';


import { Container, Input, Button, ButtonText, Logo } from './styles';

const Login = () => {
   const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


    
    const handleSubmit = async () => {
        if(!email) return;
        if(!password) return;
        
      try {
        await signIn({email:email, password:password});
        console.log("handleSubmit success");

      } catch (error) {
        console.log("handleSubmit error", error);
        console.log("Usuário ou senha não confere.");
      } 
    };

 
  return (
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

      <Button onPress={() => handleSubmit()}>
    
          <ButtonText>Acessar</ButtonText>
       
      </Button>

    </Container>
  )
}

export default Login;