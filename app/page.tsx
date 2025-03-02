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
                footer = (<Button disabled>Added to Cart</Button>)
                setRefresher(!refresher)
              }else{
               footer = (<Button onClick={()=>{
                cartItems.push(item)
              localStorage.setItem('cart', JSON.stringify(cartItems))
              window.location.reload()                        
               }}>Add to cart</Button>)
              }
               properGraphics.push(
               <Card key={uuidv4()}>
                <CardHeader>
                    <CardTitle>
                    {item.name}
                    </CardTitle>
                    <CardTitle>
                        <p className="text-xl font-bold leading-tight">Rwf. {item.price}</p>
                    </CardTitle>
                    <CardDescription>
                    {item.description}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <img src="https://res.cloudinary.com/bn47/image/upload/v1737293968/holder_b8j3pp.jpg" className="object-fit w-full rounded-xl"/>
                    
                </CardContent>
                <CardFooter>
                  {footer} 
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
    <section className="w-screen h-screen bg-[url('https://res.cloudinary.com/bn47/image/upload/v1731153180/nunu_sjf2bc.png')]">
                <div className='bg-gray-800/50 w-full h-full flex flex-col justify-center items-left px-12'>
                    <p className='text-6xl font-bold text-gray-200'>
                      Shop together with confidence!
                    </p>
                    <div className='w-1/2 '>
                    <p className='text-sm text-gray-100'>
                      Earn while you spend! Yes, with Ago shopping you can get profit from your colleagues and get the chance of getting a loan from the shop.
                    </p>
                    <p className='p-4 font-bold leading-tight mt-6 bg-gray-200 text-gray-800 w-fit'>
                    <a href="/login" >Get Started</a> 
                    </p>
                    </div>
                </div>
        </section>
    </CarouselItem>
    <CarouselItem>
    <section className="w-screen h-screen bg-[url('https://res.cloudinary.com/bn47/image/upload/v1737293968/holder_b8j3pp.jpg')]">
                <div className='bg-gray-800/50 w-full h-full flex flex-col justify-center items-left px-12'>
                    <p className='text-6xl font-bold text-gray-200'>
                      Spend to earn!
                    </p>
                    <div className='w-1/2 '>
                    <p className='text-sm text-gray-100'>
                      Earn while you spend! Yes, with Ago shopping you can get profit from your colleagues and get the chance of getting a loan from the shop.
                    </p>
                    <p className='p-4 font-bold leading-tight mt-6 bg-gray-200 text-gray-800 w-fit'>
                    <a href="/login" >Get Started</a> 
                    </p>
                    </div>
                </div>
        </section>
    </CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
<div className="px-12">
<p className="font-bold text-4xl py-8">Browse all available products!</p>
<div className="grid grid-cols-4 gap-4">
    {datagraphics}
</div>
</div>


    </div>
  )
}
