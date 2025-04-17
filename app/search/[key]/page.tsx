"use client"
import Menu from "../../menu"
import {React, useEffect, useState} from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {Button} from "@/components/ui/button"

type Found = {
        shopkeeperId?: number,
        name?: string,
        quantity: number,
        price: number,
        picture: string,
        description: string,
        costprice: number,
}

export default  function Search({ params }: any){
    const [foundGraphics, setFoundGraphics] = useState([])
    const key = params.key

    const searchforData = async() =>{
        try{
            const response = await fetch(`http://localhost:3000/stockitems?key=${key}`,{
                method: 'GET'
            })

            if (response) {
                const proper = await response.json()
                let properGraphics = []
                console.log(proper)
                setFound(proper)
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
                setFoundGraphics(properGraphics)
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
    <div className="grid grid-cols-4  gap-4">
        {foundGraphics}
      
    </div>
</div>
    )
}