import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/assets/css/base.css';

createRoot(document.getElementById('app')!).render(
    <StrictMode>
        {/* <Game /> */}
        <h1 className="text-4xl text-center">Hello, World!</h1>
    </StrictMode>
);
