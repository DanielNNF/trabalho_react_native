import React, { useState, useEffect, useCallback } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import api from '../../services/api';
import  { useAuth } from '../hooks/auth'


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


const Projetos = ({navigation}) => {
  const { signOut } = useAuth();
  const [projeto, setProjetos] = useState([]);
  const [newProjeto, setNewProjeto] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const loadProjetos = useCallback(
    async () => {
      const response = await api.get(`projetos`);
      setProjetos(response.data);
    },[],
  );

  useEffect(() => {
    loadProjetos();
  }, [loadProjetos]);

  const handleAddProjeto = useCallback(
    async () => {
      if(newProjeto === "") {
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
    },[loadProjetos, newProjeto],
  );

  const handleProjeto = useCallback(
    async (projeto) => {
      const params = {
        ...projeto,
        concluido: !projeto.concluido
      }
  
      await api.put(`projetos/${projeto.id}`, params);
  
      loadProjetos();
    },[loadProjetos],
  );

  const removeProjeto = useCallback(
    async (projeto) => {
      await api.delete(`projetos/${projeto.id}`);

      loadProjetos();
    },[loadProjetos],
  );

  return (
     <Container>
          

      <FormAddNewTask>
        <Input 
          value={newProjeto}
          onChangeText={text => setNewProjeto(text)}
          placeholder="Novo projeto"
          style={{fontSize: newProjeto ? 16 : 20}}

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
        { projeto.map(projeto => (
          <Task key={projeto.id}>
            <TaskText>{projeto.descricao}</TaskText>

            <BtnDetalhes onPress={() => navigation.navigate("Tarefas", {projetoId:projeto.id})}>
              <BtnText>Detalhes</BtnText>
            </BtnDetalhes>
          

            <TaskAction>
              { projeto.concluido ? (
                <>
                  <MaterialCommunityIcons 
                    name="delete-outline"
                    color="#3a3a3a"
                    size={22}
                    onPress={() => removeProjeto(projeto)}
                  />
                  <MaterialCommunityIcons 
                    name="check-circle-outline"
                    color="#3a3a3a"
                    size={22}
                    onPress={() => handleProjeto(projeto)}
                  />
                </>
              ) : (
                <MaterialCommunityIcons 
                  name="circle-outline"
                  color="#3a3a3a"
                  size={22}
                  onPress={() => handleProjeto(projeto)}
                />
              )}
              
            </TaskAction>
          </Task>
        ))
        }
      </Tasks>

        <ButtonSair onPress={signOut}>
             <ButtonText>Sair</ButtonText>
        </ButtonSair>
    </Container>
  )
}

export default Projetos;