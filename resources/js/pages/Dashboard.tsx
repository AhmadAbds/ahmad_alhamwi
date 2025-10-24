import { SidebarProvider } from "@/components/ui/sidebar"


import NavBarDash from "@/components/Dashboard_Com/NavBarDash";
import SideBarDash from "@/components/Dashboard_Com/SideBarDash";
import {  Outlet} from "react-router-dom";

const Dashboard: React.FC = () => {


  return (
     <div className="flex" >
     <SidebarProvider defaultOpen={true} >
       <SideBarDash/>
     <main className="w-full">
       <NavBarDash/>
      
     <Outlet/>
     </main>
     </SidebarProvider>
    </div>
  );
};

export default Dashboard;