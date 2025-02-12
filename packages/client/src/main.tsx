import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { Toaster } from 'sonner';
import '@/assets/css/base.css';
import App from '@/app';

createRoot(document.getElementById('app')!).render(
    <StrictMode>
        <BrowserRouter>
            <App />
            <Toaster richColors position="top-right" />
        </BrowserRouter>
    </StrictMode>
);
