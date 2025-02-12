import { Routes } from 'react-router';
import routes, { generateRoutes } from '@/routes';

const App = () => {
    return <Routes>{generateRoutes(routes)}</Routes>;
};

export default App;
