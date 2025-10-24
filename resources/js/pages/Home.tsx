
import { SidebarProvider } from "@/components/ui/sidebar"
import NavBar from "../components/Home_Com/NavBar"
import SideBarHome from '../components/Home_Com/SideBardHome'
import Hero from "../components/Home_Com/Hero"
import About from "@/components/Home_Com/About"
import Together from "@/components/Home_Com/Together"
import Footer from "@/components/Home_Com/Footer"
import Contact from "@/components/Home_Com/Contact"
import Projects from "@/components/Home_Com/Projects"
import Skills from "@/components/Home_Com/Skills"
import Achievement from "@/components/Home_Com/Achievement"

function Home() {
  return (
    <div className="flex" >
     <SidebarProvider defaultOpen={false} >
       <SideBarHome/>
     <main className="w-full">
       <NavBar/>
          <Hero/> 
     <About/>  
       <Skills/>  
            <Projects/>   
         <Achievement/>  
          <Together/>  
         <Contact/> 
         <Footer/>  
     </main>
     </SidebarProvider>
    </div>
  )
}

export default Home