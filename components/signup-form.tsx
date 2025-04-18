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
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"

const meanings = {
  1: "customers",
  2: "shopkeepers",
  3: "managers"
}


export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter()
  const [phonenumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [referrerId, setRefId] = useState(0)
  const [name, setName] = useState('')






  const signUp = async({phonenumber, password, referrerId, name}:any)=>{
    try{

      const auth = await axios({
        method: "post",
        url: `https://v2-ago-2.onrender.com/customers`,
        data: {name, referrerId, phonenumber, password}
      }) 
          setTimeout(()=>{
        router.push('/login')
     }, 9000)
      toast("Account Created", {
        description: "You will be redirected to Login!",
        action: {
            label: "Ok"
        },
    })

      
    }catch(err:any){
        toast("Something went wrong", {
            description: err.response.data.error,
            action: {
                label: "Ok"
            },
        })
      console.log(err)
    }
  
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up!</CardTitle>
          <CardDescription>
            Create an account for your Ago Shopping experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
            <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Marie Coutrois"
                  onChange={(e)=>{
                    setName(e.target.value)
                  }}
                  required
                />
              </div>
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
              <div className="grid gap-2">
                <Label htmlFor="phone">Referrer ID</Label>
                <Input
                  id="refid"
                  placeholder="000"
                  onChange={(e)=>{
                    setRefId(e.target.value)
                  }}
                  required
                />
              </div>

              <Button className="w-full" onClick={(e)=>{
                e.preventDefault()
                signUp({phonenumber, password, referrerId,name})
              }}>
                Sign Up Now
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <p  className="underline underline-offset-4 cursor-pointer" onClick={()=>{
                router.push('/login')
              }}>
                Login
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  )
}
