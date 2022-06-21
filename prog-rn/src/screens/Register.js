import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput, //importamos textImput para poder "simular" un formulario
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {auth} from '../firebase/config';

class Register extends Component{
    constructor(props){
        super(props)
        this.state={
            email: '',
            password: '',
            username:'',
        }
    }

    render(){
        console.log(this.state.email);
        console.log(this.state.password);
        console.log(this.state.username)
        console.log(this.props);

        
        //para un contenedor del form, utilizamos el view
        return(
            <View style={styles.container}> 
                <Text style={styles.title}>Registro</Text>
                <TextInput 
                    style={styles.field}
                    keyboardType='email-address' //tipo de teclado que vamos a mostrar, en este caso, un teclado para escribir email.
                    placeholder='Email'
                    onChangeText={text => this.setState({ email: text})} //Funcion que toma los datos que ingresa el user y los almacema en el estado
                />
                <TextInput 
                    style={styles.field}
                    keyboardType='default'
                    placeholder='User Name'
                    onChangeText={text => this.setState({ username: text})}
                />
                <TextInput 
                    style={styles.field}
                    keyboardType='default'
                    placeholder='password'
                    secureTextEntry={true} //porque es una contraseña
                    onChangeText={text => this.setState({ password: text})}
                />

                <TouchableOpacity style={styles.button} onPress={() => this.props.route.params.register(this.state.email, this.state.password, this.state.username)}> 
                    <Text style={styles.text}>Registrarme</Text> 
                </TouchableOpacity> 

                <Text> {this.props.errores} </Text>
                 <TouchableOpacity  onPress={ ()=>this.props.navigation.navigate('Login') }>

                         <Text>Ya tengo cuenta</Text>
                 </TouchableOpacity>
            
            </View>
//aca simulamos un boton de registrarme y de "ya tengo cuenta"
        )
    }

}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:10,
        marginTop: 10,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        height: "100%"
    },
    title:{
        marginBottom:20,
        fontSize:50,
        color: "black",

    },
    field:{
        borderColor: '#0069FE',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom:8,
        width:200,
        height: 50,
        paddingLeft: 10,

    },
    button: {
        borderRadius: 10,
        padding:3,
        borderWidth: 1,
        borderColor: '#0069FE',
        backgroundColor: '#0069FE',
        width:200,
        height: 50,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },
    buttonText:{
        color: '#fff',
       
    },
    
})

export default Register;