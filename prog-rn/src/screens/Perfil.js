import React, {Component} from 'react';
import { db, auth } from '../firebase/config';
import { View,
         Text,
         TouchableOpacity, 
         StyleSheet, 
         ActivityIndicator,
         FlatList, 
         Image} from 'react-native';
import Post from '../components/post';
class Profile extends Component {
    constructor(props){
        super(props);
        this.state={
            posts:[],
            username:''
        }
    }
    
    componentDidMount(){
        db.collection('posts')
        .orderBy("createdAt","desc") //dos parametros, 1) sobre que propiedad del documento debe buscar (en este caso la fecha de creacion) 2) el criterio de ordenamiento, en este caso "desc"
        .where("owner", "==", auth.currentUser.email)  //parametros que recibe where son 3: 1) sobre que propiedad del doc debe buscar (en este caso "owner") 2) criterio de comparacion (en este caso debe ser "igual" 3)el texto que debe ser igual )
        .onSnapshot(  //porque aca puedo hacer esta combinacion??
            docs => {
                let posteos = [];
                docs.forEach( oneDoc => {
                    posteos.push({
                        id: oneDoc.id,
                        data: oneDoc.data()
                    })
                })
                this.setState({
                    posts: posteos
                })
            }
        )
        db.collection("users")
            .where("email", "==", auth.currentUser.email)
            .onSnapshot(
                (docs) => {
                    let postsAux = [];
                    docs.forEach((doc) => {
                        postsAux.push({
                            id: doc.id,
                            data: doc.data(),
                        });
                    }); 
                    console.log(postsAux)
                    this.setState({
                        username: postsAux[0].data.userName,
                        loader: false,
                    });
                    ;
                }
            );
        }
    
    
    render(){
        console.log(auth.currentUser);
        console.log(this.state);
        return(
                <View style = {styles.mainContainer}>
                    <View style = {styles.containerSuperior}>
                        <View style = {styles.containerSuperior1}>
                            <View style = {styles.infoContainer}>
                                <Text style = {styles.profileName}>{this.state.username}</Text>
                                <Text style = {styles.profileInfo}>{auth.currentUser.email}</Text>
                            </View>                       
                        
                            <TouchableOpacity style = {styles.button} onPress={()=>this.props.route.params.logout()}>
                                <Text style = {styles.buttonText}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style = {styles.containerSuperior2}>
                            <Text><b>Posteos: </b>{this.state.posts.length}</Text>
                            <Text><b>Última conexión: </b>Última conexión: {auth.currentUser.metadata.lastSignInTime}</Text>
                        </View>
                    </View>
                    <View style = {styles.container}>
                        <FlatList 
                            style = {styles.flat}
                            data={this.state.posts}
                            keyExtractor={post => post.id}
                            renderItem = { ({item}) => <Post info={item} {...this.props} />}
                        />
                    </View>                            
                </View>
        )
    }
}
const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        padding:24,
        backgroundColor: 'white'
    },
    containerSuperior:{
        flexDirection: 'column',
        justifyContent:'space-between',
        marginBottom: 24,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderColor: '#D6DADF'
    },
    containerSuperior1:{
        flexDirection:'row',
        justifyContent: 'space-between'
    },
    containerSuperior2:{
        paddingVertical:8
    },
    infoContainer:{
    },
    profilePicture:{
        height: 40
    },
    profileName:{
        fontSize: 24,
        fontWeight: 'bold'
    },
    postContainer:{
        padding:0
    },
    logOutContaienr:{
        display: 'flex',
        alignSelf: 'center'
    },
    button:{
        backgroundColor: '#0069FE',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 10,
    },
    buttonText:{
        color: 'white'
    },
    flat: {
        width: "100",
    },

    container: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center'
    },
})
export default Profile;