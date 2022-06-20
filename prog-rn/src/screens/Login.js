import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';


class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            email: '',
            password: '',
        }
    }


    render(){
        //Falta implementar for de login y el método que viene de mainNavigation 
        return(
                <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <TextInput 
                    style={styles.field}
                    keyboardType='default'
                    placeholder='Email'
                    onChangeText={text => this.setState({ email: text})}
                />
                <TextInput 
                    style={styles.field}
                    keyboardType='default'
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text})}
                />
                <TouchableOpacity style={styles.button} onPress={()=>this.props.route.params.login(this.state.email, this.state.password)}>
                    <Text style={ styles.buttonText}>Ingresar</Text>
                </TouchableOpacity>   
                 <TouchableOpacity onPress={ ()=>this.props.navigation.navigate('Registro') }>
                        <View style= {styles.cuenta}>
                            <Text>No tengo cuenta</Text>
                        </View>
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
        borderColor: "#0069FE",
        borderWidth: 1,
        borderRadius: 10,
        marginBottom:8,
        paddingLeft: 10,
        width:200,
        height: 50,

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
        color: 'black'
    },
    cuenta: {
        marginTop: 16,
    }
})


export default Login;