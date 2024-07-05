import React, { PureComponent, createContext,useState } from 'react'


export const Store=createContext()
export const MallSeats=createContext()

export const Wrapper=({children})=>{
    const [seatsArray, setseatsArray] = useState("")
    const [data, setdata] = useState()
 return(
            <Store.Provider value={{data,setdata}}>
                <MallSeats.Provider value={{seatsArray,setseatsArray}}>
                {children}
                </MallSeats.Provider>
                </Store.Provider>


        )


}