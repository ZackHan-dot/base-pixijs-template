import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { Toaster } from '@/components/ui/toaster';
import '@/assets/css/base.css';
import App from '@/app';

createRoot(document.getElementById('app')!).render(
    <StrictMode>
        <BrowserRouter>
            <App />
            <Toaster />
        </BrowserRouter>
    </StrictMode>
);
