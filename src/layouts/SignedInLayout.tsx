import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="relative flex-1 flex flex-col">
        <div className="absolute -left-2.5 top-1 z-20">
          <SidebarTrigger />
        </div>
        <main className="flex-1 flex flex-col items-center pt-8">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
