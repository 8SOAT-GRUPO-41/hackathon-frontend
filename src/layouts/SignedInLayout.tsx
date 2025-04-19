import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="relative">
        <div className="absolute -left-2.5 top-1 z-20">
          <SidebarTrigger />
        </div>
        <main>{children}</main>
      </div>
    </SidebarProvider>
  );
}
