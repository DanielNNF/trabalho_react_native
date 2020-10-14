import React, { useState, useEffect, useCallback } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, View } from 'react-native';
import api from '../../services/api';
import RNPickerSelect from 'react-native-picker-select';


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


const Tarefas = ({ route }) => {
  const [usuarios, setUsuarios] = useState([{ label: '', value: [0, ''] }]);
  const [usuarioId, setUsuarioId] = useState(0);
  const [usuarioNome, setUsuarioNome] = useState('');
  const [tasks, setTasks] = useState([]);
  const [tasksFiltered, setTasksFiltered] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { projetoId, projetoNome } = route.params;

  const loadTasks = useCallback(
    async () => {
      const response = await api.get(`tarefas`);
      setTasks(response.data);
    }, [],
  );

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);


  const loadUsuarios = useCallback(
    async () => {
      const response = await api.get('usuarios');
      const users = response.data.map(user => ({ label: user.usuario, value: [user.id, user.usuario] }))
      setUsuarios(users)

    }, []);
  useEffect(() => {
    loadUsuarios();
  }, [])

  const filtrarTarefas = () => {
    const temp = [];
    tasks.map(task => {
      if (task.projetoId === projetoId) {
        temp.push(task)
      }
    })
    setTasksFiltered(temp);
  };

  useEffect(() => {
    if (!projetoId) { return }
    filtrarTarefas();
  }, [projetoId, tasks]);

  const handleAddTask = useCallback(
    async () => {
      setErrorMessage("");
      if (!usuarioId) {
        setErrorMessage("Insira o usuário")
        return
      }
      if (newTask === "") {
        setErrorMessage("Digite o Projeto a ser adicionado");
        return;
      }


      const params = {
        descricao: newTask,
        concluido: false,
        usuarioId,
        usuarioNome,
        projetoId,
        projetoNome
      };

      try {
        await api.post(`tarefas`, params);

        loadTasks();
        setNewTask("");
      } catch (error) {
        console.log("error handleAddTask:", error);

        setErrorMessage("Ocorreu um erro ao adicionar tarefa");
      }
    }, [loadTasks, newTask, usuarioId],
  );

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
      <Title>Projeto {projetoNome}</Title>
      <ScrollView>

        <RNPickerSelect
          style={{
            inputAndroid: {
              color: 'white'
            }
          }
          }
          onValueChange={(value) => {
            if (value) {
              setUsuarioId(value[0]);
              setUsuarioNome(value[1]);
              setErrorMessage('')
            }
          }
          }
          items={usuarios}
          style={{
            inputAndroid: {
              color: 'white'
            }
          }
          }
        />

        <FormAddNewTask>
          <Input
            value={newTask}
            onChangeText={text => setNewTask(text)}
            placeholder="Nova tarefa"
          />


          <Button onPress={() => handleAddTask()}>
            <ButtonText>
              Criar
          </ButtonText>
          </Button>
        </FormAddNewTask>

        {!!errorMessage && (
          <ErroMessage>{errorMessage}</ErroMessage>
        )}

        <Tasks>
          {tasksFiltered.map(task => (
            <Task key={task.id}>
              <View style={{ width: '85%', flexDirection: 'column' }}>

                <TaskText>{task.descricao}</TaskText>
                <TaskText>Para: {task.usuarioNome}</TaskText>

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
          }
        </Tasks>
      </ScrollView>
    </Container>
  )
}

export default Tarefas;