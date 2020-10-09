import React, { useState, useEffect, useCallback } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import api from '../../services/api';
import  { useAuth } from '../hooks/auth'


import { 
  Container,
  Title,
  Input,
  Button,
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


const TarefasUsuarios = () => {
    const { user } = useAuth();
  
  const [tasks, setTasks] = useState([]);

  const loadTasks = useCallback(
    async () => {
      const response = await api.get(`/usuarios/${user.id}/?_embed=tarefas`);
      setTasks(response.data.tarefas);
    },[],
  );

  useEffect(() => {
    
    loadTasks();
  }, [loadTasks]);
 

  const handleTask = useCallback(
    async (task) => {
      const params = {
        ...task,
        concluido: !task.concluido
      }
  
      await api.put(`tarefas/${task.id}`, params);
  
      loadTasks();
    },[loadTasks],
  );

  const removeTask = useCallback(
    async (task) => {
      await api.delete(`tarefas/${task.id}`);

      loadTasks();
    },[loadTasks],
  );

  return (
    <Container>
      <Title>Tarefas {user.usuario}</Title>


      <Tasks>
        { tasks.map(task => (
          <Task key={task.id}>
            <TaskText>{task.descricao}</TaskText>

            {/* <BtnDetalhes onPress={() => navigation.navigate("Tarefas")}>
              <BtnText>Detalhes</BtnText>
            </BtnDetalhes>
           */}

            <TaskAction>
              { task.concluido ? (
                <>
                  <MaterialCommunityIcons 
                    name="delete-outline"
                    color="#3a3a3a"
                    size={22}
                    onPress={() => removeTask(task)}
                  />
                  <MaterialCommunityIcons 
                    name="check-circle-outline"
                    color="#3a3a3a"
                    size={22}
                    onPress={() => handleTask(task)}
                  />
                </>
              ) : (
                <MaterialCommunityIcons 
                  name="circle-outline"
                  color="#3a3a3a"
                  size={22}
                  onPress={() => handleTask(task)}
                />
              )}
              
            </TaskAction>
          </Task>
        ))
        }
      </Tasks>
    </Container>
  )
}

export default TarefasUsuarios;