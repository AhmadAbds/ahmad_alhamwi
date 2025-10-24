
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator} from "../ui/sidebar"
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { MdConnectWithoutContact } from "react-icons/md";
import {  BsExclamationCircle } from "react-icons/bs";
import { Medal, Moon, Sun} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useTheme } from "../provider/theme-provider"
// Menu items.

const items = [
  {
    title: "Home",
    url: "#home",
    icon: IoHomeOutline ,
  },
  {
    title: "About",
    url: "#about",
    icon: BsExclamationCircle ,
  },
  {
    title: "Projects",
    url: "#projects",
    icon: AiOutlineFundProjectionScreen,
  },
  {
    title: "Contact",
    url: "#contact",
    icon: MdConnectWithoutContact,
  },
  {
    title: "Skills",
    url: "#skills",
    icon: Medal,
  },
]
const SideBard = () => {
   const { setTheme } = useTheme()
  return (
    <Sidebar>
      <SidebarHeader  >
        <SidebarMenu >
          <div className='logo text-center ' ><span style={{fontFamily: "Aref Ruqaa Ink, serif"}} >A</span>-hamwi</div>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator/>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
         <button className='button_cv pt-2 pb-2 rounded-md' style={{background:"linear-gradient(to right ,#1CA7EC , #1F2F98)" , color:"white" , border:"none"}} >
              <a href="https://drive.google.com/drive/folders/1EMdxlY4Ztv2_dpcaGaTprTGmMW7lYp2j" target='_blank' >Download CV</a>
         </button>
         <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className='w-full'>
          <Sun className="h-[1.4rem] w-[1.4rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.4rem] w-[1.4rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" /><span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    
      </SidebarFooter>
    </Sidebar>
  )
}

export default SideBard