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
import {useState, useEffect} from "react"
import {Plus, Minus} from 'lucide-react'
import { Button } from "@/components/ui/button"
import axios from "axios"
  import { v4 as uuidv4 } from 'uuid';




export default function Home() { 

    let CardGraphicsItem = (item:any) =>{
        const [qty, setQty] = useState(1)
        let propItem = item.item
        console.log(item)
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
                            }}/>
                            <p>{qty}</p>
                            <Minus onClick={()=>{
                                setQty(qty-1)
                            }}/>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
        )
    }

    let ReceiptMaker = () =>{
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Checkout Details</CardTitle>
                </CardHeader>
                <CardContent>
    
                </CardContent>
            </Card>
        )
    }








  const [datagraphics, setdatagraphics] = useState([])
  let proper:any[] = []
  let cartItems:any[] = [<p>Sample stuff</p>]
    const fetchItems = () =>{
        cartItems = JSON.parse(localStorage.getItem('cart') || "null") || [] 
        cartItems.forEach((item, index)=>{
            proper.push(
              <CardGraphicsItem item={item}/>
            )
        })
        setdatagraphics(proper)
        console.log(datagraphics)
    }

useEffect(()=>{
    fetchItems()
}, [])
  return (
    <div>
      <Menu />
<div className="px-12">
<p className="font-bold text-4xl py-8">Shopping Cart</p>
<div className="grid grid-flow-col w-full gap-4">
<div className="flex flex-col gap-4 col-span-2">
    {datagraphics}
</div>
<ReceiptMaker />
</div>
</div>


    </div>
  )
}
