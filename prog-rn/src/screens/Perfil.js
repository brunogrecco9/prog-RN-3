import React, {Component} from 'react';
import { db, auth } from '../firebase/config';
import { View,
         Text,
         TouchableOpacity, 
         StyleSheet, 
         ActivityIndicator,
         FlatList, 
         Image } from 'react-native';
//import Post from './Post';

class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            posts:[]
        }
    }
    
    
    


    render(){
        console.log(auth.currentUser);
       
        return(
                <View>
                   <Text>{auth.currentUser.email}</Text>
                   <Text>Ultimo inicio de sesión: {auth.currentUser.metadata.lastSignInTime}</Text>
                   <TouchableOpacity onPress={()=>this.props.route.params.logout()}>
                        <Text>Logout</Text>
                    </TouchableOpacity>
                </View>


        )
    }
}


export default Home;