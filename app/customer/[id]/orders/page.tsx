import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/customer-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <div>
            <p>This Order</p>
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