import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Projetos from '../pages/projetos'
import Tasks from '../pages/tarefasUsuario'
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";


const Auth = createBottomTabNavigator();


const AppRoutes = () => {
    return (
            <Auth.Navigator
            initialRouteName="Projetos"
            tabBarOptions={{ tabStyle: { backgroundColor: '#001b54'}, style:{borderTopWidth: 0, height:50},labelStyle:{fontSize:13}}}>
                
            <Auth.Screen 
            name="Projetos" 
            component={Projetos}
            options={{
                tabBarIcon:()=> (<FontAwesome name="gears" color="white" size={23}/>)}}
            />
            <Auth.Screen name="Minhas Tarefas"
            
            component={Tasks}
            options={{
                tabBarIcon:()=> (<FontAwesome5 name="tasks" color="white" size={23}/>)}}
            />
        </Auth.Navigator>
    )
}

export default AppRoutes;






