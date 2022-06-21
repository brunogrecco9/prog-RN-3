import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, {Component} from 'react'
import MyCamera from '../components/mycamera'
import {db, auth} from '../firebase/config'
class agregarPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            message:'',
            mostrarComponenteCamara: true,
            urlFoto:''
        }
    }

    cuandoSubaLaImagen(url){
        console.log(url)
        this.setState({
            mostrarComponenteCamara:false,
            urlFoto: url
        })
    }

    subirposteo(){
        db.collection('posts').add({
            owner:auth.currentUser.email,
            createdAt: Date.now(),
            caption:this.state.message,
            likes:[],
            comments:[],
            foto:this.state.urlFoto
        })
        .then(response => this.props.navigation.navigate("Home"))
        .catch(error => console.log(error.message))
    }

    render(){

        return (
            <>
            {
                this.state.mostrarComponenteCamara ?
                <MyCamera style={styles.camara} cuandoSubaLaImagen={(url)=> this.cuandoSubaLaImagen(url)}/>
                :

                <View style={styles.container}> 
                    <Text style={styles.title} >¡Foto cargada con éxito!</Text>
                    <TextInput 
                    style={styles.textarea}
                    onChangeText= {(text)=> this.setState({
                        message: text
                    })}
                    value={this.state.message}
                   placeholder="Añade una descripción..."
                   />
            
                      <TouchableOpacity style={styles.button} onPress={() =>this.subirposteo()}>
                          <Text>Subir Posteo</Text>
                      </TouchableOpacity>
                </View>
            }
            </>

        )
    }
}

const styles = StyleSheet.create({
    textarea:{
        borderWidth:1,
        borderColor:'#c3c3c3',
        height:'auto',
        minHeight:60,
        marginTop:10
    },
    button:{
        borderRadius: 10,
        width:100,
        height: 40,
        alignSelf: 'center',
        marginTop:30,
        borderWidth: 1,
        borderColor: '#0069FE',
        backgroundColor: '#0069FE',
        paddingLeft: 8,
        paddingTop: 10,

        

    },
    container:{
        flex: 1,

    },
    camara:{
        borderRadius: 30,
    },
    title:{
        textAlign: 'center',
        fontSize: 30,
        marginTop: 20,
        marginBottom: 20
    }


})

export default agregarPost