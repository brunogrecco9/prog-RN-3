
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
              style = {styles.listComentarios}
              data={this.state.comentarios}
              keyExtractor={( item ) => item.createdAt.toString()}
              renderItem={ ( {item} ) => 
                <View style={styles.comment}>
                    <Text><b>{item.owner}</b> {item.comentario}</Text>
                </View>
          }
              />:
              <Text>Publicacion Sin Comentarios</Text>}
            
              <View style={styles.containerForm}>

                 <TextInput style={styles.imput}
                      placeholder='Agrega tu comentario'
                      onChangeText={ (text) => this.setState({nuevoComentario : text})}
                      value={this.state.nuevoComentario}
                      keyboardType='default'
                   />

                   <TouchableOpacity  style={styles.button}  onPress={()=> this.onSubmit()}
                   disabled={this.state.nuevoComentario==""?true:false}
                   >
                      <Text style={ styles.buttonText}>Comentar</Text>
                  </TouchableOpacity>
             </View>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        height: '90%',
    },
    listComentarios:{
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        backgroundColor: 'white',
        paddingHorizontal:24,
    },  
    containerForm:{
        flexDirection: 'row',
        paddingHorizontal:24,
        marginTop: 24,
    },
        
    comment:{
        marginTop:20,
        marginBottom: 20,
    },
    //containerComment:{
      //flexDirection:'row',
     // width:'50%'
   // },
    imput:{
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        paddingHorizontal:16,
        marginBottom:8,
        width:'70%',
        marginBottom: 0,
        lineHeight:40,
        backgroundColor: 'white'
    },
    button:{
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#0069FE',
        backgroundColor: '#0069FE',
        paddingHorizontal: '24px',
        paddingVertical: '12px',
        marginLeft: 16     
    },
    buttonText:{
        color: '#fff',
        alignItems: 'center',
        alignContent: "center",
    }
  })

export default Comments






