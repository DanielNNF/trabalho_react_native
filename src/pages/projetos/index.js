import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Projetos from './projetos'
import Tarefas from '../tarefas'

const Stack = createStackNavigator();
const RootNavigator = () => {

    return (
        <Stack.Navigator >
            <Stack.Screen name="Projetos" component={Projetos} />
            <Stack.Screen name="Tarefas" component={Tarefas} />
        </Stack.Navigator>
    )
}

export default RootNavigator;