"use client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/customer-sidebar"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { UserRound } from "lucide-react"
import axios from "axios"
import { Card,   CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle, } from "@/components/ui/card"
import { Badge} from "@/components/ui/badge" 
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"




export default function Layout({ children }: { children: React.ReactNode }) {
  const userId = usePathname().split('/')[2]   
  const [cInfo, setCInfo] = useState({})
  const [cSlaves, setCSlaves] = useState([])



  useEffect(()=>{
        let dynamicGraphics = []
     const getCustomerInfo = async (id:string)=>{
  try{
    const data = await axios({
      method: 'GET',
      url: `http://localhost:3000/customers/${id}`
    })
    const customer = data.data
    setCInfo(customer)

    //Fetch the slaves
    try{
      const slaves = await axios({
        url: `http://localhost:3000/customers/${id}/slaves`,
        method: 'GET'
      })
      slaves.data.forEach((item, index)=>{
        dynamicGraphics.push(
          <Card className="w-[175px] p-8 content-center justify-center">
            <UserRound className="h-8 w-8"/>
            <CardTitle>{item.name}</CardTitle>
            <CardDescription>{item.phonenumber}</CardDescription>
            <Badge>{item.customerClass}</Badge>
          </Card>
        )
      })
      setCSlaves(dynamicGraphics)
    }catch(e){
      console.log(e)
    }
    
    return customer
  }catch(err){
    console.log(err)
  }
  }
  getCustomerInfo(userId) 
  }, [])
  console.log(cInfo)
 
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <div className="w-full p-8">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex space-x-4">
                <p>Welcome {cInfo.name}</p>
                <Badge>{cInfo.customerClass}</Badge>
              </CardTitle>
              <CardDescription>
                Manage your profile and view main settings about your account
              </CardDescription>
              <CardContent>
                <div className="flex space-x-4">
                {cSlaves}
                </div>
                <div className="mt-4">
                  <CardTitle>Account Details</CardTitle>
                </div>

              </CardContent>
            </CardHeader>
          </Card>
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