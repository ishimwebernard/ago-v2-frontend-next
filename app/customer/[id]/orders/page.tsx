"use client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/customer-sidebar"
import {useState, useEffect} from "react"
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

export default function Layout({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState([])
  useEffect(()=>{
    
    const getOrders = async()=>{
      let orderGraph = []
      try{
        const loggedinUser = JSON.parse(localStorage.getItem("logedin-user") || "null").id
      const data = await axios({
        method: 'GET',
        url: process.env.BASE_URL'+'/orders/customer/'+loggedinUser,
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
          <TableCell>{item.shopkeeperId}</TableCell>
          <TableCell className="w-[100px]">{item.status}</TableCell>
          <TableCell>{item.createdAt}</TableCell>
          <TableCell className="text-right">Rwf {item.totalPrice}</TableCell>
          <TableCell >
          <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View</Button>
      </DialogTrigger>
      <DialogContent className="w-[1000px]">
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
         </Table>
        </div>
      </DialogContent>
    </Dialog>
          </TableCell>
        </TableRow>
        )
      })
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
        <div className="w-full p-8">
          <Card className="p-4 w-[800px]">
                    <Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Invoice</TableHead>
      <TableHead>Shopkeeper</TableHead>
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

          </Card>

        </div>
      </main>
    </SidebarProvider>
  )
}
