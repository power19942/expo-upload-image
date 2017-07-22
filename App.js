import Expo,{Notifications,Permissions,ImagePicker} from 'expo';
import React from 'react';
import {StyleSheet, Button, View, Image, Text} from 'react-native';
import axios from 'axios';
export default class App extends React.Component {
    state = {
        image: null,
    };
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
                .then((res)=>{
                    console.log('axios res');
                console.log(res);
                }).catch((e)=>{
                console.log(e);
            })
           // xhr.open('POST', serverURL);
           // xhr.send(body);
        }
    };
  render() {
      let { image } = this.state;
    return (
      <View style={styles.container}>
          <Text>Main Photo</Text>
          <Image source={{ uri: 'http://192.168.1.45:8000/testLaravel/public/uploads/photo.jpg' }} style={{ width: 200, height: 200 }} />
          <Button
              title="Pick an image from camera roll"
              onPress={this._pickImage}
          />
          {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
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