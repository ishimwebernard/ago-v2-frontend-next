"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import axios from "axios"
import {useState} from "react"
import { useRouter } from "next/navigation"
const meanings = {
  1: "customers",
  2: "shopkeepers",
  3: "managers"
}


export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter()
  const [phonenumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState(1)




  const login = async({phonenumber, password, role}:any)=>{
    try{
      const auth = await axios({
        method: "post",
        url: `http://localhost:3000/${role}/login`,
        data: {phonenumber, password}
      })

      if (auth.status == 200){
        await localStorage.setItem("agoshoppinglogedinid", auth.data.user.id)

        router.push(`/customer/${auth.data.user.id}`)
      }
    }catch(err){
      console.log(err)
    }
  
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="phone"
                  placeholder="0780000000"
                  onChange={(e)=>{
                    setPhoneNumber(e.target.value)
                  }}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" onChange={(e)=>{
                  setPassword(e.target.value)
                }} required />
              </div>
              <RadioGroup defaultValue="customer">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="customer" id="customer" onClick={(e)=>{
      setRole(1)
    }}/>
    <Label htmlFor="customer">Customer</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="shopkeeper" id="shopkeeper" onClick={(e)=>{
      setRole(2)
    }}/>
    <Label htmlFor="shopkeeper">Shop Keeper</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="manager" id="manager" onClick={(e)=>{
      setRole(3)
    }}/>
    <Label htmlFor="manager">Manager</Label>
  </div>
</RadioGroup>

              <Button className="w-full" onClick={(e)=>{
                e.preventDefault()
                login({phonenumber, password, role: meanings[role]})
              }}>
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
