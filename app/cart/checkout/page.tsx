"use client"
import Menu from "../../menu"
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
import {Plus, Minus, ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import axios from "axios"
import { v4 as uuidv4 } from 'uuid';
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { useRouter } from 'next/navigation'




export default function Checkout() { 
const [updateCombo, setUpdateCombo] = useState<any>([])
let logedinUser = JSON.parse(localStorage.getItem("logedin-user") || "null")
useEffect(()=>{
    setUpdateCombo(JSON.parse(localStorage.getItem("cart") || "null"))
}, [])

let router = useRouter()

type MenuDisplayerType = {
    updateCombo: any,
}
const MenuDisplayer: React.FC<MenuDisplayerType> = ({updateCombo}) =>{
    let graphics = []
    let tempTotal = 0
    updateCombo.forEach((item, index)=>{
        graphics.push(
        <TableRow>
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
    <Toaster />
    <Button onClick={async()=>{

        let orderFormatter = {
            customerId: logedinUser.id, 
            shopkeeperId: updateCombo[0].shopkeeperId, 
            items:updateCombo,
            total: tempTotal
        }
        console.log(orderFormatter)
        try{
            const res = await axios({
                url: 'http://localhost:3000/orders',
                method: 'post',
                data: orderFormatter
            })
            localStorage.removeItem('cart')
            toast(
                'Order Succesfully Submitted',{
                description: 'Thank you for working with Ago Shopping, you can pick up your goods any time',
                action:{
                    label: "Ok",
                    onClick: ()=>{
                        router.push("/")
                    }
                }}
            )

        }catch(err){
            console.log(err)
        }
       
    }}>Checkout</Button>

 </div>
        
    )
}

  let proper:any[] = []
  let cartItems:any[] = []
  let globalRawData:any[] = []

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
</div>): (
<MenuDisplayer updateCombo={updateCombo}/>

)}
</div>


    </div>
  )
}
