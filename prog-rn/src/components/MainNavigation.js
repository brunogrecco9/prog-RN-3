import React, { Component } from 'react';
import { auth, db } from '../firebase/config'; //Auth deja disponibles metodos asincronicos para registrar y loguear usuarios, ademas lo importamos para chequear si el usuario esta logueado
import {StyleSheet} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Login from '../screens/Login';
import Register from '../screens/Register';
import Menu from './Menu';
import Comments from '../screens/Comments';

class MainNavigation extends Component {

    constructor(props){
        super(props)
        this.state={
            loggedIn: false,
            registerError:'',
        }
    }
    
    componentDidMount(){
      auth.onAuthStateChanged(user => { //miramos si el usuario esta logueado 

            // Si el usuario está logueado, cambiamos el estado loggedIn: true, asi entra directamente a la página
            if(user){
                this.setState({
                    loggedIn:true
                })
            }
        })
    }


    login(mail, pass){ //para que login funcione necesita estos dos datos

        //Debería loguear en Firebase y cambiar el estado loggedIn: true

        //Debe pasar como método a el componente login
        auth.signInWithEmailAndPassword(mail, pass)
            .then(response => this.setState({
                loggedIn:true
            }))
            .catch( error => console.log(error))

    }
 
    register(email, password, username){ //para que register funcione necesita estos tres datos

        //Debería registrar en Firebase y cambiar el estado loggedIn: true

        //Debe pasar como método a el componente register

        //Metodo de registracion de firebase:
        auth.createUserWithEmailAndPassword(email, password)
            .then( responseRegister => { //Como es un metodo asincronico usamos un .then con una respuesta que usamos dentro de una function
                console.log(responseRegister); 
                gi
                //Guardar documento en colección de usuarios.
               db.collection('users').add({
                 email: email,
                 userName: username,
                 createdAt: Date.now()  
               })
               .then(responseUsers => console.log(responseUsers))
                    .catch(error => console.log(error))
                    })
            .catch( error => { //por si hay un error, lo vemos por consola
                console.log(error);
                this.setState({
                     registerError: error.message
                })
            })      
    }
    
    logout(){
        //Debe pasar como método a el componente Porfile
        auth.signOut()
            .then( response => this.setState({
                loggedIn: false
            }))
            .catch( error => console.log(error))
    }
    

    render(){
        //Stack.Group funciona como React.Fragment y nos permite agrupar Screens.
        console.log('En el render del menu: ' + this.state.registerError);
        return(
            <NavigationContainer>
                <Stack.Navigator>
                {
                    this.state.loggedIn ?
                    <Stack.Group> 
                        <Stack.Screen 
                            name='Menu'
                            component ={ Menu }
                            options = {{headerShown: false}}
                            initialParams = {{ logout: ()=> this.logout()}}
                        />
                        <Stack.Screen 
                        name="Comments" 
                        component={Comments}/>
                    </Stack.Group> 
                    :
                    <Stack.Group> 
                        <Stack.Screen 
                            name='Login'
                            component = { Login }
                            options = {{headerShown: false}}
                            initialParams = {
                                {   login: (mail, pass)=>this.login(mail, pass),
                                }}
                        />
                        <Stack.Screen
                            name='Registro'
                            options = {{headerShown: false}}
                            initialParams={{ register: (mail, pass, username) => this.register(mail, pass, username) }}
                            children={(navigationProps) => <Register errores={this.state.registerError} {...navigationProps} />}
                        />
                    </Stack.Group>
                }
                </Stack.Navigator>
            </NavigationContainer>
        )
    }



}

export default MainNavigation