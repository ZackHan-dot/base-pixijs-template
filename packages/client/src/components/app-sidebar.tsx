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
import { useDispatch } from 'react-redux';

const data = {
    navSecondary: [
        {
            title: '个人空间',
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
    const dispatch = useDispatch();

    const handleGetUserProfile = async () => {
        try {
            const { data } = await getUserProfile();
            setUserInfo(data);
            dispatch({
                type: 'auth/login',
                payload: {
                    username: data?.username || '',
                    id: data?.id || '',
                    avatar: data?.avatar || '',
                },
            });
            localStorage.setItem('userInfo', JSON.stringify(data));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        handleGetUserProfile();
    }, []);

    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link to="/">
                                <div className="flex items-center justify-center">
                                    <img
                                        src="/logo.svg"
                                        alt="logo"
                                        className="w-12 h-12"
                                    />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        HzyCoder
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
