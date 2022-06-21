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
        .orderBy("createdAt","desc")
        .where("owner", "==", auth.currentUser.email)
        .onSnapshot(
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
                        <View style = {styles.infoContainer}>
                            <Text style = {styles.profileName}>{this.state.username}</Text>
                            <Text style = {styles.profileInfo}>{auth.currentUser.email}</Text>
                           
                        </View>
                        
                       
                            <TouchableOpacity style = {styles.button} onPress={()=>this.props.route.params.logout()}>
                                <Text style = {styles.buttonText}>Logout</Text>
                            </TouchableOpacity>
                        
                    </View>
                    <View style = {styles.postContainer}>
                        <FlatList 
                            data={this.state.posts}
                            keyExtractor={post => post.id}
                            renderItem = { ({item}) => <Post info={item} {...this.props} />}
                        />
                    </View>
                    <Text style = {styles.profileInfo}> Último inicio de sesión: {auth.currentUser.metadata.lastSignInTime}</Text>
                            
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
        flexDirection: 'row',
        justifyContent:'space-between',
        marginBottom: 24,
        paddingBottom: 24,
        borderBottomWidth: 1,
        borderColor: '#D6DADF'
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
    }
})
export default Profile;