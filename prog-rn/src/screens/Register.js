import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
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

    onSubmit() {
        console.log(this.state);
    }

    render(){
        console.log(this.state.email);
        console.log(this.state.password);
        console.log(this.state.username)
        console.log(this.props);
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Registro</Text>
                <TextInput 
                    style={styles.field}
                    keyboardType='default'
                    placeholder='Email'
                    onChangeText={text => this.setState({ email: text})}
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
                    secureTextEntry={true}
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
        backgroundColor: '#87cefa',
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