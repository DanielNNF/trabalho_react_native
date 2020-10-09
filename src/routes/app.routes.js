import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Projetos from '../pages/projetos'
import Tasks from '../pages/tarefasUsuario'



const Auth = createBottomTabNavigator();

const AppRoutes = () =>{
    return(
        <Auth.Navigator initialRouteName="Projetos">
             <Auth.Screen name="Projetos" component={Projetos} />
             <Auth.Screen name="Tasks" component={Tasks} />
        </Auth.Navigator>
    )
}

export default AppRoutes;






