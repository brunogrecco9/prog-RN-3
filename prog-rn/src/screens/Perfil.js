import React, {Component} from 'react';
import { db, auth } from '../firebase/config';
import { View,
         Text,
         TouchableOpacity, 
         StyleSheet, 
         ActivityIndicator,
         FlatList, 
         Image } from 'react-native';
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
                <View>
                    <Text>Hola! Soy {this.state.username}</Text>
                   <Text>{auth.currentUser.email}</Text>
                   <Text>Ultimo inicio de sesión: {auth.currentUser.metadata.lastSignInTime}</Text>
                   <TouchableOpacity onPress={()=>this.props.route.params.logout()}>
                        <Text>Logout</Text>
                    </TouchableOpacity>
                    <FlatList 
                        data={this.state.posts}
                        keyExtractor={post => post.id}
                        renderItem = { ({item}) => <Post info={item} {...this.props} />}
                    />
                </View>


        )
    }
}


export default Profile;