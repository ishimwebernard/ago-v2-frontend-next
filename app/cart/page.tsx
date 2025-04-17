"use client"
import Menu from "../menu"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import React, {useState, useEffect} from "react"
import {Plus, Minus, } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { v4 as uuidv4 } from 'uuid';
import { Toaster } from "@/components/ui/sonner"
import { useRouter } from 'next/navigation'




export default function Cart() { 
const [updateCombo, setUpdateCombo] = useState<any>([])
let logedinUser;
let router = useRouter()

  let proper:any[] = []
  let cartItems:any[] = []
  let globalRawData:any[] = []

  type CardProps = {
    item: any,
    tagNumber: number,
    allData: any,
    combo: any,
    updateComboCard: React.Dispatch<React.SetStateAction<any>>
  }

    let CardGraphicsItem:React.FC<CardProps>  = ({item, tagNumber, allData, combo,updateComboCard}) =>{
        const [qty, setQty] = useState(1)
        let kuantity = 1
        let propItem = item
        return (
            <Card key={uuidv4()}>
            <CardContent>
                <div className="flex gap-8">
                    <img className="aspect-square h-20 " src="https://res.cloudinary.com/bn47/image/upload/v1737293968/holder_b8j3pp.jpg" />
                    <div className="flex flex-col gap-2">
                        <p>{propItem.name}</p>
                        <p>Rwf {propItem.price}</p>
                        <div className="flex gap-4 outline-dashed">
                            <Plus onClick={()=>{
                               kuantity += 1
                                setQty(kuantity)
                                combo[tagNumber].quantity = kuantity
                                updateComboCard(combo)
                                console.log(combo)
                                localStorage.setItem('cart', JSON.stringify(updateCombo))


                            }}/>
                            <p>{qty}</p>
                            <Minus onClick={()=>{
                                kuantity = kuantity -1
                             setQty(kuantity)
                             combo[tagNumber].quantity = kuantity
                             updateComboCard(combo) 
                             localStorage.setItem('cart', JSON.stringify(updateCombo))

                            }}/>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
        )
    }

type MainType = {
    updateCombo: any,
    setUpdateCombo: React.Dispatch<React.SetStateAction<any>>
}

let Main: React.FC<MainType> = ({updateCombo, setUpdateCombo}) =>{
    console.log(updateCombo)
    proper = []
    if(updateCombo){
        updateCombo.forEach((item:any, index:any)=>{
        proper.push(
          <CardGraphicsItem item={item} tagNumber={index} allData={cartItems} updateComboCard={setUpdateCombo} combo={updateCombo}/>
        )
    }) 
    }

return (
<div className="w-full flex flex-col ">
<div className="flex flex-col">
    {proper}
</div>
<Button onClick={()=>{
    router.push('cart/checkout')
}}>View Receipt and Payment</Button>
</div>
      
    )
}

    const fetchItems = () =>{
        logedinUser = JSON.parse(localStorage.getItem("logedin-user") || "null")
        let tempCartItems = JSON.parse(localStorage.getItem('cart') || "null") || [] 
        let globalThing = {
            activeItem: -1,
            data: []
        }
        cartItems = []
        proper = []
        tempCartItems.forEach((item:any, index:any)=>{
            item.quantity = 1
            cartItems.push(item)
        })
        localStorage.setItem('cart', JSON.stringify(tempCartItems))
        setUpdateCombo(tempCartItems)        
    }

useEffect(()=>{
    fetchItems()
}, [])
  return (
    <div>
                <Toaster />

      <Menu />
<div className="px-12">
<p className="font-bold text-4xl py-8">Shopping Cart</p>
{updateCombo.length == 0 ? (<div className="flex flex-col items-center justify-center space-y-6">
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
    <p className="text-2xl">Cart is Empty</p>
    <Button onClick={()=>{
        router.push('/')
    }}>Back to Home Page</Button>
</div>): (<Main updateCombo={updateCombo} setUpdateCombo={setUpdateCombo}/>)}
</div>


    </div>
  )
}
