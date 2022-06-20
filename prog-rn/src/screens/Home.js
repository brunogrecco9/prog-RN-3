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
                <View style = {styles.container}>
                     <Text style={styles.head}>
                          Hola {this.state.username}!
                     </Text>
                
                    {
                        this.state.posts.length ?

                            <FlatList
                               style={styles.flat}
                               data={this.state.posts}
                               keyExtractor={post => post.id}
                               renderItem = { ({item}) => <Post info={item} {...this.props} />}
                            />
                        :
                            <Text style={styles.noHay}>Aún no hay Posteos</Text>
                    }
               
                </View>

        )
    }
}

const styles= StyleSheet.create({
    head:{
        
        textAlign: "center",
        alignItems: 'center',
        fontSize: 30,
        marginTop: 25,
        marginBottom: 20,

    },
    flat: {
        width: "100",
        flexDirection: 'column',
    },

    container: {
        flexDirection: 'column',
        flex: 1,
    }
})
export default Home;