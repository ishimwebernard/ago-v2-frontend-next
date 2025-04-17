"use client"
import Menu from "./menu"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {useState, useEffect} from "react"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"

import axios from "axios"
  import { v4 as uuidv4 } from 'uuid';

export default function Home() { 
  const [datagraphics, setDataGraphics] = useState([])
  const [refresher, setRefresher] = useState(true)
  let cartItems:any[] = [<p>Sample stuff</p>]
  const searchforData = async() =>{
    cartItems = JSON.parse(localStorage.getItem('cart') || "null") || [] 
    try{
        const response = await axios({
            url: 'http://localhost:3000/getstockitems',
            method: 'GET'
        })
 
        if (response) {
            const proper = response.data
            let properGraphics:any[] = []
            let footer:any;
            proper.forEach((item, index)=>{
              let foundItem = cartItems.find(it => item.id === it.id)
              if (foundItem){
                footer = (<Button disabled>Remove to Cart</Button>)
                setRefresher(!refresher)
              }else{
               footer = (<Button onClick={()=>{
                cartItems.push(item)
              localStorage.setItem('cart', JSON.stringify(cartItems))
              window.location.reload()                        
               }}>Add to cart</Button>)
              }
               properGraphics.push(
               <Card key={uuidv4()} className="px-0 py-0">
                <CardHeader>
                    <CardTitle className="text-md">
                    {item.name}
                    </CardTitle>
                    <CardTitle>
                        <p className="text-sm lg:text-lg font-bold leading-tight">Rwf. {item.price}</p>
                    </CardTitle>
                    <CardDescription className="">
                    {item.description}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <img src="https://res.cloudinary.com/bn47/image/upload/v1737293968/holder_b8j3pp.jpg" className="object-fit w-full rounded-sm"/>
                    
                </CardContent>
                <CardFooter>
                  <div className="w-full">
                  {footer} 
                  </div>
                </CardFooter>
            </Card>)
            })
            setDataGraphics(properGraphics)
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
      <Carousel>
  <CarouselContent>
    <CarouselItem>
    <section className="h-72 object-fit w-screen lg:h-screen bg-[url('https://res.cloudinary.com/bn47/image/upload/v1731153180/nunu_sjf2bc.png')]">
                <div className='bg-gray-800/50 w-full h-full flex flex-col justify-center items-center px-12'>
                    <p className='lg:text-6xl text-3xl text-center font-bold text-gray-200'>
                      Shop together with confidence!
                    </p>
                    <div className=''>
                    <p className='p-4 font-bold leading-tight mt-6 bg-gray-200 text-gray-800 w-fit'>
                    <a href="tel:*211#" >Scroll to get Started</a> 
                    </p>
                    </div>
                </div>
        </section>
    </CarouselItem>
    <CarouselItem>
    </CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
<div className="px-4 lg:px-12 mt-4">
<p className="font-bold text-xl text-center lg:text-4xl lg:py-8">Browse all available products!</p>
<div className="grid grid-cols-2 lg:grid-cols-4 lg:gap-4 mt-4">
    {datagraphics}
</div>
</div>
<Toaster />

    </div>
  )
}
