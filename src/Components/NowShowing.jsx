import { View, Text, FlatList,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { nowShowing } from '../Utils/Data'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Details from '../Screens/Details';

const NowShowing = () => {
  const nav = useNavigation()
  return (
        <FlatList
        numColumns={2}
         data={nowShowing} 
         renderItem={({item,index})=>(
            <TouchableOpacity 
            onPress={()=>{
              nav.navigate('Details',{item})

            }}

             style={{
                flex:1,
                 margin:'1%',
                  
                 borderRadius:10
                }}>

                    <Image style={{height:400, borderRadius:10}} source={{uri: item.img}}/>

                    <View style={{position:'absolute', bottom:25, left:15, gap:5}}>
                        <Text style={{color:'white', fontWeight:'600', fontSize: 16}}>
                            {item.title}</Text>

                            <View style={{flexDirection:'row',gap:5, alignItems:'center'}}>
                            <MaterialIcons name="favorite" size={24} color="red" />
                            <Text style={{fontSize:13, color:'white',fontWeight:'400'}} >{item.fav}%</Text>
                            </View>


                    </View>
                </TouchableOpacity>

        )}/>
  )
}

export default NowShowing