import Expo,{Notifications,Permissions,ImagePicker} from 'expo';
import React from 'react';
import {Dimensions,StyleSheet, Button, View, Image, Text,ScrollView} from 'react-native';
import axios from 'axios';
import Carousel from 'react-native-looped-carousel';

const  width = Dimensions.get('window').width ;
const  height = (Dimensions.get('window').height / 2) ;
// const { width, height } = Dimensions.get('window');

export default class App extends React.Component {
    constructor(props) {
        super(props);
        console.log(width);
        this.state = {
            size: { width, height },
            image: null,
            photos:[]
        };
    }
    // _onLayoutDidChange = (e) => {
    //     const layout = e.nativeEvent.layout;
    //     this.setState({ size: { width: layout.width, height: layout.height } });
    // }
    componentWillMount(){
        // this.setState(
        //     ()=>{
                axios.get('http://192.168.1.45:8000/testLaravel/public/api/photos')
                    .then(res=>{
                        this.setState({photos:res.data});
                        console.log(this.state.photos);
                    });
        //     }
        // );

    }
    
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ image: result.uri });
            var photo = {
                     uri: result.uri,
                     type: 'image/jpeg',
                     name: 'photo.jpg',
                   };

           var body = new FormData();
           body.append('authToken', 'secret');
           body.append('photo', photo);
           body.append('title', 'A beautiful photo!');
           console.log('start axios');
            axios.post('http://192.168.1.45:8000/testLaravel/public/api/react',body)
                .then((respo)=>{
                    axios.get('http://192.168.1.45:8000/testLaravel/public/api/photos')
                        .then(res=>{
                            this.setState({photos:res.data});
                            console.log(this.state.photos);
                        });
                }).catch((e)=>{
                console.log(e);
            })
           // xhr.open('POST', serverURL);
           // xhr.send(body);
        }
    };

    renderPhotos(){
        if (this.state.photos.length > 0){
            return (
                <Carousel
                    delay={2000}
                    style={this.state.size}
                    autoplay
                    pageInfo
                    onAnimateNextPage={(p) => console.log(p)}
                >
                    {this.state.photos.map(photo=>{
                        return (
                            <View key={photo} style={[this.state.size]}>
                                <Image
                                    source={{ uri: 'http://192.168.1.45:8000/testLaravel/public/uploads/'+photo }}
                                    style={[this.state.size]} />
                            </View>
                        )
                    })}
                </Carousel>
            )
        }
        // return this.state.photos.map(photo=>{
        //     return <Image
        //         source={{ uri: 'http://192.168.1.45:8000/testLaravel/public/uploads/'+photo }}
        //         style={[{borderWidth:2,borderColor:'red'},this.state.size]} />
        // });
    }
  render() {


      let { image } = this.state;
    return (
      <View style={styles.container} >
         <ScrollView>
             {this.renderPhotos()}
             <Button
                 title="Pick an image from camera roll"
                 onPress={this._pickImage}
             />
             {image &&
             <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
         </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Expo.registerRootComponent(App);