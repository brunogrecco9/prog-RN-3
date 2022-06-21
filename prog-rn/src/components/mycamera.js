import React, { Component } from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image, TextInput} from 'react-native'
import {Camera} from 'expo-camera'
import { storage } from '../firebase/config'

export default class MyCamera extends Component {
    constructor(props){
        super(props)
        this.state={
            permisos: false,
            urlFoto:'',
            mostrarCamara: true
        }
        this.metodosDeCamara = undefined
    }
    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(()=>{
            this.setState({permisos: true})
        })
        .catch(error => console.log(error))
        console.log(Camera)
    }

    tomaLaFoto(){
        console.log('Digan Whisky!')
        this.metodosDeCamara.takePictureAsync()
        .then(dataFoto => {
            console.log(dataFoto)
            this.setState({
                urlFoto: dataFoto.uri,
                mostrarCamara:false
            })
        })
        .catch(error => console.log(error))
    }
    guardarFoto(){
        fetch(this.state.urlFoto)
        .then(response => {
            // console.log(response)    
            return response.blob()
        })
        .then(foto => {
            // console.log(foto)
            const referenciaDelStorage = storage.ref(`photos/${Date.now()}.jpg`)
            // console.log(referenciaDelStorage)

            referenciaDelStorage.put(foto)
            .then(()=>{
                referenciaDelStorage.getDownloadURL()
                .then( url => {
                    console.log(url)
                    this.props.cuandoSubaLaImagen(url);
                    this.setState({photo:''})
                })
            })
        })
        .catch(error => console.log(error))
    }

    descartarFoto(){
        this.setState({
            urlFoto:"",
            mostrarCamara: true
        })
        //Aqui cambiar el estado de la urlFoto a '' y mostrarCamara a true
    }


  render() {
    return (
        <View style={styles.container}>
        {
            this.state.permisos ?
                this.state.mostrarCamara === false ?
                <>
                    
                    <Image
                    style={styles.camara}
                    source={{uri: this.state.urlFoto}}
                    />
                    <View style={styles.container2}>
                        <TouchableOpacity style={styles.button} onPress={()=> this.guardarFoto()}>
                            <Text>
                                Aceptar
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}  onPress={()=> this.descartarFoto()}>
                            <Text>
                                Rechazar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>

                :
                <View style={styles.container}>
                    <Camera
                        styles={styles.camara}
                        type={Camera.Constants.Type.back}
                        ref={ metodos => this.metodosDeCamara = metodos}
                    />
                    <TouchableOpacity style={styles.buttonF} onPress = {()=> this.tomaLaFoto()}>
                        <Text style={styles.foto}>Sacar foto</Text>
                    </TouchableOpacity>
                </View>
            :

            <Text>No tienes permisos para usar la Cámara</Text>
        }
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        
    },
    container2: {
       
        flexDirection:  "row",
        justifyContent: "space-evenly",
       //margin: 'auto'
        

    },
    camara:{
      
    },
    button:{
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#0069FE',
        backgroundColor: '#0069FE',
        paddingHorizontal: '24px',
        paddingVertical: '12px',
        marginTop: 350
        //alignSelf: 'center'
        
    },
    buttonF:{
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#0069FE',
        backgroundColor: '#0069FE',
        paddingHorizontal: '24px',
        paddingVertical: '12px',
        alignSelf: 'center'
    
},
    foto: {
        textAlign: "center",
    }
})