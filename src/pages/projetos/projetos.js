import React, { useState, useEffect, useCallback } from 'react';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import api from '../../services/api';
import { useAuth } from '../hooks/auth'
import { ScrollView } from 'react-native';

import { View } from 'react-native'


import {
  Container,
  Title,
  Input,
  Button,
  ButtonSair,
  BtnDetalhes,
  BtnText,
  ButtonText,
  FormAddNewTask,
  Tasks,
  Task,
  TaskText,
  TaskAction,
  ErroMessage
} from './styles';


const Projetos = ({ navigation }) => {
  const { signOut } = useAuth();
  const [projetos, setProjetos] = useState([]);
  const [newProjeto, setNewProjeto] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const loadProjetos = useCallback(
    async () => {
      const response = await api.get(`projetos`);
      setProjetos(response.data);
    }
  );

  useEffect(() => {
    loadProjetos();
  }, []);

  const handleAddProjeto = useCallback(
    async () => {
      if (newProjeto === "") {
        setErrorMessage("Digite o Projeto a ser adicionado");
        return;
      }

      setErrorMessage("");

      const params = {
        descricao: newProjeto,
        concluido: false
      };

      try {
        await api.post(`projetos`, params);

        loadProjetos();
        setNewProjeto("");
      } catch (error) {
        console.log("error handleAddProjeto:", error);

        setErrorMessage("Ocorreu um erro ao adicionar o Projeto");
      }
    }, [loadProjetos, newProjeto],
  );

  const handleProjeto = useCallback(
    async (projeto) => {
      const params = {
        ...projeto,
        concluido: !projeto.concluido
      }

      await api.put(`projetos/${projeto.id}`, params);

      loadProjetos();
    }, [loadProjetos],
  );

  const removeProjeto = useCallback(
    async (projeto) => {
      try {
        await api.delete(`projetos/${projeto.id}/?_embed=tarefas`);
      } catch (error) {
        console.log('delete project error', error)
      }

      loadProjetos();
    }, [loadProjetos],
  );

  return (
    <Container> 
      <View style={{flexDirection: 'row', marginTop: 20, marginBottom: 15, alignItems: 'center'}}>

        <Title>Projetos</Title>
       
        <View style={{ marginLeft: 'auto', justifyContent: 'center', alignItems: 'center' }}>
          <Feather onPress={signOut} name='log-out' size={30} color='#fff'></Feather>
          <ButtonText style={{ color: '#fff', marginTop: 2 }}>Sair</ButtonText>
        </View>
      </View>
      <ScrollView>
      <FormAddNewTask>
        <Input
          value={newProjeto}
          onChangeText={text => setNewProjeto(text)}
          placeholder="Novo projeto"
          style={{ fontSize: 18 }}

        />
        <>
          <Button onPress={() => handleAddProjeto()}>
            <ButtonText>
              Criar
          </ButtonText>
          </Button>

        </>



      </FormAddNewTask>

      { !!errorMessage && (
        <ErroMessage>{errorMessage}</ErroMessage>
      )}

      <Tasks>
        {projetos.map(projeto => (
          <Task key={projeto.id}>
            <TaskText>{projeto.descricao}</TaskText>

            <BtnDetalhes onPress={() => navigation.navigate("Tarefas", { projetoId: projeto.id, projetoNome: projeto.descricao })}>
              <BtnText>Detalhes</BtnText>
            </BtnDetalhes>


            <TaskAction>
              {projeto.concluido ? (
                <>
                  <MaterialCommunityIcons
                    name="check-circle-outline"
                    color="#1b1b1b"
                    size={22}
                    onPress={() => handleProjeto(projeto)}
                  />
                  <MaterialCommunityIcons
                    name="delete-outline"
                    color="#1b1b1b"
                    size={22}
                    onPress={() => removeProjeto(projeto)}
                  />
                </>
              ) : (
                  <MaterialCommunityIcons
                    name="circle-outline"
                    color="#1b1b1b"
                    size={22}
                    onPress={() => handleProjeto(projeto)}
                  />
                )}

            </TaskAction>
          </Task>
        ))
        }
      </Tasks>
      </ScrollView>
    </Container>
  )
}

export default Projetos;