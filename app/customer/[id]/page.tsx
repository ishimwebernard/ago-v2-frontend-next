"use client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/customer-sidebar"
import {useEffect} from "react"

export default function Customer({params}:any) {

  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <div>
            <p>This is it</p>
            <p>{params.id}</p>
        </div>
      </main>
    </SidebarProvider>
  )
}


// export default function Customer({params}:any){

//     return (
// <div>
//     <p>{params.id}</p>
// </div>
//     )
// }