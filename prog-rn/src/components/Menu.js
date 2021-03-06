//Estructura base de un componente con estado
import React, { Component } from 'react';

//1 Componentes de navegación
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Import de íconos
import { FontAwesome} from '@expo/vector-icons'


//2Importar las pantallas
import Home from '../screens/Home';
import Perfil from '../screens/Perfil';
import agregarPost from '../screens/agregarPost';
import Buscador from '../screens/Buscador';


//3 Guardar la ejecución de createBottomTabNavigator
const Tab = createBottomTabNavigator();


//4 Armar el compoente con el render del menú
class Menu extends Component {
    constructor(props){
        super(props)
        this.state={
            loggedIn:false,
        }
    }


    render(){
        return(
            //Armar el menú. No se necesita repetir el container.
        
            <Tab.Navigator screenOptions= {{tabBarShowLabel: false}}>
                <Tab.Screen 
                    name='Home' 
                    component={ Home }
                    options={
                        { tabBarIcon: () => <FontAwesome name="home" size={24} color="black" /> , headerShown: false}
                    } 
                   
                />

                 <Tab.Screen 
                    name='Buscador' 
                    component={ Buscador }
                    options={
                        { tabBarIcon: () => <FontAwesome name="search" size={24} color="black" /> , headerShown: false}
                        
                    }
                    
                />
                  <Tab.Screen 
                    name='Agregar Posteo' 
                    component={ agregarPost }
                    options={
                        { tabBarIcon: () => <FontAwesome name="photo" size={24} color="black" /> , headerShown: false}

                    }
                />
                <Tab.Screen 
                name='Perfil' 
                component={ Perfil }
                options={
                    { tabBarIcon: () => <FontAwesome name="user" size={24} color="black" /> , headerShown: false}}
                    
                    
                
                initialParams={{logout: ()=>this.props.route.params.logout()}}
                /> 
                
            </Tab.Navigator>        

        )
    }
}

export default Menu
