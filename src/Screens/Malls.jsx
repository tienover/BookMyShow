import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { responsiveHeight } from 'react-native-responsive-dimensions'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useColor } from '../Utils/Color';
import { Seats } from '../Utils/Data';
import Availability from '../Components/Availability';
import { MallSeats } from '../Context/Wrapper';

const Malls = ({route}) => {
    const nav = useNavigation()

    const{title,mall,date,time,img}=route.params
    const{seatsArray,setseatsArray}=useContext(MallSeats)

    let amout =0
    if(seatsArray.length>0){
      amout=100*seatsArray.length
    }
     
       
  return (
    
    <SafeAreaView style={{
        paddingHorizontal:10,
        flex:1,
        backgroundColor:'white',
        gap:10
        }}>

          <View style={{
            flexDirection:'row',
            alignItems:'center',
            gap:10,
            height:responsiveHeight(6), 
            borderBottomColor:'#E3E3E3',
            borderBottomWidth:2,
            }}>
              <Ionicons onPress={()=>{
                nav.goBack()
              }}
              name="chevron-back" size={32} color={useColor.primary} />
              <Text style={{fontWeight:'600',color:'black', fontSize:16}}>{title}</Text>
            </View>
            
            <Text style={{
                fontSize:17,
                color:'grey',
                fontWeight:'400'
                }}>{mall} | {date.dat}th Date | {time}AM
            </Text>

            <View style={{alignItems:'center'}} >
              <FlatList 
                  numColumns={6} 
                  data={Seats}
                  renderItem={({ item, index }) => 
                      seatsArray.includes(item) ? (
                         <TouchableOpacity 
                            onPress={() => { 
                              setseatsArray(seatsArray.filter(remove=>remove!==item))
                            }}
                               style={{
                                  backgroundColor: 'green',
                                  height: 40,
                                  width: 40,
                                  borderTopLeftRadius: 10,
                                  borderTopRightRadius: 10,
                                  margin: '3%',
                                  alignItems: 'center'
                                      }}
                                 ></TouchableOpacity>
                                   ) : ( 
                                   <TouchableOpacity 
                            onPress={() => {
                               setseatsArray([...seatsArray,item])
                                     }}
                               style={{
                                 backgroundColor: '#E3E3E3',
                                 height: 40,
                                 width: 40,
                                 borderTopLeftRadius: 10,
                                 borderTopRightRadius: 10,
                                 margin: '3%',
                                 alignItems: 'center'
                                     }}
                                  ></TouchableOpacity>
                         )
                    }
                        />

                    </View>

            <View style={{
                
                alignItems:'center',
                justifyContent:'space-between',
                flexDirection:'row',
                paddingHorizontal:10,
                marginTop:20,
                }}>
                <Availability colors={'red'} name={'Unavailable'}/>
                <Availability colors={'#E3E3E3'} name={'Available'}/>
                <Availability colors={'green'} name={'Selected'}/>
            </View>

               <View style={{flex:0.9,justifyContent:'flex-end'}}>
            <TouchableOpacity 
            onPress={()=>{
              amout==0?Alert.alert('please select seats'): nav.navigate('MyTicket',{
                  title,
                  img,
                  mall,
                  time,
                  date:date.dat,
                         })
            }}
            activeOpacity={0.9}
            style={{
              height:50,
              backgroundColor:useColor.primary,
              justifyContent:"space-between",
              alignItems:'center',
              borderRadius:10,
              flexDirection:'row',
              paddingHorizontal:30,
              
              }}>

                  <Text style={{color:'white',fontSize:16,fontWeight:'700',}}>Thanh Toán :</Text>
                  <Text style={{color:'white',fontSize:16,fontWeight:'700'}}>{amout}</Text>

            </TouchableOpacity>
            </View> 
      </SafeAreaView>
  )
}

export default Malls