import React, { useState } from 'react';
import logoImg from '../../assets/logo.png';
import Api from '../../services/api';
import {Text} from 'react-native';

import { Container, Input, Logo, Button, ButtonText } from './style';

const cadastro = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async () => {
    if (!email && !password && !usuario) return;

    const params = {
      email: email,
      password: password,
      usuario: usuario
    }
    await Api.post('usuarios', params)
    navigation.navigate('Login');

  }
  return (

    <Container>
      <Logo source={logoImg} />

      <Input
        value={email}
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
        value={usuario}
        onChangeText={text => setUsuario(text)}
        placeholder="Usuário"
      />

      <Button onPress={() => handleSubmit()}>
        <ButtonText>Cadastrar</ButtonText>
      </Button>
      <Button onPress={() => navigation.navigate("Login")}>
        <ButtonText style={{ fontFamily: 'sans-serif', fontSize: 18 }}>Cadastrado? Voltei para Login</ButtonText>
      </Button>
      <Button onPress={()=> navigation.navigate("Login")}>
        <ButtonText>Voltar para Login</ButtonText>
      </Button>     
    </Container>
  )
}

export default cadastro;