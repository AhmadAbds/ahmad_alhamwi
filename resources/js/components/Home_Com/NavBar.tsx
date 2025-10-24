import  './NavBar.css'
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { MdConnectWithoutContact } from "react-icons/md";
import {  BsExclamationCircle } from "react-icons/bs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { useTheme } from "../provider/theme-provider"
import { Medal, Moon, Sun, UserLock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SidebarTrigger } from '../ui/sidebar';
function NavBar() {
   const { setTheme } = useTheme()
  return (
    <nav className='nav sticky top-0 bg-background z-10' >
        <div className='logo' ><span style={{fontFamily: "Aref Ruqaa Ink, serif"}} >A</span>-hamwi</div>
        <ul className='ul'>
            <a href="#home"><li className='menuli'><IoHomeOutline className='iconNavbar' />Home</li></a>
            <a href="#about"><li className='menuli'><BsExclamationCircle className='iconNavbar' />About</li></a>
              <a href="#skills"><li className='menuli' ><Medal size={19} className='iconNavbar' />Skills</li></a>
            <a href="#projects"><li className='menuli'><AiOutlineFundProjectionScreen className='iconNavbar' />Projects</li></a>
            <a href="#contact"><li className='menuli'><MdConnectWithoutContact className='iconNavbar' />Contact</li></a>
           
        </ul>
        <div className='nav_countainer_butttons' >
          {/* mode */}
        
           <div className='trigger' >
       <SidebarTrigger variant="ghost" size="default" />
       </div>  
           <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className='button_mode'>
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
      
       <button className='button_cv' style={{background:"linear-gradient(to right ,#1CA7EC , #1F2F98)" , color:"white" , border:"none"}} >
        <a href="https://drive.google.com/drive/folders/1EMdxlY4Ztv2_dpcaGaTprTGmMW7lYp2j" target='_blank' >Download CV</a>
       </button>
        </div>
    </nav>
  )
}

export default NavBar