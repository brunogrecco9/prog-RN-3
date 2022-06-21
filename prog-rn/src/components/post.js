import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native'
import React, {Component} from 'react'
import { FontAwesome } from '@expo/vector-icons'
import {auth, db} from '../firebase/config'
import firebase from 'firebase'

class Post extends Component {
    
    constructor(props){
        super(props)
        this.state={
            cantLikes:0,
            miLike:false,
            arrLikes:[],
            arrSubMessages:[]
        }
    }

    componentDidMount(){
        const documento = this.props.info.data
        const estaMiLike = documento.likes.includes(auth.currentUser.email)
        console.log(documento)
        if(documento.likes){
            this.setState({
                cantLikes: documento.likes.length
            })
        }

        if(estaMiLike){
            this.setState({
                miLike:true
            })
        }

    }

    like(){
        const documento = this.props.info
        db.collection('posts').doc(documento.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(response => {
            this.setState({
                miLike:true,
                cantLikes: this.state.cantLikes +1
            })
        })
        .catch(error=> console.log(error))
    }

    unlike(){
        const documento = this.props.info
        db.collection('posts').doc(documento.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(
            this.setState({
                miLike:false,
                cantLikes: this.state.cantLikes -1
            })
        )
        .catch(error=> console.log(error))
    }
    


    render(){
        const documento = this.props.info.data
        return (
            <>
                <View style={styles.container}>

                    <View style={styles.containerSuperior}>

                        <View style={styles.containerFoto}>
                            <Image style={styles.camara} source={{uri: documento.foto}} />
                        </View>

                        <View style={styles.containerInfo}>
                            <Text style={styles.messageOwner}><b>{documento.owner}</b> {documento.caption}</Text>
                        </View>

                    </View>

                    <View style = {styles.containerInferior}>
                        <View style={styles.containerLike}>
                            <Text style={styles.likesCounter}>{this.state.cantLikes}</Text>
                            {
                                this.state.miLike
                                ?
                                
                                <TouchableOpacity onPress={()=> this.unlike()}>
                                    <FontAwesome name='heart' size={24} color='red'/> 
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={()=> this.like()}>
                                    <FontAwesome name='heart-o' size={24} color='black' /> 
                                </TouchableOpacity>
                        
                            }
                        </View>
                        
                        <View>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Comments', {id: this.props.info.id})}>
                                <Text>Ver comentarios</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </>
        )
    }
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems: 'center',
        borderRadius:5,
        backgroundColor:'white',
        marginHorizontal:10,
        marginTop:24,
        width: 300
    },
    messageOwner:{
        fontWeight:400,
        paddingBottom: 6,
        color: 'black',
        textAlign: 'center'
    },
    messageText:{
        color: 'black' ,
        paddingLeft:8,
        paddingVertical:8,
        textAlign: 'center'

    },
    containerFoto:{
        
    },
    containerInfo:{
        flexDirection: 'row',
        paddingTop:20,
        paddingHorizontal: 16
    },
    containerLike:{
        flexDirection:'row',
        marginBottom:8,
        alignItems: 'center'
        },
    likesCounter:{
        marginRight:8,

    },
    camara:{
        height: 300,
        width: 300 ,
        alignContent: "center",
        justifyContent: 'center',
        textAlign: 'center',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    
      },
    containerInferior:{
        justifyContent: "space-between",
        width: '100%',
        paddingHorizontal: 16,
        paddingBottom:20,
    }
})

export default Post







