import { View, Text,Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { responsiveHeight } from 'react-native-responsive-dimensions'
import { AntDesign } from '@expo/vector-icons';
import { useColor } from '../Utils/Color';
import { useNavigation } from '@react-navigation/native'
import { MallSeats, Store } from '../Context/Wrapper'

const MyTicket = ({route}) => {
  const{title,mall,date,time,img}=route.params
  const {data,setdata}=useContext(Store)
  const{seatsArray,setseatsArray}=useContext(MallSeats)
  const nav = useNavigation()
  return (
    <SafeAreaView style={{flex:1,paddingHorizontal:10,backgroundColor:'white'}}>
         <View style={{
                    flexDirection:'row',
                    alignItems:'center',
                    gap:10,
                    height:responsiveHeight(6),
                    borderBottomColor:'#E3E3E3',
                    borderBottomWidth:2}}>
               <Ionicons onPress={()=>{
                nav.goBack()

               }} name="chevron-back" size={32} color="red" />
               <Text style={{
                    color:'black',
                    fontWeight:'700',
                    fontSize:17,
                    }}>MyTicket</Text>
            </View>

          <View style={{
            flexDirection:"row",
            gap:10,
            borderRadius:10,
            borderWidth:2,
            borderColor:'grey',
            backgroundColor:'white'}}>
              <Image 
              style={{width:130,height:150,borderRadius:10,resizeMode:'contain'}}
              source={{uri:img}}/>

              <View style={{gap:10}}>
                <Text style={{fontWeight:'600',color:'black',fontSize:15}}>{title}</Text>
                <Text style={{fontWeight:'500',color:'grey',fontSize:14}}>{mall},{data}</Text>
                <Text style={{fontWeight:'500',color:'grey',fontSize:14}}>{date}th,{time}</Text>
                <Text style={{fontWeight:'500',color:'black',fontSize:14}}>{seatsArray.join(' , ')}</Text>

                <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                   <AntDesign name="barcode" size={24} color="black" />
                   <Text style={{fontWeight:'600',color:'black',fontSize:14}}>{seatsArray}SXSAD</Text>
                </View>
             </View>

          </View>
          <View style={{flex:0.95,justifyContent:'flex-end',paddingHorizontal:20}}>
          <TouchableOpacity 
          onPress={()=>{
            nav.navigate('Home')
            setseatsArray([])
          }}
          style={{
            height:50,
            backgroundColor:useColor.primary,
            borderRadius:10,
            justifyContent:'center',
            alignItems:'center'}}>
              <Text style={{color:'white',fontSize:16,fontWeight:'600'}}>TOBE CONTINUE</Text>
          </TouchableOpacity>
          </View>
          
    </SafeAreaView>
  )
}

export default MyTicket