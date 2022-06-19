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
            posts:[]
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

        
    }


    render(){
        console.log(this.state);
        return(
                <View>
                    <Text style={styles.head}>Hola</Text>
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