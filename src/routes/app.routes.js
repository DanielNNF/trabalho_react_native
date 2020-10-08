import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Projetos from '../pages/projetos'



const Auth = createBottomTabNavigator();

const AppRoutes = () =>{
    return(
        <Auth.Navigator initialRouteName="Projetos">
             <Auth.Screen name="Projetos"component={Projetos} />
             {/* TODO: Criar nova página de tarefas que exibe somente as tarefas do usuário logado */}
        </Auth.Navigator>
    )
}

export default AppRoutes;






