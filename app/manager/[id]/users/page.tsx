"use client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/manager-sidebar"
import {useEffect, useState} from "react"

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


import axios from "axios"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { toast } from "sonner"
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
    CardTitle,
  } from "@/components/ui/card"

export default function Shopkeeper(){
    const [customerGraphics, setCustomerGraphics] = useState([])
    const [shopkeepers, setShopkeepers] = useState([])
    let shopkeeperdetails = {
      name: '',
      email: '',
      password: '',
      phonenumber: '',
      managerid: 1
    }

    useEffect(()=>{
        async function fetchStock(){
            const tempCustomers = []
            const customers = await axios({
                method: 'get',
                url: 'https://v2-ago-2.onrender.com'+'/customers'
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
                    url: 'https://v2-ago-2.onrender.com'+'/shopkeepers',
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
        <div>
        <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create a Shopkeeper</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new agent of the business</DialogTitle>
          <DialogDescription>
            Add below the details of the shopkeeper
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Pedro Duarte"
              className="col-span-3"
              onChange={(e)=>{
                shopkeeperdetails = {...shopkeeperdetails, name: e.target.value}
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Phone Number
            </Label>
            <Input
              id="name"
              placeholder="07000000"
              className="col-span-3"
              onChange={(e)=>{
                shopkeeperdetails = {...shopkeeperdetails, phonenumber: e.target.value}
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Email
            </Label>
            <Input
              id="username"
              className="col-span-3"
              onChange={(e)=>{
                shopkeeperdetails = {...shopkeeperdetails, email:e.target.value}
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Default Password
            </Label>
            <Input
              id="username"
              className="col-span-3"
              onChange={(e)=>{
                shopkeeperdetails={...shopkeeperdetails, password: e.target.value}
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={async()=>{
            try{
              const res = await axios({
                method: 'post',
                url: 'https://v2-ago-2.onrender.com/shopkeepers/create',
                data: shopkeeperdetails
              })
              alert("Shopkeeper created, please refresh the page")
            }catch(error){
              alert("Something went wrong")
            }
          }}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
        </div>
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