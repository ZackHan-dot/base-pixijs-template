import { Outlet, useLocation } from 'react-router';
import { AppSidebar } from '@/components/app-sidebar';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { getRouteTitle } from '@/routes';
import React from 'react';

const Layout: React.FC = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                {pathnames.length > 0 ? (
                                    <>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="/">
                                                首页
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                    </>
                                ) : (
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>首页</BreadcrumbPage>
                                    </BreadcrumbItem>
                                )}
                                {pathnames.map((value, index) => {
                                    const to = `/${pathnames
                                        .slice(0, index + 1)
                                        .join('/')}`;
                                    const title = getRouteTitle(value);
                                    const isLast =
                                        index === pathnames.length - 1;
                                    return isLast ? (
                                        <BreadcrumbItem key={to}>
                                            <BreadcrumbPage>
                                                {title}
                                            </BreadcrumbPage>
                                        </BreadcrumbItem>
                                    ) : (
                                        <React.Fragment key={to}>
                                            <BreadcrumbItem>
                                                <BreadcrumbLink href={to}>
                                                    {title}
                                                </BreadcrumbLink>
                                            </BreadcrumbItem>
                                            <BreadcrumbSeparator />
                                        </React.Fragment>
                                    );
                                })}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <Outlet />
            </SidebarInset>
        </SidebarProvider>
    );
};

export default Layout;
