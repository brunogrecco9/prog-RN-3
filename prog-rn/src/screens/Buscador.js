import React, {Component} from 'react';
import { db, auth } from '../firebase/config';
import { View,
         Text,
         TextInput,
         TouchableOpacity, 
         StyleSheet, 
         ActivityIndicator,
         FlatList, 
         Image } from 'react-native';
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
                <View >
                {/* Si no hay resultados deben mostrar un mensaje al usuario. Puede ser un mensaje único o segmenteado: en caso de que el usuario no exista o si el usuario existe indicar que aún no tiene posteos. */}
                    <Text style= {styles.post}>Buscagor de publicaciones{this.state.whoIs}</Text>
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
                            //👇 Les dejo un dato sorpresa para los que llegaron hasta acá: así se deshabilita un touchable opacity
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
    container:{
        flex:1,
        padding:10
    },
    post:{
        flex: 1,
        textAlign: 'center',
        fontSize: 30,
        marginTop: 250,

    },
    form:{
        flex:1,
        flexDirection: 'row',
        
        marginHorizontal:20,
        marginTop: 300,
       
        
    },
    field:{
        borderColor: '#dcdcdc',
        borderWidth: 1,
        borderRadius: 10,
        padding:3,
        marginBottom:8,
        width:'70%',
        marginBottom: 0,
        lineHeight:40,
    },
    button: {
        borderRadius: 10,
        padding:3,
        backgroundColor: 'grey',
        width:'29%',
        textAlign: 'center',
    },
    buttonText:{
        color: '#fff'
    }
})

export default Search;