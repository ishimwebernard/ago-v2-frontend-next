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


export default function Home() {
  const [datagraphics, setDataGraphics] = useState([])

  const searchforData = async() =>{
    try{
        const response = await fetch(`http://localhost:3000/getstockitems`,{
            method: 'GET'
        })

        if (response) {
            const proper = await response.json()
            let properGraphics = []
            properGraphics = proper.map((item, index)=>(
                <Card>
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
                    <Button>Add to cart</Button>
                </CardFooter>
            </Card>
            ))
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
