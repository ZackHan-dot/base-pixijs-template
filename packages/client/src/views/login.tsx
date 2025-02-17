import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { toast } from 'sonner';
import { loginWithEmail, loginWithEmailCallback } from '@/api/auth';

function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<'div'>) {
    const [loginForm, setLoginForm] = useState({
        name: '',
        email: '',
    });
    const navigate = useNavigate();
    const { type } = useParams();
    const [searchParams] = useSearchParams();
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleLoginCallback = async () => {
        try {
            const { token }: any = await loginWithEmailCallback({
                token: searchParams.get('token')!,
            });

            localStorage.setItem('token', token);
            navigate('/');
        } catch (error) {
            console.error('请求失败', error);
        }
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        try {
            const { message }: any = await loginWithEmail({
                name: loginForm.name,
                destination: loginForm.email,
            });

            setIsLoggingIn(true);

            toast.info(`通知消息：${message}`);
        } catch (error) {
            console.error('请求失败', error);
        }
    };

    useEffect(() => {
        if (type === 'callback') {
            handleLoginCallback();
        }
    }, []);

    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            {!type && !isLoggingIn && (
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col items-center gap-2">
                            <img className="w-[65px]" src="/logo.svg" />
                            <h1 className="text-xl font-bold">
                                Welcome to HzyCoder !!!
                            </h1>
                        </div>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">昵称</Label>
                                <Input
                                    id="name"
                                    type="name"
                                    placeholder="您的大名"
                                    required
                                    value={loginForm.name}
                                    onChange={e =>
                                        setLoginForm({
                                            ...loginForm,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">邮箱</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    value={loginForm.email}
                                    onChange={e =>
                                        setLoginForm({
                                            ...loginForm,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                登录
                            </Button>
                            <p className="text-xs text-center text-gray-500">
                                未登录手机号验证后将自动注册登录，
                                注册即表明你已同意
                                <a
                                    className="text-blue-600 px-1"
                                    href="/terms"
                                    target="_blank"
                                >
                                    用户协议
                                </a>
                                和
                                <a
                                    className="text-blue-600 px-1"
                                    href="/privacy"
                                    target="_blank"
                                >
                                    隐私政策
                                </a>
                            </p>
                        </div>
                    </div>
                </form>
            )}
            {(type === 'callback' || isLoggingIn) && (
                <div className="text-center text-sm">
                    {isLoggingIn
                        ? '登录链接已发送到您的邮箱，请注意查收...'
                        : '正在验证您的登录信息，请稍等片刻...'}
                </div>
            )}
        </div>
    );
}

export default function Login() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
            <div className="w-full max-w-sm">
                <LoginForm />
            </div>
        </div>
    );
}
