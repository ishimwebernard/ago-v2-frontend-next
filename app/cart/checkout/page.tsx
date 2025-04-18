"use client"
import Menu from "../../menu"
import {
    Table,
    TableBody,TableCell,

    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import React, {useState, useEffect} from "react"

import { Button } from "@/components/ui/button"
import axios from "axios"

import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { useRouter } from 'next/navigation'




export default function Checkout() { 
const [updateCombo, setUpdateCombo] = useState<any>([])
let logedinUser:any //= JSON.parse(window.localStorage.getItem("logedin-user") || "null");
if (typeof window !== "undefined"){
    logedinUser = JSON.parse(window.localStorage.getItem("logedin-user") || "null")
}
useEffect(()=>{
    logedinUser = JSON.parse(window.localStorage.getItem("logedin-user") || "null")
    setUpdateCombo(JSON.parse(window.localStorage.getItem("cart") || "null"))
}, [])

const router = useRouter()

type MenuDisplayerType = {
    updateCombo: any,
}
const MenuDisplayer: React.FC<MenuDisplayerType> = ({updateCombo}) =>{
    const graphics = []
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

        const orderFormatter = {
            customerId: logedinUser.id, 
            shopkeeperId: updateCombo[0].shopkeeperId, 
            items:updateCombo,
            total: tempTotal
        }
        console.log(orderFormatter)
        try{
            const res = await axios({
                url: 'https://v2-ago-2.onrender.com'+'/orders',
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
    <a className="p-2 text-sm font-regular text-center rounded-md leading-tight bg-primary text-primary-foreground shadow hover:bg-primary/90" href={"tel:*182*8*1*"+tempTotal+"#"}>Send Payment</a>

 </div>
        
    )
}

  const proper:any[] = []
  const cartItems:any[] = []
  const globalRawData:any[] = []

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
