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
                <MyCamera cuandoSubaLaImagen={(url)=> this.cuandoSubaLaImagen(url)}/>
                :

                <View>
                    <Text>Foto cargada con exito</Text>
                    <TextInput 
                    style={styles.textarea}
                    onChangeText= {(text)=> this.setState({
                        message: text
                    })}
                    value={this.state.message}
                   placeholder="Descripcion"
                   />
            
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() =>this.subirposteo()}
                           
            
                    >
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
    btn:{
        marginTop:16,
        borderColor:'red',
        borderWidth:1
    }
})

export default agregarPost