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
                        <Text style={styles.messageOwner}>{documento.owner}</Text>
                        <Image style={styles.camara} source={{uri: documento.foto}} />
                        <Text style={styles.messageText}>{documento.caption}</Text>
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

                        <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate('Comments', {id: this.props.info.id})}>
                        <Text> ver comentarios</Text>
                        </TouchableOpacity>
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
      
        paddingVertical:20,
        
        borderRadius:5,
        backgroundColor:'white',
        marginHorizontal:10,
        marginTop:8
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
    containerLike:{
        flexDirection:'row',
    },
    likesCounter:{
        marginRight:8,

    },
    camara:{
      height: 300,
        width: 300 ,
        alignContent: "center",
        justifyContent: 'center',
        textAlign: 'center'
    
      },
    containerInferior:{
        flexDirection: "row",
        justifyContent: "space-between",
        width: '100%',
        paddingHorizontal: 24
    }
})

export default Post