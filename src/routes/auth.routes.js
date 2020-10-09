import React from 'react'
import { createStackNavigator} from '@react-navigation/stack';
import Login from '../pages/login';
import Cadastro from '../pages/cadastro'

const Auth= createStackNavigator();

const AuthRoutes = () =>{
    return(
        <Auth.Navigator screenOptions={{headerShown: false,}}>
            <Auth.Screen name="Login" component={Login} />
            <Auth.Screen name="Cadastro" component={Cadastro} />
        </Auth.Navigator>
    )
}
export default AuthRoutes;