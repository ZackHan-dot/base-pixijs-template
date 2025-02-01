import Layout from '@/layout';
import Community from '@/views/community';
import Gamehall from '@/views/gamehall';
import GameDetail from '@/views/gamehall/detail';
import Home from '@/views/home';
import { Route, RouteObject } from 'react-router';

type RouteObjectWithInfo = RouteObject & {
    title?: string;
    children?: RouteObjectWithInfo[];
};

const routes: RouteObjectWithInfo[] = [
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                title: '首页',
                element: <Home />,
            },
            {
                path: '/gamehall',
                title: '游戏大厅',
                element: <Gamehall />,
            },
            {
                path: '/gamehall/:gameId',
                title: '游戏详情',
                element: <GameDetail />,
            },
            {
                path: '/community',
                title: '交流社区',
                element: <Community />,
            },
        ],
    },
];

const hasChild = (route: RouteObjectWithInfo) => {
    return Array.isArray(route.children) && route.children.length > 0;
};

export const generateRoutes = (routes: RouteObjectWithInfo[]) => {
    return routes.map((r, i) => {
        return hasChild(r) ? (
            <Route key={i} path={r.path} element={r.element}>
                {generateRoutes(r.children || [])}
            </Route>
        ) : (
            <Route key={i} path={r.path} index={r.index} element={r.element} />
        );
    });
};

const _getRouteTitle = (
    routes: RouteObjectWithInfo[],
    path: string
): string => {
    for (const route of routes) {
        if (route.path?.includes(path)) {
            return route.title || path;
        }
        if (route.children) {
            const title = _getRouteTitle(route.children, path);
            if (title) {
                return title;
            }
        }
    }
    return path;
};

export const getRouteTitle = (path: string) => _getRouteTitle(routes, path);

export default routes;
