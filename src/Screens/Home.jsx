import { View, Text,StatusBar, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import Header from '../Components/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useColor } from '../Utils/Color'
import NowShowing from '../Components/NowShowing';
import ComingSoon from '../Components/ComingSoon';


const Home = () => {
  const [Option, setOption] = useState(0)
  return (
        <SafeAreaView style={{flex:1, gap:20}}>
          <Header/>
            <View 
            style={{
              flexDirection:'row',
              alignItems:'center',
              justifyContent:'space-evenly'}}>

            <TouchableOpacity onPress={()=>{
                setOption(0)
              
            }}>
             <Text 
              style={{
                color:Option==0? useColor.primary: 'grey',
                fontSize:14,
                fontWeight:'bold'}}>NOW SHOWING</Text>
                  {
                    Option==0&&<View 
                    style={{
                      backgroundColor:'red',
                      width:31,
                      height:2.5,
                      alignSelf:'center',
                      marginTop:5}}>

                    </View>
                  } 

            </TouchableOpacity>
                        
            <TouchableOpacity onPress={()=>{
                setOption(1)

                }}>
                <Text 
                 style={{
                   color:Option==1? useColor.primary: 'grey',
                   fontSize:14,
                  fontWeight:'bold'}}>COMING SOON</Text>

                {
                    Option==1&&<View 
                    style={{
                      backgroundColor:'red',
                      width:31,
                      height:2.5,
                      alignSelf:'center',
                      marginTop:5}}>

                    </View>
                  } 
            </TouchableOpacity>

            </View>

                {
                 Option==0?(
                      <NowShowing/>
                    )
                    :(
                      <ComingSoon/>
                    )}

        </SafeAreaView>
  )
}

export default Home