import { generateJwtToken, magicLogin } from '@/config/passport-config';
import passport from 'koa-passport';
import {
    Body,
    Ctx,
    Get,
    JsonController,
    NotFoundError,
    Post,
    UseBefore,
} from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { Context } from 'koa';
import Redis from 'ioredis';

@JsonController('/auth')
@Service()
export class AuthController {
    @Inject('redis')
    redis!: Redis;

    @Post('/login')
    @UseBefore((ctx: Context, next: (err?: any) => Promise<any>) => {
        const req = Object.assign(ctx.req, {
            body: ctx.request.body,
        }) as any;
        const res = Object.assign(ctx.res, {
            json: (data: unknown) => {
                ctx.set('Content-Type', 'application/json');
                ctx.body = JSON.stringify(data);
            },
            status: (code: number) => {
                ctx.status = code;
                return res;
            },
            send: (message: string) => {
                ctx.body = message;
            },
        }) as any;

        magicLogin.send(req, res);
        return next();
    })
    async login() {
        return { message: '发送登录邮件成功，请注意查收' };
    }

    @Get('/login/callback')
    @UseBefore(passport.authenticate('magiclogin', { session: false }))
    async callback(@Ctx() ctx: Context) {
        const user = ctx.state.user;
        if (!user) {
            throw new NotFoundError('未找到该用户');
        }
        const userInfo = { id: user.id, email: user.email };
        const token = generateJwtToken(userInfo);
        await this.redis.set(`token:${userInfo.id}`, token, 'EX', 60 * 60 * 15);

        return { message: '登录成功', token };
    }

    @Post('/logout')
    @UseBefore(passport.authenticate('jwt', { session: false }))
    async logout(@Ctx() ctx: Context) {
        const authenticatedUser = ctx.state.user;
        await this.redis.del(`token:${authenticatedUser.id}`);
        return { message: '登出成功' };
    }
}
