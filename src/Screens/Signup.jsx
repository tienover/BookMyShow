import { View, Text, Image, Button, TextInput, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useColor } from '../Utils/Color';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { firestore, auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';


const Signup = () => {


  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [rePassword,setRePassword] = useState('')



  
  // quản lý định tuyến.
  const nav = useNavigation();

  const handlSignup =()=>{
    if(password!=rePassword){
        Alert.alert("thong bao","mat khau nhap lai chua chinh xac")
    }
    else{
        createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          // Đăng ký thành công
          console.log('User signed up!');
          const user = userCredential.user;
          Alert.alert("Thông báo", "Đăng ký thành công!");
          // Điều hướng đến màn hình chính hoặc màn hình đăng nhập
          nav.navigate('Login');
        })
        .catch(error => {
          // Xử lý lỗi đăng ký
          console.error(error);
          Alert.alert("Thông báo", error.message);
        });
    }
  };
  return (
    //đảm bảo giao diện hiển thị an toàn trên các thiết bị có vùng an toàn (safe area).
    <SafeAreaView
      style={{
        // Đặt thuộc tính cho SafeAreaView
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: useColor.primary, // sử dụng màu từ thư viện 'Color'.
      }}>
      {/* Phần header */}
      <View style={{ alignItems: 'center', gap: 10, justifyContent: 'center', height: responsiveHeight(30) }}>
       
        <Image
          style={{ width: '100%', height: '85%', resizeMode: 'contain' }}
          source={{ uri: 'https://mir-s3-cdn-cf.behance.net/projects/404/4fabff156214799.Y3JvcCw5ODEsNzY4LDIxLDA.png' }}
        />
        <Text style={{color:'#fff', fontSize:18, fontWeight:'bold'}}>Hãy tạo một tài khoản</Text>
      </View>

      
      <View style={{ height: responsiveHeight(30), flexDirection: 'column', gap: 10, justifyContent: "space-around" }}>
        {/* Trường nhập số điện thoại */}
        <View style={{
          alignItems: 'stretch',
          backgroundColor: '#E3E3E3',
          paddingHorizontal: 10,
          marginHorizontal: 10,
          borderRadius: 10,
          borderColor: 'white',
          height: 60
        }}>
          {/* Trường nhập số điện thoại */}
          <TextInput style={{
            fontWeight: '600',
            fontSize: 17,
            height: 60
          }} placeholder="Nhập email" 
          onChangeText={(text)=>{setEmail(text);}}
          />
        </View>

        {/* Trường nhập mật khẩu */}
        <View style={{
          alignItems: 'stretch',
          backgroundColor: '#E3E3E3',
          paddingHorizontal: 10,
          marginHorizontal: 10,
          borderRadius: 10,
          borderColor: 'white',
          borderWidth: 2,
          height: 60,
        }}>
          {/* Trường nhập mật khẩu với thuộc tính secureTextEntry để che mật khẩu */}
          <TextInput style={{
            fontWeight: '600',
            fontSize: 17,
            height: 60
          }} placeholder="Nhập mật khẩu" secureTextEntry={true} 
            onChangeText={(text)=>setPassword(text)} 
          />
        </View>
        <View style={{
          alignItems: 'stretch',
          backgroundColor: '#E3E3E3',
          paddingHorizontal: 10,
          marginHorizontal: 10,
          borderRadius: 10,
          borderColor: 'white',
          borderWidth: 2,
          height: 60,
        }}>
          {/* Trường nhập mật khẩu với thuộc tính secureTextEntry để che mật khẩu */}
          <TextInput style={{
            fontWeight: '600',
            fontSize: 17,
            height: 60
          }} placeholder="Nhập lại mật khẩu" secureTextEntry={true} 
            onChangeText={(text)=>setRePassword(text)} 
          />
        </View>
      </View>

      {/* Nút đăng nhập */}
      <TouchableOpacity
        onPress={handlSignup}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 10,
          marginHorizontal: 10,
          borderWidth: 2,
          backgroundColor: 'black',
          height: 60,
          marginTop: 40,
          borderRadius: 20,
        }}>
        <Text style={{
          color: 'white', fontSize: 22, fontWeight: '700',
        }}>Sign up</Text>
      </TouchableOpacity>

      {/* Phần "Remember Me" và "Forgot Password?" */}
    
     
      <View style={{ flexDirection: 'row', marginHorizontal: 20,marginTop:50, justifyContent: 'center' }}>
        <Text style={{ color: 'white', fontWeight: '500', fontSize: 16 }}>Đã có tài khoản ?</Text>
        <TouchableOpacity
          onPress={() => {nav.navigate("Login")}}>
          <Text style={{ color: 'yellow', fontWeight: '500', fontSize: 16 }}> Log in Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Signup;
