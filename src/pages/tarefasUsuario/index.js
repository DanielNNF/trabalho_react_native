import React, { useState, useEffect, useCallback } from 'react';
import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { ScrollView, View } from 'react-native';
import api from '../../services/api';
import { useIsFocused } from '@react-navigation/native'
import { useAuth } from '../hooks/auth'


import {
  Container,
  Title,
  Tasks,
  Task,
  TaskText,
  TaskAction
} from './styles';


const TarefasUsuarios = () => {
  const isFocused = useIsFocused();
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  const loadTasks = useCallback(
    async () => {
      const response = await api.get(`/usuarios/${user.id}/?_embed=tarefas`);
      setTasks(response.data.tarefas);
    }, [],
  );

  useEffect(() => {
    loadTasks();
  }, [loadTasks, isFocused]);

  useEffect(() => {
    console.log(tasks.length)
  }, [tasks])


  const handleTask = useCallback(
    async (task) => {
      const params = {
        ...task,
        concluido: !task.concluido
      }

      await api.put(`tarefas/${task.id}`, params);

      loadTasks();
    }, [loadTasks],
  );

  const removeTask = useCallback(
    async (task) => {
      await api.delete(`tarefas/${task.id}`);

      loadTasks();
    }, [loadTasks],
  );

  return (
    <Container>
      <Title style={{ marginTop: 15 }}>Minhas Tarefas</Title>
      <ScrollView>

        <Tasks>

          {tasks.length ? tasks.map(task => (
            <Task key={task.id}>
              <View style={{ width: '85%' }}>

                <TaskText>{task.descricao}</TaskText>
                <TaskText>Projeto: {task.projetoNome}</TaskText>
              </View>



              <TaskAction>
                {task.concluido ? (
                  <>
                    <MaterialCommunityIcons
                      name="delete-outline"
                      color="#3a3a3a"
                      size={25}
                      onPress={() => removeTask(task)}
                    />
                    <MaterialCommunityIcons
                      name="check-circle-outline"
                      color="#3a3a3a"
                      size={25}
                      onPress={() => handleTask(task)}
                    />
                  </>
                ) : (
                    <MaterialCommunityIcons
                      name="circle-outline"
                      color="#3a3a3a"
                      size={25}
                      onPress={() => handleTask(task)}
                    />
                  )}

              </TaskAction>
            </Task>
          ))
            :
            <View style={{marginTop: 150, justifyContent: 'center', alignItems: 'center'}}>
              <Octicons style={{marginRight: 30}}name='tasklist' size={150} color='#fff'></Octicons>
              <Title style={{fontSize: 20}}>Nenhuma tarefa pendente</Title>
            </View>
          }
        </Tasks>
      </ScrollView>
    </Container>
  )
}

export default TarefasUsuarios;