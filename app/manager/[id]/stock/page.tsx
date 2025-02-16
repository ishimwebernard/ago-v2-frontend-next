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



export default function Shopkeeper(){
    const lePath = usePathname().split('/')[2]
    //const router = useRouter()
    const [stockGraphics, setStockGraphics] = useState([])
    const [shopkeepers, setShopkeepers] = useState([])
    let editedItem = {
        name: '',
        quantity: 0,
        costprice: 0,
        price: 0,
        picture: '',
        description: ''
    }

    let newItem =  { shopkeeperId: lePath, 
      name: '', 
      quantity: 0, 
      price: 0, 
      picture: '', 
      description: '', 
      costprice: 0 
    }


    useEffect(()=>{
        async function fetchStock(){
            const tempStock = []
            const shopExistingStock = await axios({
                method: 'get',
                url: 'http://localhost:3000/getstockitems'
            })
            shopExistingStock.data.forEach((item)=>{
                tempStock.push(
                    <TableRow>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.shopkeeperId}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{item.costprice}</TableCell>
                    <TableCell>
                    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={()=>{
            editedItem = {name:item.name, quantity:item.quantity, price:item.price, costprice:item.costprice, picture:item.picture, description:item.description}
            console.log(editedItem)
        }}>Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update records</DialogTitle>
          <DialogDescription>
            Here, you can make changes so as to update the stock, remove the item if it is no longer sold, and updating the prices
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
  <Label htmlFor="name" className="text-right">
    Name
  </Label>
  <Input id="name" defaultValue={item.name} className="col-span-3" onChange={(e)=>{
    editedItem = {...editedItem, name: e.target.value}
  }}/>
</div>

<div className="grid grid-cols-4 items-center gap-4">
  <Label htmlFor="quantity" className="text-right">
    Quantity
  </Label>
  <Input id="quantity" defaultValue={item.quantity} className="col-span-3" onChange={(e)=>{
    editedItem = {...editedItem, quantity: parseInt(e.target.value, 10)}
  }}/>
</div>

<div className="grid grid-cols-4 items-center gap-4">
  <Label htmlFor="price" className="text-right">
    Price ($)
  </Label>
  <Input id="price" defaultValue={item.price} className="col-span-3" onChange={(e)=>{
    editedItem = {...editedItem, price: parseInt(e.target.value, 10)}
  }}/>
</div>

<div className="grid grid-cols-4 items-center gap-4">
  <Label htmlFor="costprice" className="text-right">
    Cost Price ($)
  </Label>
  <Input id="costprice" defaultValue={item.costprice} className="col-span-3" onChange={(e)=>{
    editedItem = {...editedItem, costprice: parseInt(e.target.value, 10)}
  }}/>
</div>

<div className="grid grid-cols-4 items-center gap-4">
  <Label htmlFor="description" className="text-right">
    Description
  </Label>
  <Textarea id="description" defaultValue={item.description} className="col-span-3" onChange={(e)=>{
    editedItem = {...editedItem, description: e.target.value}
  }}/>
</div>

<div className="grid grid-cols-4 items-center gap-4">
  <Label htmlFor="picture" className="text-right">
    Picture
  </Label>
  <Input id="picture" defaultValue={item.picture} className="col-span-3" onChange={(e)=>{
    editedItem = {...editedItem, picture: e.target.value}
  }}/>
</div>

          

        </div>
        <DialogFooter>
          <Button type="submit" onClick={async()=>{
            console.log(editedItem)
            try{
                const res = await axios({
                    method: 'put',
                    url: 'http://localhost:3000/stockitems/'+item.id,
                    data: editedItem
                })
                toast("Item Updated Succesfully", {
                    description: item.name + " was succesfully updated",
                    action: {
                      label: "Ok",
                      onClick: () => console.log("Undo"),
                    },
                  })
                window.location.reload()
                  
            }catch(error){
                toast("Error", {description: "Something went wrong!"})
            }
            

          }}>Save changes</Button>
          <Button onClick={async()=>{
            try{
                const res = await axios({
                    method: 'delete',
                    url: 'http://localhost:3000/stockitems/'+item.id
                })
                toast("Delete Succesful", {description: item.name + " was deleted succesfully!"})
                window.location.reload()

            }catch(error){
                toast("Error", {description: "Something went wrong!"})
            }
          }}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
                    </TableCell>
                </TableRow>
                )
            })

            console.log(tempStock)
            setStockGraphics(tempStock)
        }

        async function findShopkeepers(){
            try{
                const shopkeepers = await axios({
                    method: 'get',
                    url: 'http://localhost:3000/getstockitems',
                })
                setShopkeepers(shopkeepers.data)

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
        <main>
          <SidebarTrigger />
          <Dialog>
            <DialogTrigger asChild>
              <Button>New Item</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                Create new stock item
              </DialogHeader>
              <DialogDescription>
                Enter all details of the new stock product. Note that the product will only be affiliated with you
              </DialogDescription>
              <div>
                <div>
                  <Label htmlFor="itemname">Item Name</Label>
                  <Input id="itemname" placeholder="Spicy tomatoes" onChange={(e)=>{
                    newItem = {...newItem, name: e.target.value}
                  }}/>
                </div>
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input id="quantity" placeholder="45" onChange={(e)=>{
                    newItem = {...newItem, quantity: parseInt(e.target.value)}
                  }}/>
                </div>
                <div>
                  <Label htmlFor="cprice">Cost Price</Label>
                  <Input id="cprice" placeholder="Rwf 1200" onChange={(e)=>{
                    newItem = {...newItem, costprice: parseInt(e.target.value)}
                  }}/>
                </div>
                <div>
                  <Label htmlFor="sprice">Selling Price</Label>
                  <Input id="sprice" placeholder="Rwf 2000" onChange={(e)=>{
                    newItem = {...newItem, price: parseInt(e.target.value)}
                  }}/>
                </div>
                <div>
                  <Label htmlFor="description">Stock Item Description</Label>
                  <Textarea id="description" placeholder="Enter description for the new stock item" onChange={(e)=>{
                    newItem = {...newItem, description: e.target.value}
                  }}/>
                </div>
              </div>
                   <DialogFooter>
              <Button onClick={async()=>{
                try{
                  const res = await axios({
                    method: 'post',
                    url: 'http://localhost:3000/stockitems',
                    data: newItem
                  })
                  toast("Stock Item Created Succesfully", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                    action: {
                      label: "OK",
                      onClick: () => console.log("Undo"),
                    },
                  })
                  setTimeout(()=>{
                      window.location.reload()
                  }, 3000)
                }catch(error){
                  console.log(error)
                }
              }}>Save</Button>
            </DialogFooter>
            </DialogContent>
       
          </Dialog>
        <Table>
            <TableCaption>Current stock for you</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Stock Item ID</TableHead>
                    <TableHead>Shopkeeper ID</TableHead>
                    <TableHead className="w-[200px]">Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>S. Price</TableHead>
                    <TableHead>C. Price</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
        {stockGraphics}
            </TableBody>
        </Table>
        </main>
      </SidebarProvider>
    )
}