import './Projects.css'
import { MdSlowMotionVideo } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { ImExit } from "react-icons/im";
import { useEffect, useState} from 'react'
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { classificationService, projectService } from '@/services/api';
import { ClassificationData, ProjectData } from '@/types';
import FormattedContent from '../Dashboard_Com/parale_routes_dashboard/ProjectsCRUD/Formatted_content';
import { BsGithub } from 'react-icons/bs';
import { ScrollArea } from '../ui/scroll-area';

function Projects() {
  const [show, setshow] = useState<boolean[]>([]);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>([]);
  const [classifications, setclassifications] = useState<ClassificationData[]>([]);
  
  // حالة للتصنيف المحدد
  const [selectedClassification, setSelectedClassification] = useState<number | null>(null);
  
  // حالة للترقيم
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  const toggleShow = (index: number) => {
    setshow(prevStates => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  const closeShow = (index: number) => {
    setshow(prevStates => {
      return prevStates.map((state, i) => 
        i === index ? false : state
      );
    });
  };

  useEffect(() => {
    loadProjects();
    fetchClasifications();
  }, []);

  useEffect(() => {
    // تطبيق التصفية عند تغيير المشاريع أو التصنيف المحدد
    if (selectedClassification === null) {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => 
        project.classification_id === selectedClassification
      );
      setFilteredProjects(filtered);
    }
    // العودة للصفحة الأولى عند تغيير التصفية
    setCurrentPage(1);
  }, [projects, selectedClassification]);

  const fetchClasifications = async() => {
    try {
      const dataClassifciations = await classificationService.getclassification();
      setclassifications(dataClassifciations);
    } catch(error) {
      console.log("error classsification fetch");
    }
  }

  const loadProjects = async () => {
    try {
      const response = await projectService.getProjects();
      const Data = Array.isArray(response) ? response : [response];
      setProjects(Data);
      setFilteredProjects(Data);
      setshow(new Array(Data.length).fill(false));
    } catch (err: any) {
      console.error('❌ Error loading projects:', err);
    } 
  };

  // دالة لمعالجة النقر على أزرار التصنيف
  const handleClassificationClick = (classificationId: number) => {
    if (selectedClassification === classificationId) {
      // إذا كان الزر مضغوطاً بالفعل، قم بإلغاء التحديد
      setSelectedClassification(null);
    } else {
      // حدد التصنيف الجديد
      setSelectedClassification(classificationId);
    }
  };

  // حساب المشاريع للصفحة الحالية
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  // حساب عدد الصفحات
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  // تغيير الصفحة
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // إنشاء مصفوفة أرقام الصفحات
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div id='projects' className='section_Project mt-[30px] mb-[30px] sm:mt-[70px] sm:mb-[70px]'>
      <h1>My Projects</h1>
      <p className='section_Project_descp'>
       Here you can see all my projects and I advise you to watch the videos</p>
      
      {/* أزرار التصنيفات */}
      <div className="flex gap-4 justify-center items-center flex-wrap mt-6 pr-2 pl-2">
         <Button
    key="all"
    variant={selectedClassification === null ? "default" : "outline"}
    className={`px-4 py-2 rounded-lg transition-all duration-200 ${
      selectedClassification === null 
        ? 'bg-blue-700 text-white hover:bg-blue-700' 
        : 'bg-gray-100 text-gray-700 hover:bg-blue-700  hover:text-white'
    }`}
    onClick={() => setSelectedClassification(null)}
  >
    All
  </Button>
        {classifications.map((classification) => {
          const isSelected = selectedClassification === classification.id;
          return (
            <Button
              key={classification.id}
              variant={isSelected ? "default" : "outline"}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                isSelected 
                  ? 'bg-blue-700 text-white hover:bg-blue-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-blue-700 hover:text-white'
              }`}
                
              onClick={() => classification.id ?  handleClassificationClick(classification.id)  : []}
            >
              {classification.type}
            </Button>
          );
        })}
      </div>

      {/* عرض عدد النتائج */}
      <div className="text-center mt-4 text-gray-600 dark:text-white">
        {selectedClassification ? (
          <p>
            Showing {filteredProjects.length} project(s) in "
            {classifications.find(c => c.id === selectedClassification)?.type}"
          </p>
        ) : (
          <p>Showing all {filteredProjects.length} projects</p>
        )}
      </div>

      {/* عرض المشاريع */}
      <div className="w-full flex items-start flex-wrap justify-center gap-6 mt-8 sm:pr-[10px] sm:pl-[10px]">
        {currentProjects.length > 0 ? (
          currentProjects.map((project) => {
            // حساب الفهرس الحقيقي في المصفوفة الأصلية
            const originalIndex = projects.findIndex(p => p.id === project.id);
            
            return (
              <Card key={project.id} className='Card_prject'>
                <img
                className='image_project'
                 /*  style={{width: "100%", borderRadius: "0 20px 0px 0px", height: "224px", objectFit: "cover"}} */ 
                  src={project.image} 
                  alt={project.title} 
                />
                <h3>{project.title}</h3>
                <div className='desc_card_project'>{project.summary}</div>
                <p>
                  link website{' '}
                  <a 
                    target='_blank' 
                    href={project.visit} 
                    style={{color: "#407ec5", fontWeight: "600", textDecoration: "underline"}}
                  >
                    visit
                  </a>
                </p>
                <div className='container_button_card_project'>
                  <Button  className='hover:bg-slate-800 hover:text-white' variant={"secondary"} onClick={() => toggleShow(originalIndex)}>
                    Details
                    <MdKeyboardArrowDown style={{fontSize: "25px"}} />
                  </Button>
                  <a target='_blank' href={project.video}>
                    <button className='watchvedio'>
                      watch
                      <MdSlowMotionVideo style={{fontSize: "20px"}}/>
                    </button>
                  </a>
                  <Button className='button_github_project' id='github_front_card' size={"sm"} variant={"outline"}>
                    <a  target='_blank' href={project.github}>
                      <BsGithub/>
                    </a>
                  </Button>
                </div>
                
                <div 
                  className='countainer-comments' 
                  style={{transform: show[originalIndex] ? "translateY(0)" : "translateY(100%)"}}
                >
                  <div className='father_comment'>
                    <div className='Nav_comment'>
                      <h4 style={{fontFamily: "Crimson Text,serif", fontWeight: "500"}}>Details</h4>
                      <ImExit 
                        className='cursor-pointer hover:text-red-600' 
                        onClick={() => closeShow(originalIndex)} 
                      />
                    </div>
                    <div className='comments shadow-sm'>
                      <img src={"/img/b2.jpg"} alt="" className='img1' />
                      <div>
                        <div className='My_Acocount' style={{color: "black"}}>Ahmad Alhamwi</div>
                        <div  className='text-sm  flex  justify-between gap-14 items-center'>
                         <span style={{color: "rgba(0, 0, 0, 0.6)"}}> {project.created_at}</span>
                        <Button className='githubComment' id='github_back_card' size={"sm"} variant={"outline"}>
                    <a className='' target='_blank' href={project.github}>
                      <BsGithub/>
                    </a>
                  </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div style={{color: "seagreen", marginTop: "10px"}} className='mt-2'>
                      <ScrollArea className='w-full sm:h-[300px] h-[230px] pl-[15px] pr-2'>
                        
                        <FormattedContent 
                          formatted_content={project.formatted_content || ""}
                          styles={project.content_styles} 
                          className=""
                        />
                        {project.description}
                      </ScrollArea>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })
        ) : (
          <div className="text-center py-8 text-gray-500">
            No projects found for the selected classification.
          </div>
        )}
      </div>

      {/* ترقيم الصفحات */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
            className="px-3 py-1"
            
          >
           <a href="#projects">Previous</a>
          </Button>
          
          {pageNumbers.map(number => (
            <Button
              key={number}
              variant={currentPage === number ? "default" : "outline"}
              onClick={() => paginate(number)}
                className={`w-10 h-10 ${
                  currentPage === number 
                    ? 'bg-blue-700 text-white hover:bg-blue-800' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-700 hover:text-white hover:border-none'
                }`}
            >
             <a href="#projects">{number}</a>
            </Button>
          ))}
          
          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
            className="px-3 py-1"
          >
          <a href="#projects">Next</a>
          </Button>
        </div>
      )}
    </div>
  );
}

export default Projects;
{/* <Card style={{margin:"50px"}} className='Card_prject'>
            <img style={{width:"432px" , borderRadius:" 0 20px 0px 0px"  }} src={"/img/cc2.jpg"} alt="" />
            <h3 >Book Store</h3>
            <div className='desc_card_project'>Lorem ipsum dolor sit amet consectetur adipng eli Unde magnam dolor, neque dolor, enim, autem beatae</div>
            <p>link websute <a href="#" style={{color:"#407ec5" , fontWeight:"600" , textDecoration:"underline"}} >visit</a></p>
            <div className='container_button_card_project' ><Button variant={"secondary"} onClick={()=>setshow(true)} >Details<MdKeyboardArrowDown style={{fontSize:"25px"}} /></Button>
            <button>watch<MdSlowMotionVideo  style={{fontSize:"20px"}}/></button>
            </div>
              <div  className='countainer-comments' style={{transform : show? "translateY(0)" : "translateY(100%)"}} >
                                 
                 
                     
                          <div className='father_comment' >
                             <div className='Nav_comment' ><h4 style={{fontFamily: "Crimson Text, serif;" , fontWeight:"500"}} >Details</h4><ImExit style={{cursor:"pointer"}} onClick={()=>setshow(false)} /></div>
                             <div className='comments' >
                             <img src={"/img/b2.jpg"} alt="" className='img1' />
                         <div>
                          <div className='My_Acocount' style={{ color:"black" }} >My Account</div>
                         <div style={{color:"rgba(0, 0, 0, 0.6)" , marginTop:"10px"}} > <span style={{color:"rgba(0, 0, 0, 0.9)"}} >router dom -</span> coment description</div> </div>
                         
                     </div>
                          </div>
             </div>
        </Card> */}