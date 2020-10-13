import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Projetos from './projetos'
import Tarefas from '../tarefasProjeto'

const Stack = createStackNavigator();
const RootNavigator = () => {

    return (
        <Stack.Navigator screenOptions={{
            headerStyle:
                { backgroundColor: '#001b54', elevation: 0 },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontSize: 28,
                fontFamily: 'sans-serif'
            },
        }}>
            <Stack.Screen name="Projetos" component={Projetos} options={{ headerShown: false }} />
            <Stack.Screen name="Tarefas" component={Tarefas} />
        </Stack.Navigator>
    )
}

export default RootNavigator;