import './bootstrap';
import { createRoot } from 'react-dom/client';
import '../css/app.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { StrictMode } from 'react';
const container = document.getElementById('app');

if (!container) {
    throw new Error('Root element #app not found');
}

const root = createRoot(container);
root.render(
    <StrictMode>
        <AuthProvider>
           <App/>
        </AuthProvider>
    </StrictMode>
        
);