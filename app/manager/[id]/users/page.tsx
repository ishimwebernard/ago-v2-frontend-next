"use client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/manager-sidebar"
import { usePathname } from "next/navigation"
//import { useRouter } from "next/router";
import {useEffect, useState} from "react"
import axios from "axios"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { WarningProvider } from "@radix-ui/react-dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

export default function Shopkeeper(){
    const lePath = usePathname().split('/')[2]
    //const router = useRouter()
    const [customerGraphics, setCustomerGraphics] = useState([])
    const [shopkeepers, setShopkeepers] = useState([])


    useEffect(()=>{
        async function fetchStock(){
            const tempCustomers = []
            const customers = await axios({
                method: 'get',
                url: 'http://localhost:3000/customers'
            })
            customers.data.forEach((item)=>{
              tempCustomers.push(
                <TableRow>
                <TableCell>{item.id}</TableCell>
                 <TableCell>{item.name}</TableCell>
                 <TableCell>{item.email}</TableCell>
                 <TableCell>{item.phonenumber}</TableCell>
                 <TableCell>{item.customerClass}</TableCell>
                 <TableCell>{item.referrerId}</TableCell>
                 <TableCell>Rwf {item.pfr}</TableCell>
                 <TableCell>{item.percentagetogive} %</TableCell>
                </TableRow>
              )
            })

            setCustomerGraphics(tempCustomers)
        }

        async function findShopkeepers(){
            try{
                let tempArray = []
                const shopkeepers = await axios({
                    method: 'get',
                    url: 'http://localhost:3000/shopkeepers',
                })
                shopkeepers.data.forEach((item: any)=>{
                    tempArray.push(
                      <TableRow>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.phonenumber}</TableCell>
                      <TableCell>{item.managerId}</TableCell>
                      </TableRow>
                    )
                })
                setShopkeepers(tempArray)

            }catch(error){
                toast("error", {description: "Something went wrong"})
            }
        }
        fetchStock()
        findShopkeepers()
    }, [])
    return (
        <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger />
       <div className="p-8">
       <Tabs defaultValue="customers" className="">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="customers">Customers</TabsTrigger>
                <TabsTrigger value="shopkeepers">Shopkeepers</TabsTrigger>
            </TabsList>
            <TabsContent value="customers" className="">
              <Card className="p-4">
                <CardTitle>
                  Active Customers
                </CardTitle>
                <CardDescription>
                  The table below shows the customers you have as well as their profits, classes and other relevant information.
                  You cannot change this in any way.
                </CardDescription>
                <CardContent>
                <Table>
                  <TableHeader>
                   <TableRow>
                   <TableHead>Id</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Referred By</TableHead>
                    <TableHead>Profit Accumulated</TableHead>
                    <TableHead>Percentage to distribute</TableHead>
                   </TableRow>
                  </TableHeader>
                  <TableBody>
                      {customerGraphics}
                  </TableBody>
                </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="shopkeepers">
                <Card className="p-4">
                  <CardTitle>Shopkeeper</CardTitle>
                  <CardDescription>
                    View Shopkeepers as well as their details. Note that the details are not editable, edits could be made from the shopkeeper's portal
                  </CardDescription>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone Number</TableHead>
                        <TableHead>Manager ID</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {shopkeepers}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
        </div>
        </main>
      </SidebarProvider>
    )
}