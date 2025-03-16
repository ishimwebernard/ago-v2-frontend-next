"use client"
import Menu from "../menu"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import React, {useState, useEffect} from "react"
import {Plus, Minus} from 'lucide-react'
import { Button } from "@/components/ui/button"
import axios from "axios"
  import { v4 as uuidv4 } from 'uuid';




export default function Cart() { 
const [updateCombo, setUpdateCombo] = useState<any>([])

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
                               
                                setQty(qty+1)
                                combo[tagNumber].quantity = qty
                                updateComboCard(combo)
                                console.log(updateCombo)


                            }}/>
                            <p>{qty}</p>
                            <Minus onClick={()=>{
                             setQty(qty-1)
                             combo[tagNumber].quantity = qty
                             updateComboCard(combo) 
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
type MenuDisplayerType = {
    updateCombo: any,
}
const MenuDisplayer: React.FC<MenuDisplayerType> = ({updateCombo}) =>{
    let graphics = []
    let tempTotal = 0
    updateCombo.forEach((item, index)=>{
        graphics.push( <TableRow>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell>{item.price * item.quantity}</TableCell>
        </TableRow>
        )
        tempTotal = (tempTotal+(item.price*item.quantity))
    })
    
    return (
 <div className="flex flex-col p-4 gap-y-4">
           <Table>
        <TableHeader>
            <TableRow>
                <TableHead>ITEM</TableHead>
                <TableHead>QTY</TableHead>
                <TableHead>U.P</TableHead>
                <TableHead>TOTAL</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
           {graphics}
           <TableRow>
            <TableCell>Overall</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>{tempTotal}</TableCell>
           </TableRow>
        </TableBody>
    </Table>
    <Button>Checkout</Button>

 </div>
        
    )
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
<div className="grid grid-flow-col w-full gap-4">
<div className="flex flex-col gap-4 col-span-2">
    {proper}
</div>
  <Card>
        <CardHeader>
            <CardTitle>Checkout Details</CardTitle>
        </CardHeader>
        <MenuDisplayer updateCombo={updateCombo}/>
    
    </Card>
</div>
      
    )
}

    const fetchItems = () =>{
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
        // setRawData(cartItems)
        // // cartItems.forEach((item, index)=>{
        // //     proper.push(
        // //       <CardGraphicsItem item={item} tagNumber={index} allData={cartItems}/>
        // //     )
        // // })
        // setdatagraphics(proper)
        
    }

useEffect(()=>{
    fetchItems()
}, [])
  return (
    <div>
      <Menu />
<div className="px-12">
<p className="font-bold text-4xl py-8">Shopping Cart</p>
<Main updateCombo={updateCombo} setUpdateCombo={setUpdateCombo}/>
</div>


    </div>
  )
}
