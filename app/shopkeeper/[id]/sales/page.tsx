"use client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/shopkeeper-sidebar"
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
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {useState, useEffect} from "react"
import axios from "axios"
import { usePathname } from "next/navigation"

export default function Shopkeeper(){
    const userId = usePathname().split('/')[2]   

    const [orders, setOrders] = useState([])
    let newStat = ""
    useEffect(()=>{
      
      const getOrders = async()=>{

        let orderGraph = []
        try{
          const loggedinUser = userId
        const data = await axios({
          method: 'GET',
          url: 'http://localhost:3000/orders/shopkeeper/'+loggedinUser,
        })
  
        console.log(data)
        
        data.data.forEach((item, index)=>{
          let itemsForOrder = []
          item.OrderItems.forEach((orderItem, i)=>{
            itemsForOrder.push(<TableRow>
              <TableCell>{orderItem.stockItemId}</TableCell>
              <TableCell>{orderItem.price}</TableCell>
              <TableCell>{orderItem.quantity}</TableCell>
              <TableCell>{orderItem.totalPrice}</TableCell>
              </TableRow>)
          })
          orderGraph.push(
            <TableRow>
            <TableCell className="font-medium w-[100px]">{item.id}</TableCell>
            <TableCell>{item.customerId}</TableCell>
            <TableCell className="w-[100px]">{item.status}</TableCell>
            <TableCell>{item.createdAt}</TableCell>
            <TableCell className="text-right">Rwf {item.totalPrice}</TableCell>
            <TableCell >
            <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">View</Button>
        </DialogTrigger>
        <DialogContent className="w-[1000px] h-auto">
          <DialogHeader>
            <DialogTitle>Invoide # {item.id}</DialogTitle>
            <DialogDescription>
              Details for a transaction done on {item.createdAt.split(".")[0].replaceAll("T", " at ")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
           <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {itemsForOrder}
              </TableBody>
              <TableFooter>
                <div className="flex space-x-4 justify-between p-y-4">
                <p>Order Status</p>
                <select onChange={(e)=>{
                    newStat = e.target.value
                }}>
                {item.status == "Pending" ? (
                                   [ <option value="Pending" key="pen" selected>Pending</option>,
                                    <option value="Processed" key="p2">Processed</option>]
                                    
                                
                                ): (
                                  [ <option value="Pending" key="p3">Pending</option>,
                                    <option value="Processed" key="p4" selected>Processed</option>]
                              
                )}

                </select>
                
                <Button onClick={async()=>{
                    console.log(newStat)
                    const res = await axios({
                        url: 'http://localhost:3000/orders/'+item.id+'/status',
                        method: 'put',
                        data:{status: newStat}
                    })
                    console.log(res.data)
                    window.location.reload()
                    
                }}>Save</Button>
                </div>
              </TableFooter>
           </Table>
          </div>
        </DialogContent>
      </Dialog>
            </TableCell>
          </TableRow>
          )
        })
        console.log(orderGraph)
        setOrders(orderGraph)
        }catch(err){
          console.log(err)
        }
      }
      getOrders()
    }, [])
    return (
        <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
            <Table>
                <TableCaption>Orders on behalf of the shopkeeper </TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
      <TableHead>Customer ID</TableHead>
      <TableHead className="w-[100px]">Status</TableHead>
      <TableHead>Date</TableHead>
      <TableHead className="text-right">Amount</TableHead>
      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders}
                </TableBody>
            </Table>
        </main>
      </SidebarProvider>
    )
}