import passport from '@/config/passport-config';
import { Context } from 'koa';
import { Ctx, Get, JsonController, UseBefore } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@JsonController()
export class AppController {
    @Get('/hello')
    @UseBefore(passport.authenticate('jwt', { session: false }))
    hello(@Ctx() ctx: Context) {
        const user = ctx.state.user;
        return {
            code: 0,
            data: user,
            message: 'success',
        };
    }
}
