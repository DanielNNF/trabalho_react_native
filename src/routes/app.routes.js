import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Projetos from '../pages/projetos'
import Tarefas from '../pages/tarefas'



const Auth = createBottomTabNavigator();

const AppRoutes = () =>{
    return(
        <Auth.Navigator initialRouteName="Projetos">
             <Auth.Screen name="Projetos"component={Projetos} />
             <Auth.Screen name="Tarefas" component={Tarefas}  />
        </Auth.Navigator>
    )
}

export default AppRoutes;






