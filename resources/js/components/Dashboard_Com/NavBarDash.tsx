
import  '../Home_Com/NavBar.css'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { useTheme } from "../provider/theme-provider"
import {  Home, Moon, Sun, UserLock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SidebarTrigger } from '../ui/sidebar';
function NavBarDash() {
   const { setTheme } = useTheme()
  return (
    <nav className='nav sticky top-0 bg-background z-10' style={{ padding:"12px 20px" }}  >
        <div>
            <SidebarTrigger variant="ghost" size="default" />
           {/*  1img 2iconNotfication */}
        </div>
        <div className='flex items-center gap-3' >
           <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className='.button'>
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" /><span className="sr-only">Toggle theme</span>
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
        <Link to={'/dashboard'} className='key'>
        <Button variant="outline" size="icon">
          <UserLock className="h-[1.2rem] w-[1.2rem]" />
        </Button>
        </Link>
        <Link to={'/'} className='key'>
        <Button variant="outline" size="icon">
          <Home className="h-[1.2rem] w-[1.2rem]" />
        </Button>
        </Link>
      
       <button className='button_cv' style={{width:"130px",background:"linear-gradient(to right ,#1CA7EC , #1F2F98)" , color:"white" , border:"none"}} >
            <a href="https://drive.google.com/drive/folders/1EMdxlY4Ztv2_dpcaGaTprTGmMW7lYp2j" target='_blank' >Download CV</a>
       </button>
        
        </div>
    </nav>
  )
}

export default NavBarDash