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

class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            posts:[],
            username: ''
        }
    }
    
    componentDidMount(){
        db.collection('posts').orderBy("createdAt","desc").onSnapshot(
            docs => {
                let posts = [];
                docs.forEach( oneDoc => {
                    posts.push({
                        id: oneDoc.id,
                        data: oneDoc.data()
                    })
                })

                this.setState({
                    posts: posts
                })
            }
        )
        
        db.collection("users")
            .where("email", "==", auth.currentUser.email)
            // .orderBy("createdAt", "desc")
            .onSnapshot(
                (docs) => {
                    let postsAux = [];
                    docs.forEach((doc) => {
                        postsAux.push({
                            id: doc.id,
                            data: doc.data(),
                        });
                    }); // For each
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
        console.log(this.state);
        return(
                <View>
                    <Text style={styles.head}>Hola {this.state.username}</Text>
                    <FlatList 
                        data={this.state.posts}
                        keyExtractor={post => post.id}
                        renderItem = { ({item}) => <Post info={item} {...this.props} />}
                    />
                    
                </View>

        )
    }
}

const styles= StyleSheet.create({
    head:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',

    }})
export default Home;