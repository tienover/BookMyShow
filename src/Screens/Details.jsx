import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { Theaters, dates } from '../Utils/Data';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';



const Details = ({route}) => {

    const nav = useNavigation()
    
    const{title,img}=route.params.item
    
    const [date, setdate] = useState()
    
    const [isSelected, setisSelected] = useState()

  return (
    <SafeAreaView style={{flex:1, backgroundColor:'white',gap:10}}>
        <View style={{
            flexDirection:'row',
            alignItems:'center',
            height:responsiveHeight(6),
            borderBottomColor:'#E3E3E3',
            borderBottomWidth:2,
            paddingHorizontal:12,
            justifyContent:'space-between',
        }}>

            {/*Chil box 1 */}
            <View style={{
                    flexDirection:'row',
                    alignItems:'center',
                    gap:10}}>
               <Ionicons onPress={()=>{
                nav.goBack()
               }} name="chevron-back" size={32} color="red" />
               <Text style={{
                    color:'black',
                    fontWeight:'600',
                    fontSize:17,
                    }}>{title}</Text>
            </View>

            {/*Chil box 2 */}
            <View style={{
                flexDirection:'row',
                alignItems:'center',
                gap:10}}>
                <Feather name="search" size={32} color="red" fontWeight="20"/>
            </View>
        </View>

        <View style={{
            height:responsiveHeight(10),
            alignItems:'center',
              }}>

        <FlatList
        horizontal 
        data={dates} renderItem={({item,index})=>
        
         <TouchableOpacity
                activeOpacity={0.5}
                onPress={()=>{
                       setisSelected(index)
                       setdate(item)
                              }}
                style={{
                        alignItems:'center',
                        justifyContent:'space-evenly',
                        paddingHorizontal:10,
                        marginHorizontal:10,
                        backgroundColor:isSelected==index?'red':null,
                         }}>

                 <Text style={{
                    color: isSelected==index?'white':'red',
                    fontWeight:'600',
                    fontSize:15
                    }}>{item.day}</Text>
                 <Text style={{
                    color: isSelected==index?'white':'black',
                    fontWeight:'700',
                    fontSize:15
                    }}>{item.dat}</Text>
                 <Text style={{
                    color: isSelected==index?'white':'black',
                    fontWeight:'800',
                    fontSize:15
                    }}>{item.mon}</Text>

        </TouchableOpacity>   
        }/>
              </View> 

        <View>
             <FlatList showsVerticalScrollIndicator={false} style={{
                marginHorizontal:20,
                }}
        data={Theaters} renderItem={({item,index})=>(

            <View style={{
                height:responsiveHeight(19),
                borderWidth:2,
                marginBottom:10,
                borderRadius:12,
                borderColor:'#E3E3E3',
                paddingHorizontal:10,
                paddingVertical:10,
                gap:10,
                
            }}>
                <View style={{
                    flexDirection:'row',
                    alignItems:'center',
                    gap:10}}>
                        <Entypo name="heart-outlined" size={25} color="red" fontWeight="15" />
                        <Text style={{fontWeight:"500",fontSize:15,color:'black'}}>{item.name}</Text>
                    </View>

                    <Text style={{
                        fontWeight:'400',
                        fontSize:14
                    }}>Non-cancelable
                    </Text>
                    <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                        {
                        item.timings.map((value,index)=>(

                            <TouchableOpacity onPress={()=>{
                                date!=null?
                                nav.navigate('Malls',{
                                    title,
                                    mall:item.name,
                                    date,
                                    time:value,
                                    img
                                }):Alert.alert('Please select day')

                            }} key={index} style ={{
                                paddingHorizontal:10,
                                borderWidth:2,
                                borderColor:'green',
                                marginRight:10,
                                marginBottom:12,
                                borderRadius:10,
                                            }}>
                                <Text style={{fontSize:13, color:'green'}}>
                                    {value}
                                </Text>
                            </TouchableOpacity>
                        ))
                        }
                    </View>
            
            </View>
        )}/>
        </View>
    </SafeAreaView>
  )
}

export default Details