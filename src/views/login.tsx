import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useToast } from '@/hooks/use-toast';
import { loginWithEmail } from '@/api/auth';

function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<'div'>) {
    const [email, setEmail] = useState('');
    // const navigate = useNavigate();
    const { toast } = useToast();
    const { type } = useParams();
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        try {
            const { message }: any = await loginWithEmail({
                name: 'test-robot' + Math.round(Math.random() * 100000),
                destination: email,
            });

            setIsLoggingIn(true);

            toast({
                title: '通知消息',
                description: message,
            });
        } catch (error) {
            console.error('请求失败', error);
        }
    };

    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            {type === 'login' && !isLoggingIn && (
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col items-center gap-2">
                            <img className="w-[65px]" src="/logo.png" />
                            <h1 className="text-xl font-bold">
                                欢迎来到棋盘驿站
                            </h1>
                        </div>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">邮箱</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                登录
                            </Button>
                        </div>
                    </div>
                </form>
            )}
            {(type !== 'login' || isLoggingIn) && <div>登录中，请稍后</div>}
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
