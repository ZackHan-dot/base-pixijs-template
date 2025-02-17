import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { Toaster } from 'sonner';
import { Provider } from 'react-redux';
import { store } from '@/data/store';
import '@/assets/css/base.css';
import App from '@/app';

createRoot(document.getElementById('app')!).render(
    <StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
                <Toaster richColors position="top-right" />
            </Provider>
        </BrowserRouter>
    </StrictMode>
);
