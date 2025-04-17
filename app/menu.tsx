"use client"

import * as React from "react"
import Link from "next/link"
import axios from "axios"
import { useState, useEffect, useCallback } from 'react';
import { cn } from "@/lib/utils"
import Image from 'next/image'
import {Button} from "../components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'

import {
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import {
    CreditCard,
    Keyboard,
    LogOut,
    User,
  } from "lucide-react"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

  import { Search } from 'lucide-react';
  import logoimage from '../components/ago-mono-logo_oe934b.png'



export default function Menu() {
const [searchtext, setSearchText] = useState('')
const [upGraphics, setUpGraphics] = useState(
  <Button onClick={()=>{
  router.push('/login')
}}>Login</Button>
)
const router = useRouter()
  useEffect(()=>{
const findDetails = () =>{
  let urlMaker = ''
  let cartItems:any[] = []
  const logedinUser = JSON.parse(localStorage.getItem("logedin-user") || "null")
  console.log("Loged in User===>", logedinUser)
  
  if (logedinUser){
    switch (logedinUser.role){
      case 1:
  
      break;
      case 2:
  
      break;
      case 3:
        urlMaker = '/customer/'+logedinUser.id
      break;
    }
    setUpGraphics(
   <div className="flex flex-row justify-center items-center">
    <Button variant="outline" onClick={()=>{
        router.push('/cart')
        }}>Cart</Button>
      <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
        <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{logedinUser.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={()=>{
            router.push(urlMaker+'/account')
          }}>
            <User />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={()=>{
            router.push(urlMaker+'/orders')
          }}>
            <CreditCard />
            <span>Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Keyboard />
            <span>Keyboard shortcuts</span>
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem onClick={()=>{
          localStorage.removeItem('cart')
            localStorage.removeItem('logedin-user')
            router.push('/')
          }}>
          <LogOut />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
   </div>
    )
  }
}

findDetails();
  }, [])
  return (
  <div className="flex items-center justify-between py-4 px-2 lg:px-10">
      
      {/* <Icons.logo className="h-6 w-12" /> */}
      <a href="/">
      <Image src={logoimage} className="lg:w-32 w-[75px] h-[50px]"/>
      </a>

    <Dialog>
  <DialogTrigger>
  <div className="flex justify-between px-4 py-2 bg-gray-100 hover:bg-gray-300 rounded-sm cursor-pointer w-48 lg:w-64">
  <span className="text-gray-700 font-small">Search product</span>
  <Search />
</div>

  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Search for an item in our store!</DialogTitle>
      <DialogDescription>
        Search accross all categories of our products
      </DialogDescription>
      <div className="flex gap-4">
      <Input type="email" placeholder="Search Item" onChange={(e)=>{
        setSearchText(e.target.value)
      }}/>
      <Button type="submit" onClick={()=>{
        router.push(`/search/${searchtext}`)
      }}>Search</Button>
      </div>
    </DialogHeader>
  </DialogContent>
</Dialog>
{upGraphics}

  </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
