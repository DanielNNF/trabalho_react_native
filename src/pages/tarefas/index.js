import React, { useState, useEffect, useCallback } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
  const [usuarios, setUsuarios] = useState([{ label: '', value: 0 }]);
  const { projetoId } = route.params;
  const [tasks, setTasks] = useState([]);
  const [tasksFiltered, setTasksFiltered] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
      const response = await api.get(`usuarios`);
      const users = response.data.map(user => ({ label: user.email, value: user.id }))
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
      if (newTask === "") {
        setErrorMessage("Digite o Projeto a ser adicionado");
        return;
      }

      setErrorMessage("");

      const params = {
        descricao: newTask,
        concluido: false,
        projetoId
      };

      try {
        await api.post(`tarefas`, params);

        loadTasks();
        setNewTask("");
      } catch (error) {
        console.log("error handleAddTask:", error);

        setErrorMessage("Ocorreu um erro ao adicionar tarefa");
      }
    }, [loadTasks, newTask],
  );

  const handleTask = useCallback(
    async (task) => {
      const params = {
        ...task,
        //ID DO FUNC
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
      <Title>Tarefas projeto {projetoId}</Title>

      <RNPickerSelect
        onValueChange={(value) => console.log(value)}
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
          placeholder="Novo projeto"
        />


        <Button onPress={() => handleAddTask()}>
          <ButtonText>
            Criar
          </ButtonText>
        </Button>
      </FormAddNewTask>

      { !!errorMessage && (
        <ErroMessage>{errorMessage}</ErroMessage>
      )}

      <Tasks>
        {tasksFiltered.map(task => (
          <Task key={task.id}>
            <TaskText>{task.descricao}</TaskText>

            {/* <BtnDetalhes onPress={() => navigation.navigate("Tarefas")}>
              <BtnText>Detalhes</BtnText>
            </BtnDetalhes>
           */}

            <TaskAction>
              {task.concluido ? (
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

export default Tarefas;