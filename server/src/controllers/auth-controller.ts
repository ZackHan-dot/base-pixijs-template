import { generateJwtToken, magicLogin } from '@/config/passport-config';
import passport from 'koa-passport';
import {
    Body,
    Ctx,
    Get,
    JsonController,
    NotFoundError,
    Post,
    Req,
    Res,
    UseBefore,
} from 'routing-controllers';
import { Service } from 'typedi';
import { Context } from 'koa';

@JsonController('/auth')
@Service()
export class AuthController {
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
        const token = generateJwtToken(user);

        return { message: '登录成功', token };
    }
}
