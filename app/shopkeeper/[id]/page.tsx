import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/shopkeeper-sidebar"

export default function Shopkeeper(){
    return (
        <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
        
        </main>
      </SidebarProvider>
    )
}