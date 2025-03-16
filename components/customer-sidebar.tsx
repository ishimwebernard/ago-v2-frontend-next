"use client"
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import {Button} from "./ui/button"
import { useRouter } from 'next/navigation'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"



export function AppSidebar() {
  const router = useRouter()

const path = JSON.parse(localStorage.getItem("logedin-user") || "null").id
console.log(path)
const items = [
  {
    title: "Home",
    url: ("/"),
    icon: Home,
  },
  {
    title: "Orders",
    url: ("/customer/"+path+"/orders"),
    icon: Inbox,
  },
  {
    title: "Account",
    url: ("/customer/"+path+"/account"),
    icon: Calendar,
  }
]
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <Button onClick={()=>{
                       localStorage.removeItem('cart')
                       localStorage.removeItem('logedin-user')
                       router.push('/')
              }}>Log Out</Button>
            </SidebarMenu>

          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
