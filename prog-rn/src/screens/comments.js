import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, {Component} from 'react'
import { db, auth } from '../firebase/config'
import firebase from 'firebase'

class Comments extends Component {
    constructor(props){
        super(props)
        this.state={
            comentarios:[],
            nuevoComentario:''
        } 
    }

    componentDidMount(){
        const idDoc = this.props.route.params.id
            db
            .collection('posts')
            .doc(idDoc)
            .onSnapshot(doc => {
                this.setState({
                    comentarios:doc.data().comments
                })
            })
    }

    onSubmit(){
        const comment ={
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            comentario: this.state.nuevoComentario
        }

        
            db
            .collection('posts')
            .doc(this.props.route.params.id)
            .update({
                comments:firebase.firestore.FieldValue.arrayUnion(comment)
            })
            .then(response => this.setState({nuevoComentario:''}))
            .catch(error => console.log(error))
        

    }
    
    render(){
        return (
          <View style={styles.container}>
              {this.state.comentarios.length!=0?
              <FlatList
              data={this.state.comentarios}
              keyExtractor={( item ) => item.createdAt.toString()}
              renderItem={ ( {item} ) => <View style={styles.comment}>
                  <Text>{item.owner}</Text>
                  <Text>{item.comentario}</Text>
              </View>
          }
              />:
              <Text>Publicacion Sin Comentarios</Text>}
            
            <View>
                <TextInput
                placeholder='Agrega tu comentario'
                onChangeText={
                    (text) => this.setState({nuevoComentario : text})
                }
                value={this.state.nuevoComentario}
                keyboardType='default'
                style={styles.inputComment}
                />
                <TouchableOpacity 
                onPress={()=> this.onSubmit()}
                style={styles.btnComment}
                >
                    <Text>Comentar</Text>
                </TouchableOpacity>
            </View>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
      width:'100%',
      height:'100%',
      justifyContent:'center',
      alignItems:'center'
    },
    comment:{
        marginTop:30
    },
    containerComment:{
      flexDirection:'row',
      width:'90%'
    },
    inputComment:{
      borderWidth:1,
      backgroundColor:'#c3c3c3',
      width:'80%'
    },
    btnComment:{
      width:'20%',
      padding:10,
      backgroundColor:'#d3d3d3'
  
    }
  })

export default Comments