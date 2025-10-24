/* import { Calendar, Home, Inbox, Search, Settings } from "lucide-react" */
import { Link } from "react-router-dom"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,SidebarSeparator} from "../ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "../provider/theme-provider"

const SideBarDash = () => {
  const { setTheme } = useTheme()
  return (
    <Sidebar>
      <SidebarHeader className="py-[13px]">
        <SidebarMenu >
          <div className='logo text-center ' ><span style={{fontFamily: "Aref Ruqaa Ink, serif"}} >A</span>-hamwi</div>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator/>
      <SidebarContent>
        <SidebarGroup>

          <SidebarGroupLabel>Header</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                 <SidebarMenuButton asChild>
                    <Link to="/dashboard/header_crud" >Manage My header</Link>
                  </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>

          <SidebarGroupLabel>About Me</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                 <SidebarMenuButton asChild>
                    <Link to="/dashboard/about_crud" >Manage About Me</Link>
                  </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>

             <SidebarGroupLabel>Categories && Skills</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                 <SidebarMenuButton asChild>
                    <Link to="/dashboard/category_crud" >Manage My categories</Link>
                  </SidebarMenuButton>
                 <SidebarMenuButton asChild>
                   <Link to="/dashboard/skill_crud" >Manage My skills</Link>
                  </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>

          <SidebarGroupLabel>Projects && Classifications</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                 <SidebarMenuButton asChild>
                    <Link to="/dashboard/classification_crud" >Manage My classifications</Link>
                  </SidebarMenuButton>
                  <SidebarMenuButton asChild>
                   <Link to="/dashboard/project_crud" >Manage My projects</Link>
                  </SidebarMenuButton>  
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>


 <SidebarGroupLabel>Personal Information</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                 <SidebarMenuButton asChild>
                    <Link to="/dashboard/personal_crud" >Manage My Personal Information</Link>
                  </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
          
 <SidebarGroupLabel>Achievements</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                 <SidebarMenuButton asChild>
                    <Link to="/dashboard/achievemet_crud" >Manage My Achievements</Link>
                  </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>

 <SidebarGroupLabel>Contacts</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                 <SidebarMenuButton asChild>
                    <Link to="/dashboard/contact_crud" >Manage My Contacts</Link>
                  </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>

 <SidebarGroupLabel>Home</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                 <SidebarMenuButton asChild>
                    <Link to="/" >Go to portfolio</Link>
                  </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>

        </SidebarGroup>
      </SidebarContent>
       <SidebarFooter>
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

export default SideBarDash