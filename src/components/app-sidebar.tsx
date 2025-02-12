import * as React from 'react';
import { Send, House, Gamepad2 } from 'lucide-react';

import { NavSecondary } from '@/components/nav-secondary';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Link, useNavigate } from 'react-router';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { NavUser } from './nav-user';
import { getUserProfile } from '@/api/auth';

const data = {
    navSecondary: [
        {
            title: '首页',
            url: '/',
            icon: House,
        },
        {
            title: '游戏大厅',
            url: '/gamehall',
            icon: Gamepad2,
        },
        {
            title: '交流社区',
            url: '/community',
            icon: Send,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const [userInfo, setUserInfo] = useState<any>(() => {
        const storedUserInfo = localStorage.getItem('userInfo');
        return storedUserInfo ? JSON.parse(storedUserInfo) : {};
    });
    const navigate = useNavigate();
    const handleLoginClick = () => navigate('/auth/login');

    const handleGetUserProfile = async () => {
        try {
            const { data } = await getUserProfile();
            setUserInfo(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        handleGetUserProfile();
    }, [userInfo]);

    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link to="/">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    棋
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        棋盘驿站
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavSecondary items={data.navSecondary} />
            </SidebarContent>
            <SidebarFooter>
                {Object.keys(userInfo).length > 0 ? (
                    <NavUser user={userInfo} />
                ) : (
                    <Button onClick={handleLoginClick}>登录</Button>
                )}
            </SidebarFooter>
        </Sidebar>
    );
}
