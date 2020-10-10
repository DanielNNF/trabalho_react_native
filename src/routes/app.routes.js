import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Projetos from '../pages/projetos'
import Tasks from '../pages/tarefasUsuario'


const Auth = createBottomTabNavigator();


const AppRoutes = () => {
    return (
        <Auth.Navigator
            initialRouteName="Projetos"
            tabBarOptions={{ tabStyle: { backgroundColor: '#001b54'}, style:{borderTopWidth: 0} }}>
            <Auth.Screen name="Projetos" component={Projetos} />
            <Auth.Screen name="Minhas Tarefas" component={Tasks} />
        </Auth.Navigator>
    )
}

export default AppRoutes;






