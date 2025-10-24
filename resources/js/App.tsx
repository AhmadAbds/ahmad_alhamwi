/* import { ThemeProvider } from "./components/provider/theme-provider"
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import '../css/app.css';
import HelloDash from "./components/Dashboard_Com/parale_routes_dashboard/HelloDash";
import HeaderCRUD from "./components/Dashboard_Com/parale_routes_dashboard/HeaderCrude/HeaderCRUD";
import AboutDashboard from "./components/Dashboard_Com/parale_routes_dashboard/AboutCrud/AboutCrud";
import CategoryDashboard from "./components/Dashboard_Com/parale_routes_dashboard/categories_CRUD/CategoryCRUD";
import PersonalDashboard from "./components/Dashboard_Com/parale_routes_dashboard/Pesonal_information/PersonalCRUD";
import SkillDashboard from "./components/Dashboard_Com/parale_routes_dashboard/SkillsCrud/SkillCRUD";
import AchievementDashboard from "./components/Dashboard_Com/parale_routes_dashboard/AchievementCRUD/AchievementDashboard";
import ClassiDashboard from "./components/Dashboard_Com/parale_routes_dashboard/classification/ClassificationDash";
import ProjectDashboard from "./components/Dashboard_Com/parale_routes_dashboard/ProjectsCRUD/ProjectDashboard";
import ContactDashboard from "./components/Dashboard_Com/parale_routes_dashboard/ContactCRUD/ContactDashboard";

const App: React.FC = () => { 
  
  return (
    <AuthProvider>
       <Router> 
        <ThemeProvider  defaultTheme="light" storageKey="vite-ui-theme">
         <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            >
                <Route index element={<HelloDash />} />
                <Route path="header_crud" element={<HeaderCRUD />} />
                <Route path="About_crud" element={<AboutDashboard/>} />
                <Route path="category_crud" element={<CategoryDashboard/>} />
                <Route path="personal_crud" element={<PersonalDashboard/>} />
                <Route path="skill_crud" element={<SkillDashboard/>} />
                <Route path="achievemet_crud" element={<AchievementDashboard/>} />
                <Route path="classification_crud" element={<ClassiDashboard/>} />
                <Route path="project_crud" element={<ProjectDashboard/>} />
                <Route path="contact_crud" element={<ContactDashboard/>} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes> 
        </div>
      </ThemeProvider>
      </Router> 
    </AuthProvider>
  );
};

export default App; */

import { ThemeProvider } from "./components/provider/theme-provider"
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Suspense, lazy } from 'react';
import '../css/app.css';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import { DashboardLoadingSkeleton, PageLoadingSkeleton } from './components/LoadingSkeleton';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

// Lazy load dashboard components
const HelloDash = lazy(() => import("./components/Dashboard_Com/parale_routes_dashboard/HelloDash"));
const HeaderCRUD = lazy(() => import("./components/Dashboard_Com/parale_routes_dashboard/HeaderCrude/HeaderCRUD"));
const AboutDashboard = lazy(() => import("./components/Dashboard_Com/parale_routes_dashboard/AboutCrud/AboutCrud"));
const CategoryDashboard = lazy(() => import("./components/Dashboard_Com/parale_routes_dashboard/categories_CRUD/CategoryCRUD"));
const PersonalDashboard = lazy(() => import("./components/Dashboard_Com/parale_routes_dashboard/Pesonal_information/PersonalCRUD"));
const SkillDashboard = lazy(() => import("./components/Dashboard_Com/parale_routes_dashboard/SkillsCrud/SkillCRUD"));
const AchievementDashboard = lazy(() => import("./components/Dashboard_Com/parale_routes_dashboard/AchievementCRUD/AchievementDashboard"));
const ClassiDashboard = lazy(() => import("./components/Dashboard_Com/parale_routes_dashboard/classification/ClassificationDash"));
const ProjectDashboard = lazy(() => import("./components/Dashboard_Com/parale_routes_dashboard/ProjectsCRUD/ProjectDashboard"));
const ContactDashboard = lazy(() => import("./components/Dashboard_Com/parale_routes_dashboard/ContactCRUD/ContactDashboard"));

const App: React.FC = () => { 
  
  return (
    <AuthProvider>
      <Router> 
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <div className="App">
            <Routes>
              <Route 
                path="/" 
                element={
                  <Suspense fallback={<PageLoadingSkeleton />}>
                    <Home />
                  </Suspense>
                } 
              />
              
              <Route 
                path="/login" 
                element={
                  <Suspense fallback={<PageLoadingSkeleton />}>
                    <Login />
                  </Suspense>
                } 
              />

              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<DashboardLoadingSkeleton />}>
                      <Dashboard />
                    </Suspense>
                  </ProtectedRoute>
                } 
              >
                <Route 
                  index 
                  element={
                    <Suspense fallback={<DashboardLoadingSkeleton />}>
                      <HelloDash />
                    </Suspense>
                  } 
                />
                <Route 
                  path="header_crud" 
                  element={
                    <Suspense fallback={<DashboardLoadingSkeleton />}>
                      <HeaderCRUD />
                    </Suspense>
                  } 
                />
                <Route 
                  path="About_crud" 
                  element={
                    <Suspense fallback={<DashboardLoadingSkeleton />}>
                      <AboutDashboard />
                    </Suspense>
                  } 
                />
                <Route 
                  path="category_crud" 
                  element={<Suspense fallback={<DashboardLoadingSkeleton />}>
                      <CategoryDashboard />
                    </Suspense>
                  } 
                />
                <Route 
                  path="personal_crud" 
                  element={
                    <Suspense fallback={<DashboardLoadingSkeleton />}>
                      <PersonalDashboard />
                    </Suspense>
                  } 
                />
                <Route 
                  path="skill_crud" 
                  element={
                    <Suspense fallback={<DashboardLoadingSkeleton />}>
                      <SkillDashboard />
                    </Suspense>
                  } 
                />
                <Route 
                  path="achievemet_crud" 
                  element={
                    <Suspense fallback={<DashboardLoadingSkeleton />}>
                      <AchievementDashboard />
                    </Suspense>
                  } 
                />
                <Route 
                  path="classification_crud" 
                  element={
                    <Suspense fallback={<DashboardLoadingSkeleton />}>
                      <ClassiDashboard />
                    </Suspense>
                  } 
                />
                <Route 
                  path="project_crud" 
                  element={
                    <Suspense fallback={<DashboardLoadingSkeleton />}>
                      <ProjectDashboard />
                    </Suspense>
                  } 
                />
                <Route 
                  path="contact_crud" 
                  element={
                    <Suspense fallback={<DashboardLoadingSkeleton />}>
                      <ContactDashboard />
                    </Suspense>
                  } 
                />
              </Route>
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </ThemeProvider>
      </Router> 
    </AuthProvider>
  );
};

export default App;