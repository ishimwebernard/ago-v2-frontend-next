"use client"
import Menu from "../../menu"
import {React, useEffect, useState} from "react"
import axios from "axios"

type Found = {
        shopkeeperId?: number,
        name?: string,
        quantity: number,
        price: number,
        picture: string,
        description: string,
        costprice: number,
}
// async function getSearchItem(key: string){
//     const response = await fetch(`http://localhost:3000/stockitems?key=${key}`,{
//         method: 'GET'
//     })
//     return response.json()
// }

export default  function Search({ params }: any){
    const [found, setFound] = useState<Found | null> (null)
    const key = params.key

    const searchforData = async() =>{
        try{
            const response = await fetch(`http://localhost:3000/stockitems?key=${key}`,{
                method: 'GET'
            })

            if (response) {
                const proper = await response.json()
                console.log(proper)
                setFound(proper)
            }
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
         searchforData()
    }, [])
    return (
<div>
    <Menu />
</div>
    )
}