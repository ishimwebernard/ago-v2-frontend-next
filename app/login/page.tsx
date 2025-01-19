import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function Login() {
  return (
    <div className="grid grid-cols content-center h-screen w-screen">
      <div className="flex justify-center w-full">
     <div>
     <p className="text-center font-bold text-xl">Sign in</p>
         <Tabs defaultValue="account" className="w-[400px]">
       <TabsList className="grid w-full grid-cols-3">
         <TabsTrigger value="customer">Customer</TabsTrigger>
         <TabsTrigger value="shopkeeper">Shop Keeper</TabsTrigger>
         <TabsTrigger value="manager">Manager</TabsTrigger>
       </TabsList>
       <TabsContent value="customer">
         <Card>
           <CardHeader>
             <CardTitle>Customer</CardTitle>
             <CardDescription>
               Please log in to access your account
             </CardDescription>
           </CardHeader>
           <CardContent className="space-y-2">
             <div className="space-y-1">
               <Label htmlFor="c-phone">Phone Number</Label>
               <Input id="c-phone" type="text" />
             </div>
             <div className="space-y-1">
               <Label htmlFor="c-password">Password</Label>
               <Input id="c-password" type="password" />
             </div>
           </CardContent>
           <CardFooter>
             <Button>Login</Button>
           </CardFooter>
         </Card>
       </TabsContent>
       <TabsContent value="shopkeeper">
         <Card>
           <CardHeader>
             <CardTitle>Shopkeeper</CardTitle>
             <CardDescription>
               Login to manage the shop
             </CardDescription>
           </CardHeader>
           <CardContent className="space-y-2">
             <div className="space-y-1">
               <Label htmlFor="s-phone">Phone Number</Label>
               <Input id="s-phone" type="text" />
             </div>
             <div className="space-y-1">
               <Label htmlFor="s-password">Password</Label>
               <Input id="s-password" type="password" />
             </div>
           </CardContent>
           <CardFooter>
             <Button>Login</Button>
           </CardFooter>
         </Card>
       </TabsContent>
       <TabsContent value="manager">
         <Card>
           <CardHeader>
             <CardTitle>Manager</CardTitle>
             <CardDescription>
               Login to manage your shop
             </CardDescription>
           </CardHeader>
           <CardContent className="space-y-2">
             <div className="space-y-1">
               <Label htmlFor="manager-phone">Phone Number</Label>
               <Input id="manager-phone" type="text" />
             </div>
             <div className="space-y-1">
               <Label htmlFor="manager-password">Password</Label>
               <Input id="manager-password" type="password" />
             </div>
           </CardContent>
           <CardFooter>
             <Button>Login</Button>
           </CardFooter>
         </Card>
       </TabsContent>
     </Tabs>
        </div>
       </div> 
    </div>
  )
}
