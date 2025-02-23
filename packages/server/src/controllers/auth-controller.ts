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
import { REDIS_PREFIX } from '@/constant';

@JsonController('/auth')
@Service()
export class AuthController {
    @Inject('redis')
    redis!: Redis;

    @Post('/login')
    @UseBefore(async (ctx: Context, next: (err?: any) => Promise<any>) => {
        const req = Object.assign(ctx.req, {
            body: ctx.request.body,
        }) as any;
        const res = Object.assign(ctx.res, {
            json: (data: { success: boolean }) => {
                ctx.set('Content-Type', 'application/json');
                if (!data?.success) {
                    ctx.throw(500, '登录失败');
                } else {
                    ctx.body = data;
                }
            },
            status: (code: number) => {
                ctx.status = code;
                return res;
            },
            send: (message: string) => {
                if (ctx.status >= 400) {
                    ctx.throw(ctx.status, message);
                } else {
                    ctx.body = message;
                }
            },
        }) as any;

        await magicLogin.send(req, res);

        // HACK: 检查响应状态码，如果是成功状态码则直接结束响应
        if (ctx.status === 200 || ctx.status === 201) {
            ctx.res.end();
        } else {
            await next();
        }
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
        const userInfo = { id: user.id, username: user.username };
        const token = generateJwtToken(userInfo);
        await this.redis.set(
            `${REDIS_PREFIX}:token:${userInfo.id}`,
            token,
            'EX',
            60 * 60 * 15
        );

        return { message: '登录成功', token };
    }

    @Post('/logout')
    @UseBefore(passport.authenticate('jwt', { session: false }))
    async logout(@Ctx() ctx: Context) {
        const authenticatedUser = ctx.state.user;
        await this.redis.del(`${REDIS_PREFIX}:token:${authenticatedUser.id}`);
        return { message: '登出成功' };
    }
}
