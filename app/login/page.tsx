import { LoginForm } from "@/components/login-form"
import Menu from "../menu"
export default function Page() {
  return (
    <div>
      <Menu />
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
    </div>
  )
}
