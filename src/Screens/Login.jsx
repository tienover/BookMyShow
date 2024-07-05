import { View, Text, Image, Button, TextInput, TouchableOpacity,Alert } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useColor } from '../Utils/Color';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';


const Login = () => {


  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')



  
  // quản lý định tuyến.
  const nav = useNavigation();

  const handleLoginClick =()=>{
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Đăng nhập thành công
        console.log('User signed in!');
        const user = userCredential.user;
        // Điều hướng đến màn hình khác nếu cần
        nav.navigate('SelectCity');
      })
      .catch(error => {
        // Xử lý lỗi đăng nhập
        Alert.alert("thông báo","dang nhap khong thanh cong")
      });
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
          style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
          source={{ uri: 'https://mir-s3-cdn-cf.behance.net/projects/404/4fabff156214799.Y3JvcCw5ODEsNzY4LDIxLDA.png' }}
        />
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
      </View>

      {/* Nút đăng nhập */}
      <TouchableOpacity
        onPress={handleLoginClick}
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
        }}>Login</Text>
      </TouchableOpacity>

      {/* Phần "Remember Me" và "Forgot Password?" */}
      <View style={{
        marginTop: 20,
        height: 60, gap: 10,
        justifyContent: 'space-between'
      }}>
        <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', marginHorizontal: 15 }}>
          {/* Checkbox "Remember Me" */}
          <BouncyCheckbox
            size={25}
            fillColor="black"
            unfillColor="#FFFFFF"
            text="Remember Me"
            iconStyle={{ borderColor: "black" }}
            innerIconStyle={{ borderWidth: 2 }}
            textStyle={{ color: 'white', fontWeight: '400' }}>
          </BouncyCheckbox>
          <TouchableOpacity>
            
            <Text style={{ color: 'white', fontWeight: '500' }}>Forgot Passsword?</Text>
          </TouchableOpacity>
        </View>
      </View>

     
      <View style={{ flexDirection: 'row', marginHorizontal: 20, justifyContent: 'center' }}>
        <Text style={{ color: 'white', fontWeight: '500', fontSize: 16 }}>New to BookMyShow?</Text>
        <TouchableOpacity
          onPress={() => {nav.navigate('Signup')
            // Xử lý sự kiện khi nhấn nút "Sign Up Now"
          }}>
          <Text style={{ color: 'yellow', fontWeight: '500', fontSize: 16 }}> Sign Up Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Login;
