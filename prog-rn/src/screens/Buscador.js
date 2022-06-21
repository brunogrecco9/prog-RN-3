import React, {Component} from 'react';
import { db } from '../firebase/config';
import { View,
         Text,
         TextInput,
         TouchableOpacity, 
         StyleSheet, 
         FlatList } from 'react-native';
import Post from '../components/post';

class Search extends Component {
    constructor(props){
        super(props);
        this.state={
            posts:[],
            email:'',
            whoIs:'',
        }
    }
    
    // Obtener información a partir de una búsqueda.
    search(email){ 
        db.collection('posts').where('owner', '==', email).onSnapshot(
            docs => {
                let posts = [];
                docs.forEach( oneDoc => {
                    posts.push({
                        id: oneDoc.id,
                        data: oneDoc.data()
                    })
                })

                this.setState({
                    posts: posts,
                    email:'',
                    whoIs:email,
                })
            }
        )

        
    }


    render(){
        // console.log(this.state);
        return(
                <View style= {styles.containerB}>
                
                    <Text style= {styles.buscador}>Buscador de publicaciones{this.state.whoIs}</Text>
                     <View style={styles.form}>
                        <TextInput 
                            style={styles.field}
                            keyboardType='default'
                            placeholder='Ingrese el correo electrónico del usuario'
                            value={this.state.email}
                            onChangeText={text => this.setState({ email: text})}
                        />  
                        <TouchableOpacity
                            style={styles.button} 
                            onPress={()=>this.search(this.state.email)}
                           
                            disabled= {this.state.email == '' ? true : false }
                            >
                            <Text style={ styles.buttonText}>Go</Text>
                        </TouchableOpacity>                         
                    </View>
                    <FlatList 
                        data={this.state.posts}
                        keyExtractor={post => post.id}
                        renderItem = { ({item}) => <Post info={item}
                        {...this.props} />}
                    />
                    
                </View>

        )
    }
}

const styles = StyleSheet.create({
    containerB:{
        flex:1,
    },
    buscador:{
        textAlign: 'center',
        fontSize: 30,
        marginTop: 20,
        marginBottom: 20,

    },
    form:{
        flexDirection: 'row',
        marginHorizontal:20,   
        marginLeft: 40,
        

        
    },
    field:{
        borderWidth: 1,
        borderColor: '#0069FE',
        borderRadius: 10,
        padding:3,
        marginBottom:8,
        width:'70%',
        marginBottom: 0,
        lineHeight:40,
    },
    button: {
        borderRadius: 10,
        width:'20%',
        textAlign: 'center',
        alignItems: 'center',
        alignContent: "center",
        marginLeft:10,
        borderWidth: 1,
        borderColor: '#0069FE',
        backgroundColor: '#0069FE',
    },
    buttonText:{
        color: '#fff',
        alignItems: 'center',
        alignContent: "center",
        marginTop: 15,
    }
})

export default Search;