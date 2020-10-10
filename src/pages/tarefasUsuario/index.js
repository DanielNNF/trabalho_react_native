import React, { useState, useEffect, useCallback } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import api from '../../services/api';
import {useIsFocused} from '@react-navigation/native'
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
      <Title style={{marginTop: 15}}>Minhas Tarefas</Title>


      <Tasks>

        {tasks.length ? tasks.map(task => (
          <Task key={task.id}>
            <TaskText>{task.descricao}</TaskText>


            <TaskAction>
              {task.concluido ? (
                <>
                  <MaterialCommunityIcons
                    name="check-circle-outline"
                    color="#3a3a3a"
                    size={22}
                    onPress={() => handleTask(task)}
                  />
                  <MaterialCommunityIcons
                    name="delete-outline"
                    color="#3a3a3a"
                    size={22}
                    onPress={() => removeTask(task)}
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
          : <Title>Nenhuma tarefa pendente</Title>
        }
      </Tasks>
    </Container>
  )
}

export default TarefasUsuarios;